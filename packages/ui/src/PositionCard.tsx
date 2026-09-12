import React from 'react';
import { Badge } from './Badge';

interface Position {
  id: number;
  nursery_id: number;
  data: string;
  status: string;
}

interface PositionCardProps {
  position: Position;
  nurseryName?: string;
  onClick: () => void;
  buttonText?: string;
  hasApplications?: boolean;
}

export const PositionCard: React.FC<PositionCardProps> = ({ 
  position, 
  nurseryName, 
  onClick, 
  buttonText = 'View Details',
  hasApplications
}) => {
  return (
    <div className="position-card" onClick={onClick}>
      <h3 style={{ margin: '0 0 10px 0' }}>{position.data}</h3>
      {nurseryName && <p style={{ margin: '0 0 15px 0' }}>{nurseryName}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <Badge type={position.status === 'open' ? 'open' : 'closed'} text={position.status} />
          {hasApplications !== undefined && (
            <Badge 
              text={hasApplications ? 'Has Applicants' : 'No Applicants'} 
              type={hasApplications ? 'open' : 'closed'} 
            />
          )}
        </div>
        <button className="btn-primary">{buttonText}</button>
      </div>
    </div>
  );
};
