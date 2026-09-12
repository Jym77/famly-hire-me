import React from 'react';

interface BadgeProps {
  text: string;
  type: 'open' | 'closed' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ text, type }) => {
  return <span className={`badge ${type}`}>{text}</span>;
};
