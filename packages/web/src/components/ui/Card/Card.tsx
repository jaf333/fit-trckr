import React from 'react';
import { clsx } from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={clsx(
        'bg-white shadow rounded-lg',
        onClick && 'cursor-pointer hover:shadow-lg transition-shadow duration-200',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
