import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../userCard';
import { User } from '@/utils/types';

describe('UserCard', () => {
  const mockUser: User = {
    id: '4348814a-4ab9-4302-b1a0-93b6910080e0',
    username: 'rgatfield1',
    firstname: 'Rouvin',
    lastname: 'Gatfield',
    email: 'rgatfield1@state.gov',
    avatar: 'https://robohash.org/utcorruptiducimus.png?size=50x50&set=set1',
    role: 'Engineer',
    join_date: '5/4/2023',
    description: 'Ut tellus. Nulla ut erat id mauris vulputate elementum.'
  };

  const mockOnViewMore = jest.fn();

  beforeEach(() => {
    mockOnViewMore.mockClear();
  });

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);
    
    // Check if name is displayed (using regex for flexibility)
    expect(screen.getByText(/Rouvin/)).toBeInTheDocument();
    expect(screen.getByText(/Gatfield/)).toBeInTheDocument();
    
    // Check if description is displayed (truncated)
    expect(screen.getByText(/Ut tellus/)).toBeInTheDocument();
    
    // Check if avatar is rendered with correct alt text
    const avatar = screen.getByAltText("Rouvin Gatfield");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockUser.avatar);
  });

  it('calls onViewMore when button is clicked', () => {
    render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);
    
    // Find and click the View More button
    const viewMoreButton = screen.getByText('View More');
    fireEvent.click(viewMoreButton);
    
    // Check if the onViewMore callback was called with the user object
    expect(mockOnViewMore).toHaveBeenCalledTimes(1);
    expect(mockOnViewMore).toHaveBeenCalledWith(mockUser);
  });

  it('has the correct fixed height', () => {
    const { container } = render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);
    
    // Check if the card has the correct height class
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass('h-[450px]');
  });

  it('has the correct gradient background', () => {
    const { container } = render(<UserCard user={mockUser} onViewMore={mockOnViewMore} />);
    
    // Check if the card has the correct background gradient class
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass('bg-[linear-gradient(to_bottom,white_0%,white_41%,#F3708D_41%,#F3708D_100%)]');
  });
});
