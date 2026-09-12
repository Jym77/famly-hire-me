import React from 'react';

interface Application {
  id: number;
  position_id: number;
  applicant_id: number;
  data: string;
  status: string;
}

interface ApplicationsViewProps {
  applications: Application[];
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({ applications }) => {
  return (
    <div className="application-view">
      <h2>All Applications</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Pos ID</th>
            <th style={{ padding: '10px' }}>App ID</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '10px' }}>{app.id}</td>
              <td style={{ padding: '10px' }}>{app.position_id}</td>
              <td style={{ padding: '10px' }}>{app.applicant_id}</td>
              <td style={{ padding: '10px' }}>{app.status}</td>
              <td style={{ padding: '10px' }}>{app.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {applications.length === 0 && <p>No applications found.</p>}
    </div>
  );
};
