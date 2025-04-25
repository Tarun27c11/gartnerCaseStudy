// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children }) => (
  <div className="bg-white rounded shadow p-4">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-2">{children}</div>
);
