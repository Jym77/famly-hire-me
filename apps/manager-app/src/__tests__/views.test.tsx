import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NurseriesView } from '../views/NurseriesView';
import { OpeningsView } from '../views/OpeningsView';
import { ApplicantsView } from '../views/ApplicantsView';
import { ApplicationsView } from '../views/ApplicationsView';

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

const mockNurseries = [
  { id: 1, data: 'Sunnyside Daycare' },
  { id: 2, data: 'Green Garden Preschool' },
];

const mockPositions = [
  { id: 1, nursery_id: 1, data: 'Lead Educator', status: 'open' },
  { id: 2, nursery_id: 2, data: 'Center Manager', status: 'open' },
];

const mockApplicants = [
  { id: 1, data: 'Alice Smith (alice@email.com)' },
  { id: 2, data: 'Bob Jones (bob@email.com)' },
];

const mockApplications = [
  { id: 1, position_id: 1, applicant_id: 1, data: 'Applied via portal', status: 'received' },
];

describe('Manager Views Snapshots', () => {
  const views = [
    {
      name: 'NurseriesView',
      render: () => render(
        <NurseriesView 
          nurseries={mockNurseries} 
          positions={mockPositions} 
        />
      ),
    },
    {
      name: 'OpeningsView',
      render: () => render(
        <OpeningsView 
          positions={mockPositions} 
          nurseries={mockNurseries} 
        />
      ),
    },
    {
      name: 'ApplicantsView',
      render: () => render(
        <ApplicantsView 
          applicants={mockApplicants} 
        />
      ),
    },
    {
      name: 'ApplicationsView',
      render: () => render(
        <ApplicationsView 
          applications={mockApplications} 
        />
      ),
    },
  ];

  views.forEach(view => {
    describe(`${view.name}`, () => {
      it('should match snapshot for desktop', () => {
        setWindowWidth(1200);
        const { asFragment } = view.render();
        expect(asFragment()).toMatchSnapshot('desktop');
      });

      it('should match snapshot for mobile', () => {
        setWindowWidth(375);
        const { asFragment } = view.render();
        expect(asFragment()).toMatchSnapshot('mobile');
      });
    });
  });
});
