import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../Badge.js';
import { NurseryCard } from '../NurseryCard.js';
import { PositionCard } from '../PositionCard.js';

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('UI Components Snapshots', () => {
  describe('Badge', () => {
    it('should match snapshot for desktop', () => {
      setWindowWidth(1200);
      const { asFragment } = render(<Badge text="Open" type="open" />);
      expect(asFragment()).toMatchSnapshot('desktop');
    });

    it('should match snapshot for mobile', () => {
      setWindowWidth(375);
      const { asFragment } = render(<Badge text="Open" type="open" />);
      expect(asFragment()).toMatchSnapshot('mobile');
    });
  });

  describe('NurseryCard', () => {
    const nursery = { id: 1, data: 'Test Nursery' };
    it('should match snapshot for desktop', () => {
      setWindowWidth(1200);
      const { asFragment } = render(
        <NurseryCard nursery={nursery} hasPositions={true} onClick={() => {}} />
      );
      expect(asFragment()).toMatchSnapshot('desktop');
    });

    it('should match snapshot for mobile', () => {
      setWindowWidth(375);
      const { asFragment } = render(
        <NurseryCard nursery={nursery} hasPositions={true} onClick={() => {}} />
      );
      expect(asFragment()).toMatchSnapshot('mobile');
    });
  });

  describe('PositionCard', () => {
    const position = { id: 1, nursery_id: 1, data: 'Lead Educator', status: 'open' };
    it('should match snapshot for desktop', () => {
      setWindowWidth(1200);
      const { asFragment } = render(
        <PositionCard 
          position={position} 
          nurseryName="Test Nursery" 
          onClick={() => {}} 
          buttonText="Apply" 
        />
      );
      expect(asFragment()).toMatchSnapshot('desktop');
    });

    it('should match snapshot for mobile', () => {
      setWindowWidth(375);
      const { asFragment } = render(
        <PositionCard 
          position={position} 
          nurseryName="Test Nursery" 
          onClick={() => {}} 
          buttonText="Apply" 
        />
      );
      expect(asFragment()).toMatchSnapshot('mobile');
    });
  });
});
