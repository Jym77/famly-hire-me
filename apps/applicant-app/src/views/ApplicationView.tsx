import React from 'react';

interface Position {
  id: number;
  nursery_id: number;
  data: string;
  status: string;
}

interface ApplicationViewProps {
  position: Position;
  onBack: () => void;
  onSubmit: (applicantData: string) => Promise<void>;
}

export const ApplicationView: React.FC<ApplicationViewProps> = ({ position, onBack, onSubmit }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const applicantData = formData.get('applicantData') as string;
    await onSubmit(applicantData);
  };

  return (
    <div className="application-view">
      <button className="btn-back" onClick={onBack}>← Back</button>
      <h2 style={{ margin: '0 0 10px 0' }}>Apply for {position.data}</h2>
      <form onSubmit={handleSubmit} className="apply-form">
        <div className="form-group">
          <label htmlFor="applicantData">Your Contact Info (Name, Email, Phone)</label>
          <textarea 
            id="applicantData" 
            name="applicantData" 
            required 
            placeholder="e.g. Jane Doe, jane@example.com, 555-0123"
          />
        </div>
        <button type="submit" className="btn-submit">Submit Application</button>
      </form>
    </div>
  );
};
