import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  return <div className={`news-grid ${className || ''}`}>{children}</div>;
};

export default Grid;
