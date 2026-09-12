import React, { useState } from 'react';
import { PositionCard } from 'ui';
import { type Position, type Nursery } from 'utils';

interface OpeningsViewProps {
  positions: Position[];
  nurseries: Nursery[];
  applications: any[];
  onSelectPosition: (position: Position) => void;
}

export const OpeningsView: React.FC<OpeningsViewProps> = ({ positions, nurseries, applications, onSelectPosition }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appFilter, setAppFilter] = useState<'all' | 'has' | 'none'>('all');

  const filteredPositions = positions.filter(pos => {
    const nursery = nurseries.find(n => n.id === pos.nursery_id);
    const nurseryName = nursery ? nursery.data : '';
    
    const matchesSearch = (
      pos.data.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurseryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const hasApplications = applications.some(app => app.position_id === pos.id);
    const matchesApps = 
      appFilter === 'all' || 
      (appFilter === 'has' && hasApplications) || 
      (appFilter === 'none' && !hasApplications);

    return matchesSearch && matchesApps;
  });

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
        <div className="filter-group">
          <label>Applications</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="manager-pos-app-filter" 
                value="all" 
                checked={appFilter === 'all'} 
                onChange={() => setAppFilter('all')} 
              /> All
            </label>
            <label>
              <input 
                type="radio" 
                name="manager-pos-app-filter" 
                value="has" 
                checked={appFilter === 'has'} 
                onChange={() => setAppFilter('has')} 
              /> Has Applicants
            </label>
            <label>
              <input 
                type="radio" 
                name="manager-pos-app-filter" 
                value="none" 
                checked={appFilter === 'none'} 
                onChange={() => setAppFilter('none')} 
              /> No Applicants
            </label>
          </div>
        </div>
      </div>

      <div className="positions-grid">
        {filteredPositions.map(pos => {
          const nursery = nurseries.find(n => n.id === pos.nursery_id);
          const hasApplications = applications.some(app => app.position_id === pos.id);
          return (
            <PositionCard 
              key={pos.id} 
              position={pos} 
              nurseryName={nursery?.data} 
              onClick={() => onSelectPosition(pos)} 
              buttonText="Manage"
              hasApplications={hasApplications}
            />
          );
        })}
      </div>
      {filteredPositions.length === 0 && <p className="status-msg">No positions found matching your criteria.</p>}
    </div>
  );
};
