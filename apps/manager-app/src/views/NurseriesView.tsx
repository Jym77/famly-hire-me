import React, { useState } from 'react';
import { NurseryCard } from 'ui';
import { filterNurseries, type Nursery, type Position } from 'utils';

interface NurseriesViewProps {
  nurseries: Nursery[];
  positions: Position[];
}

export const NurseriesView: React.FC<NurseriesViewProps> = ({ nurseries, positions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vacancyFilter, setVacancyFilter] = useState<'all' | 'has' | 'none'>('all');

  const filteredNurseries = filterNurseries(nurseries, positions, searchTerm, vacancyFilter);

  return (
    <div>
      <div className="view-filters">
        <div className="filter-group">
          <label htmlFor="manager-nursery-search">Search</label>
          <input 
            id="manager-nursery-search" 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search nurseries or roles..."
          />
        </div>
        <div className="filter-group">
          <label>Vacancy</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="manager-vacancy" 
                value="all" 
                checked={vacancyFilter === 'all'} 
                onChange={() => setVacancyFilter('all')} 
              /> All
            </label>
            <label>
              <input 
                type="radio" 
                name="manager-vacancy" 
                value="has" 
                checked={vacancyFilter === 'has'} 
                onChange={() => setVacancyFilter('has')} 
              /> Has Openings
            </label>
            <label>
              <input 
                type="radio" 
                name="manager-vacancy" 
                value="none" 
                checked={vacancyFilter === 'none'} 
                onChange={() => setVacancyFilter('none')} 
              /> No Openings
            </label>
          </div>
        </div>
      </div>

      <div className="positions-grid">
        {filteredNurseries.map(nursery => (
          <NurseryCard 
            key={nursery.id} 
            nursery={nursery} 
            hasPositions={positions.some(p => p.nursery_id === nursery.id)} 
          />
        ))}
      </div>
      {filteredNurseries.length === 0 && <p className="status-msg">No nurseries found matching your criteria.</p>}
    </div>
  );
};
