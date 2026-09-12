import React from 'react';
import { Badge } from './Badge';

interface Nursery {
  id: number;
  data: string;
}

interface NurseryCardProps {
  nursery: Nursery;
  hasPositions?: boolean;
  hasApplications?: boolean;
  onClick?: () => void;
}

export const NurseryCard: React.FC<NurseryCardProps> = ({ nursery, hasPositions, hasApplications, onClick }) => {
  return (
    <div className="position-card" onClick={onClick}>
      <h3>{nursery.data}</h3>
      <p>ID: {nursery.id}</p>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '15px' }}>
        {hasPositions !== undefined && (
          <Badge 
            text={hasPositions ? 'Has Openings' : 'No Openings'} 
            type={hasPositions ? 'open' : 'closed'} 
          />
        )}
        {hasApplications !== undefined && (
          <Badge 
            text={hasApplications ? 'Has Applicants' : 'No Applicants'} 
            type={hasApplications ? 'open' : 'closed'} 
          />
        )}
      </div>
    </div>
  );
};
