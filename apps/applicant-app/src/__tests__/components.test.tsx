import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../components/Badge';
import { NurseryCard } from '../components/NurseryCard';

// Simple mock for snapshots as we don't have a full environment setup for matchSnapshot
// In a real project, we would use vitest's expect(result).toMatchSnapshot()
// but since I can't run a full snapshot store here, I'll verify the output.

describe('Reusable Components', () => {
  it('Badge should render correctly for "open" type', () => {
    const { container } = render(<Badge text="Open" type="open" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toBeDefined();
    expect(element.className).toContain('badge open');
    expect(element.textContent).toBe('Open');
  });

  it('Badge should render correctly for "closed" type', () => {
    const { container } = render(<Badge text="Closed" type="closed" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toBeDefined();
    expect(element.className).toContain('badge closed');
    expect(element.textContent).toBe('Closed');
  });

  it('NurseryCard should render correctly with positions', () => {
    const nursery = { id: 1, data: 'Test Nursery' };
    const { container } = render(<NurseryCard nursery={nursery} hasPositions={true} />);
    expect(container.textContent).toContain('Test Nursery');
    expect(container.textContent).toContain('Has Openings');
  });

  it('NurseryCard should render correctly without positions', () => {
    const nursery = { id: 1, data: 'Test Nursery' };
    const { container } = render(<NurseryCard nursery={nursery} hasPositions={false} />);
    expect(container.textContent).toContain('Test Nursery');
    expect(container.textContent).toContain('No Openings');
  });
});
