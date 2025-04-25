// src/components/ui/button.jsx

import React from 'react';
import classNames from 'classnames';

export const Button = ({
  children,
  onClick,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition';

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  };

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
