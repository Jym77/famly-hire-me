import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NurseriesView } from '../views/NurseriesView';
import { NurseryDetailView } from '../views/NurseryDetailView';
import { PositionsView } from '../views/PositionsView';
import { ApplicationView } from '../views/ApplicationView';

const mockNurseries = [
  { id: 1, data: 'Sunnyside Daycare' },
  { id: 2, data: 'Green Garden Preschool' },
];

const mockPositions = [
  { id: 1, nursery_id: 1, data: 'Lead Educator', status: 'open' },
  { id: 2, nursery_id: 1, data: 'Assistant Teacher', status: 'open' },
  { id: 3, nursery_id: 2, data: 'Center Manager', status: 'closed' },
];

describe('Views Snapshots', () => {
  it('should match snapshot for NurseriesView', () => {
    const { asFragment } = render(
      <NurseriesView 
        nurseries={mockNurseries} 
        positions={mockPositions} 
        onSelectNursery={() => {}} 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot for NurseryDetailView', () => {
    const { asFragment } = render(
      <NurseryDetailView 
        nursery={mockNurseries[0]} 
        positions={mockPositions} 
        onBack={() => {}} 
        onSelectPosition={() => {}} 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot for PositionsView', () => {
    const { asFragment } = render(
      <PositionsView 
        positions={mockPositions} 
        nurseries={mockNurseries} 
        onSelectPosition={() => {}} 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot for ApplicationView', () => {
    const { asFragment } = render(
      <ApplicationView 
        position={mockPositions[0]} 
        onBack={() => {}} 
        onSubmit={() => Promise.resolve()} 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
