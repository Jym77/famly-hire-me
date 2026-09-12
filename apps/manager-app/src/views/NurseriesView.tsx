import React, { useState } from 'react';
import { NurseryCard } from 'ui';
import { filterNurseries, type Nursery, type Position, type Application } from 'utils';

interface NurseriesViewProps {
  nurseries: Nursery[];
  positions: Position[];
  applications: Application[];
  onSelectNursery: (nursery: Nursery) => void;
}

export const NurseriesView: React.FC<NurseriesViewProps> = ({ nurseries, positions, applications, onSelectNursery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vacancyFilter, setVacancyFilter] = useState<'all' | 'has' | 'none'>('all');
  const [appFilter, setAppFilter] = useState<'all' | 'has' | 'none'>('all');

  const filteredNurseries = filterNurseries(
    nurseries, 
    positions, 
    applications, 
    searchTerm, 
    vacancyFilter, 
    appFilter
  );

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
        <div className="filter-group">
          <label>Applications</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="manager-app-filter" 
                value="all" 
                checked={appFilter === 'all'} 
                onChange={() => setAppFilter('all')} 
              /> All
            </label>
            <label>
              <input 
                type="radio" 
                name="manager-app-filter" 
                value="has" 
                checked={appFilter === 'has'} 
                onChange={() => setAppFilter('has')} 
              /> Has Applicants
            </label>
            <label>
              <input 
                type="radio" 
                name="manager-app-filter" 
                value="none" 
                checked={appFilter === 'none'} 
                onChange={() => setAppFilter('none')} 
              /> No Applicants
            </label>
          </div>
        </div>
      </div>

      <div className="positions-grid">
        {filteredNurseries.map(nursery => {
          const nurseryPositions = positions.filter(p => p.nursery_id === nursery.id);
          const hasPositions = nurseryPositions.length > 0;
          const hasApplications = applications.some(app => 
            nurseryPositions.some(pos => pos.id === app.position_id)
          );
          
          return (
            <NurseryCard 
              key={nursery.id} 
              nursery={nursery} 
              hasPositions={hasPositions} 
              hasApplications={hasApplications}
              onClick={() => onSelectNursery(nursery)}
            />
          );
        })}
      </div>
      {filteredNurseries.length === 0 && <p className="status-msg">No nurseries found matching your criteria.</p>}
    </div>
  );
};
