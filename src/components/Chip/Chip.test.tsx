import { render, screen } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip', () => {
  it('shows its text in the tone asked for', () => {
    render(<Chip tone="warning">Pending</Chip>);
    expect(screen.getByText('Pending')).toHaveClass('bg-warning-soft', 'text-warning-soft-foreground');
  });

  it('is neutral by default', () => {
    render(<Chip>Disposed</Chip>);
    expect(screen.getByText('Disposed')).toHaveClass('bg-neutral-soft');
  });

  it('a dot is decoration only: the text alone is read out', () => {
    render(
      <Chip tone="success" dot>
        In store
      </Chip>,
    );
    const chip = screen.getByText('In store');
    expect(chip.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(chip).toHaveTextContent(/^In store$/);
  });
});
