import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('with a title, is a region named by it', () => {
    render(
      <Card title="Item" description="As received on Model 19">
        Laptop
      </Card>,
    );
    const region = screen.getByRole('region', { name: 'Item' });
    expect(region).toHaveTextContent('As received on Model 19');
    expect(region).toHaveTextContent('Laptop');
  });

  it('shows header actions and a footer', () => {
    render(
      <Card title="Item" actions={<button>Edit</button>} footer={<button>Close</button>}>
        Laptop
      </Card>,
    );
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('without a title, is a plain panel', () => {
    render(<Card>Only content</Card>);
    expect(screen.queryByRole('region')).toBeNull();
    expect(screen.getByText('Only content')).toBeInTheDocument();
  });
});
