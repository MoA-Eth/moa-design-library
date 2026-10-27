import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('runs its action when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is a primary, medium button by default', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary', 'h-9');
  });

  it('while loading: busy, disabled, and a click does nothing', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick} leftIcon={<span data-testid="icon" />}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    // The spinner takes the icon's place
    expect(screen.queryByTestId('icon')).toBeNull();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('gives a link the look of a button', () => {
    render(
      <Button asChild variant="outline">
        <a href="/reports">Reports</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Reports' });
    expect(link).toHaveAttribute('href', '/reports');
    expect(link).toHaveClass('border-input');
  });

  it('lets a class passed in win over its own', () => {
    render(<Button className="h-12">Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12');
    expect(button).not.toHaveClass('h-9');
  });
});
