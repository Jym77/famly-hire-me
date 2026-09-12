import { useState, useEffect } from 'react';
import { NurseriesView } from './views/NurseriesView';
import { OpeningsView } from './views/OpeningsView';
import { ApplicantsView } from './views/ApplicantsView';
import { ApplicationsView } from './views/ApplicationsView';
import { apiFetch } from './utils/api';
import './App.css';

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

interface Applicant {
  id: number;
  data: string;
}

interface Application {
  id: number;
  position_id: number;
  applicant_id: number;
  data: string;
  status: string;
}

function App() {
  const [view, setView] = useState<'nurseries' | 'openings' | 'applicants' | 'applications'>('nurseries');
  const [nurseries, setNurseries] = useState<Nursery[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [nursRes, posRes, appRes, applicationsRes] = await Promise.all([
        apiFetch('/nurseries'),
        apiFetch('/positions'),
        apiFetch('/applicants'),
        apiFetch('/applications'),
      ]);
      
      setNurseries(await nursRes.json());
      setPositions(await posRes.json());
      setApplicants(await appRes.json());
      setApplications(await applicationsRes.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portal-container">
      <header className="portal-header">
        <h1>Famly Manager</h1>
        <p>Manage your nurseries and hire the best talent</p>
        <nav className="portal-nav">
          <button 
            className={`nav-btn ${view === 'nurseries' ? 'active' : ''}`} 
            onClick={() => setView('nurseries')}
          >
            Nurseries
          </button>
          <button 
            className={`nav-btn ${view === 'openings' ? 'active' : ''}`} 
            onClick={() => setView('openings')}
          >
            Openings
          </button>
          <button 
            className={`nav-btn ${view === 'applicants' ? 'active' : ''}`} 
            onClick={() => setView('applicants')}
          >
            Applicants
          </button>
          <button 
            className={`nav-btn ${view === 'applications' ? 'active' : ''}`} 
            onClick={() => setView('applications')}
          >
            Applications
          </button>
        </nav>
      </header>

      <main className="portal-main">
        {loading && <div className="status-msg">Loading data...</div>}
        {error && <div className="status-msg error">{error}</div>}
        
        {!loading && !error && (
          <>
            {view === 'nurseries' && (
              <NurseriesView nurseries={nurseries} positions={positions} />
            )}
            {view === 'openings' && (
              <OpeningsView positions={positions} nurseries={nurseries} />
            )}
            {view === 'applicants' && (
              <ApplicantsView applicants={applicants} />
            )}
            {view === 'applications' && (
              <ApplicationsView applications={applications} />
            )}
          </>
        )}
      </main>

      <footer className="portal-footer">
        <p>&copy; 2026 Famly Manager Portal</p>
      </footer>
    </div>
  );
}

export default App;
