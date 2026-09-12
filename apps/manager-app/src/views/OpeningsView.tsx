import React, { useState } from 'react';
import { PositionCard } from 'ui';
import { filterPositions, type Position, type Nursery } from 'utils';

interface OpeningsViewProps {
  positions: Position[];
  nurseries: Nursery[];
}

export const OpeningsView: React.FC<OpeningsViewProps> = ({ positions, nurseries }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPositions = filterPositions(positions, nurseries, searchTerm);

  return (
    <div>
      <div className="view-filters">
        <div className="filter-group">
          <label htmlFor="manager-position-search">Search</label>
          <input 
            id="manager-position-search" 
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
              onClick={() => {}} 
              buttonText="Manage"
            />
          );
        })}
      </div>
      {filteredPositions.length === 0 && <p className="status-msg">No positions found matching your criteria.</p>}
    </div>
  );
};
