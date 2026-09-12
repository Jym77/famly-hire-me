import { useState, useEffect } from 'react';
import { NurseriesView } from './views/NurseriesView';
import { NurseryDetailView } from './views/NurseryDetailView';
import { PositionsView } from './views/PositionsView';
import { ApplicationView } from './views/ApplicationView';
import './App.css';

interface Position {
  id: number;
  nursery_id: number;
  data: string; // Job Title
  status: string;
}

interface Nursery {
  id: number;
  data: string;
}

function App() {
  const [view, setView] = useState<'nurseries' | 'positions'>('nurseries');
  const [nurseries, setNurseries] = useState<Nursery[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [selectedNursery, setSelectedNursery] = useState<Nursery | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [nursRes, posRes] = await Promise.all([
        fetch('http://localhost:3000/nurseries'),
        fetch('http://localhost:3000/positions')
      ]);
      
      if (!nursRes.ok || !posRes.ok) throw new Error('Failed to fetch data');
      
      const nursData = await nursRes.json();
      const posData = await posRes.json();
      
      setNurseries(nursData);
      setPositions(posData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (applicantData: string) => {
    try {
      const appRes = await fetch('http://localhost:3000/applicants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: applicantData }),
      });
      const applicant = await appRes.json();

      await fetch('http://localhost:3000/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position_id: selectedPosition?.id,
          applicant_id: applicant.id,
          data: 'Applied via portal',
        }),
      });

      alert('Application submitted successfully!');
      setSelectedPosition(null);
      setSelectedNursery(null);
    } catch (err: any) {
      alert('Error submitting application: ' + err.message);
    }
  };

  return (
    <div className="portal-container">
      <header className="portal-header">
        <h1>Famly Hire Me</h1>
        <p>Find your next great role in early years education</p>
        <nav className="portal-nav">
          <button 
            className={`nav-btn ${view === 'nurseries' ? 'active' : ''}`} 
            onClick={() => { setView('nurseries'); setSelectedNursery(null); setSelectedPosition(null); }}
          >
            Nurseries
          </button>
          <button 
            className={`nav-btn ${view === 'positions' ? 'active' : ''}`} 
            onClick={() => { setView('positions'); setSelectedNursery(null); setSelectedPosition(null); }}
          >
            Openings
          </button>
        </nav>
      </header>

      <main className="portal-main">
        {loading && <div className="status-msg">Loading...</div>}
        {error && <div className="status-msg error">{error}</div>}
        
        {!loading && !error && (
          <>
            {selectedPosition ? (
              <ApplicationView 
                position={selectedPosition} 
                onBack={() => setSelectedPosition(null)} 
                onSubmit={handleApply} 
              />
            ) : selectedNursery ? (
              <NurseryDetailView 
                nursery={selectedNursery} 
                positions={positions} 
                onBack={() => setSelectedNursery(null)} 
                onSelectPosition={setSelectedPosition} 
              />
            ) : view === 'nurseries' ? (
              <NurseriesView 
                nurseries={nurseries} 
                positions={positions} 
                onSelectNursery={setSelectedNursery} 
              />
            ) : (
              <PositionsView 
                positions={positions} 
                nurseries={nurseries} 
                onSelectPosition={setSelectedPosition} 
              />
            )}
          </>
        )}
      </main>

      <footer className="portal-footer">
        <p>&copy; 2026 Famly Hire Me Portal</p>
      </footer>
    </div>
  );
}

export default App;
