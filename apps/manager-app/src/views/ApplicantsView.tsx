import React from 'react';

interface Applicant {
  id: number;
  data: string;
}

interface ApplicantsViewProps {
  applicants: Applicant[];
}

export const ApplicantsView: React.FC<ApplicantsViewProps> = ({ applicants }) => {
  return (
    <div className="application-view">
      <h2>All Applicants</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(app => (
            <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '10px' }}>{app.id}</td>
              <td style={{ padding: '10px' }}>{app.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {applicants.length === 0 && <p>No applicants found.</p>}
    </div>
  );
};
