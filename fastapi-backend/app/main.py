from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List
from jose import jwt
from datetime import datetime, timedelta
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# MySQL DB connection (update these credentials)
DB_USER = "root"
DB_PASSWORD = "password"
DB_NAME = "ecommerce"
DB_HOST = "localhost"

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# JWT setup
SECRET_KEY = "secretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas
class UserLogin(BaseModel):
    username: str
    password: str

class ProductSchema(BaseModel):
    name: str
    price: float

class ProductResponse(ProductSchema):
    id: int

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# JWT Token generation
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Seed data using raw SQL
def seed_data():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT COUNT(*) FROM products"))
        count = result.scalar()
        if count == 0:
            conn.execute(text("""
                INSERT INTO products (name, price) VALUES
               ('T-shirt', 3419.99),
               ('Jeans', 1249.99),
                ('Sneakers',13389.99),
                ('Backpack', 34534.99),
                 ('Sunglasses', 424.99),
                ('Hat', 215.99)
                                                
            """))
            conn.commit()

seed_data()

# Routes
@app.post("/api/auth/login")
def login(user: UserLogin, db=Depends(get_db)):
    result = db.execute(text("SELECT * FROM users WHERE username = :username"), {"username": user.username})
    db_user = result.fetchone()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/api/products", response_model=List[ProductResponse])
def get_products(db=Depends(get_db)):
    result = db.execute(text("SELECT id, name, price FROM products"))
    products = [{"id": row.id, "name": row.name, "price": row.price} for row in result.fetchall()]
    return products
