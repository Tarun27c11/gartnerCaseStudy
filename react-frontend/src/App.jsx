import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Checkout from "./pages/checkout";
import ProtectedRoute from "./services/routeProtection"; // Ensure this works for v5

import { login } from "./store/auth";

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  return (
    <Router>
 
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/products"
            component={Products}
          render={() => (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          )}
        />
           <Route
          path="/checkout"
            component={Checkout}
          render={() => (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          )}
        />
        {/* Default route */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
