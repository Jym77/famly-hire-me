import React, { useState } from 'react';
import { PositionCard } from '../components/PositionCard';
import { filterPositions, type Position, type Nursery } from '../utils/filters';

interface PositionsViewProps {
  positions: Position[];
  nurseries: Nursery[];
  onSelectPosition: (position: Position) => void;
}

export const PositionsView: React.FC<PositionsViewProps> = ({ positions, nurseries, onSelectPosition }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPositions = filterPositions(positions, nurseries, searchTerm);

  return (
    <div>
      <div className="view-filters">
        <div className="filter-group">
          <label htmlFor="position-search">Search</label>
          <input 
            id="position-search" 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search roles or nurseries..."
          />
        </div>
      </div>

      <div className="positions-grid">
        {filteredPositions.map(pos => {
          const nursery = nurseries.find(n => n.id === pos.nursery_id);
          return (
            <PositionCard 
              key={pos.id} 
              position={pos} 
              nurseryName={nursery?.data} 
              onClick={() => onSelectPosition(pos)} 
            />
          );
        })}
      </div>
      {filteredPositions.length === 0 && <p className="status-msg">No positions found matching your criteria.</p>}
    </div>
  );
};
