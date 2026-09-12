import React from 'react';
import { PositionCard } from 'ui';

interface Position {
  id: number;
  nursery_id: number;
  data: string;
  status: string;
}

interface Nursery {
  id: number;
  data: string;
}

interface NurseryDetailViewProps {
  nursery: Nursery;
  positions: Position[];
  onBack: () => void;
  onSelectPosition: (position: Position) => void;
}

export const NurseryDetailView: React.FC<NurseryDetailViewProps> = ({ nursery, positions, onBack, onSelectPosition }) => {
  const nurseryPositions = positions.filter(p => p.nursery_id === nursery.id);

  return (
    <div className="application-view">
      <button className="btn-back" onClick={onBack}>← Back to Nurseries</button>
      <h2 style={{ margin: '0 0 10px 0' }}>{nursery.data}</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Details for nursery {nursery.id}</p>
      
      <div className="nursery-positions">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Open Positions</h3>
        {nurseryPositions.length > 0 ? (
          <div className="positions-grid" style={{ gridTemplateColumns: '1fr', marginTop: '10px' }}>
            {nurseryPositions.map(pos => (
              <PositionCard 
                key={pos.id} 
                position={pos} 
                onClick={() => onSelectPosition(pos)} 
                buttonText="Apply"
              />
            ))}
          </div>
        ) : (
          <p>No open positions at this time.</p>
        )}
      </div>
    </div>
  );
};
