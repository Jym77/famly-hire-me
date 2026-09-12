import React from 'react';
import { Badge } from './Badge';

interface Nursery {
  id: number;
  data: string;
}

interface NurseryCardProps {
  nursery: Nursery;
  hasPositions: boolean;
  onClick?: () => void;
}

export const NurseryCard: React.FC<NurseryCardProps> = ({ nursery, hasPositions, onClick }) => {
  return (
    <div className="position-card" onClick={onClick}>
      <h3>{nursery.data}</h3>
      <p>ID: {nursery.id}</p>
      <Badge 
        text={hasPositions ? 'Has Openings' : 'No Openings'} 
        type={hasPositions ? 'open' : 'closed'} 
      />
    </div>
  );
};
