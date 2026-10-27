import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('is found by its label and takes typing', async () => {
    render(<Input label="Model 19 No." />);
    const field = screen.getByLabelText('Model 19 No.');
    await userEvent.type(field, '0000044');
    expect(field).toHaveValue('0000044');
  });

  it('reads its hint with the field', () => {
    render(<Input label="PO number" hint="As printed on the IFMIS form" />);
    expect(screen.getByLabelText('PO number')).toHaveAccessibleDescription('As printed on the IFMIS form');
  });

  it('an error marks it invalid, is announced, and replaces the hint', () => {
    render(<Input label="Quantity" hint="Units to issue" error="Only 4 are in store" />);
    const field = screen.getByLabelText('Quantity');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Only 4 are in store');
    expect(screen.getByRole('alert')).toHaveTextContent('Only 4 are in store');
    expect(screen.queryByText('Units to issue')).toBeNull();
  });

  it('keeps an id given to it', () => {
    render(<Input id="po" label="PO number" />);
    expect(screen.getByLabelText('PO number')).toHaveAttribute('id', 'po');
  });
});
