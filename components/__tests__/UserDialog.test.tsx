import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDialog from '../UserDialog';
import { User } from '@/utils/types';

describe('UserDialog', () => {
  const mockUser: User = {
    id: '4348814a-4ab9-4302-b1a0-93b6910080e0',
    username: 'rgatfield1',
    firstname: 'Rouvin',
    lastname: 'Gatfield',
    email: 'rgatfield1@state.gov',
    avatar: 'https://robohash.org/utcorruptiducimus.png?size=50x50&set=set1',
    role: 'Engineer',
    join_date: '2/28/2024',
    description: 'Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.'
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <UserDialog user={mockUser} isOpen={false} onClose={mockOnClose} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when user is null', () => {
    const { container } = render(
      <UserDialog user={null} isOpen={true} onClose={mockOnClose} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renders user details when isOpen is true and user is provided', () => {
    render(<UserDialog user={mockUser} isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Rouvin Gatfield')).toBeInTheDocument();
    
    expect(screen.getByText('@rgatfield1')).toBeInTheDocument();
    
    expect(screen.getByText('rgatfield1@state.gov')).toBeInTheDocument();
    
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    
    expect(screen.getByText(/Ut tellus. Nulla ut erat id mauris vulputate elementum/)).toBeInTheDocument();
    
    const avatar = screen.getByAltText('Rouvin Gatfield');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockUser.avatar);
  });

  it('formats the join date correctly', () => {
    render(<UserDialog user={mockUser} isOpen={true} onClose={mockOnClose} />);
    
    const dateElement = screen.getByText(/February 28, 2024/);
    expect(dateElement).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<UserDialog user={mockUser} isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when X button is clicked', () => {
    render(<UserDialog user={mockUser} isOpen={true} onClose={mockOnClose} />);
    
    const xButton = screen.getByRole('button', { name: '' });
    fireEvent.click(xButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles invalid date formats gracefully', () => {
    const userWithInvalidDate = {
      ...mockUser,
      join_date: 'invalid-date'
    };
    
    render(<UserDialog user={userWithInvalidDate} isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('invalid-date')).toBeInTheDocument();
  });
});
