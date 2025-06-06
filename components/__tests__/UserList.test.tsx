import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import UserList from '../userList';
import { User } from '@/utils/types';

jest.mock('../userCard', () => {
  return function MockUserCard({ user, onViewMore }) {
    return (
      <div data-testid={`user-card-${user.id}`}>
        <button onClick={() => onViewMore(user)}>View More</button>
      </div>
    );
  };
});

jest.mock('../UserDialog', () => {
  return function MockUserDialog({ user, isOpen, onClose }) {
    if (!isOpen || !user) return null;
    return (
      <div data-testid="user-dialog">
        <p>User: {user.firstname}</p>
        <button onClick={onClose}>Close Dialog</button>
      </div>
    );
  };
});

// Mock IntersectionObserver
const observeMock = jest.fn();
const unobserveMock = jest.fn();
const disconnectMock = jest.fn();

window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
  return {
    observe: observeMock,
    unobserve: unobserveMock,
    disconnect: disconnectMock,
    callback,
  };
});

describe('UserList', () => {
  const generateMockUsers = (count: number): User[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `user-${i}`,
      username: `user${i}`,
      firstname: `First${i}`,
      lastname: `Last${i}`,
      email: `user${i}@example.com`,
      avatar: `https://example.com/avatar${i}.png`,
      role: `Role${i}`,
      join_date: '2/28/2024',
      description: `Description for user ${i}`
    }));
  };

  const mockUsers = generateMockUsers(30); // Generate 30 mock users

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial batch of users', () => {
    render(<UserList users={mockUsers} />);
    
    const userCards = screen.getAllByTestId(/user-card-/);
    expect(userCards.length).toBe(15);
  });

  it('opens the dialog when a user card is clicked', async () => {
    render(<UserList users={mockUsers} />);
    const viewMoreButton = screen.getAllByText('View More')[0];
    fireEvent.click(viewMoreButton);
    const dialog = screen.getByTestId('user-dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/User: First0/)).toBeInTheDocument();
  });

  it('closes the dialog when close button is clicked', async () => {
    render(<UserList users={mockUsers} />);
    const viewMoreButton = screen.getAllByText('View More')[0];
    fireEvent.click(viewMoreButton);
    const closeButton = screen.getByText('Close Dialog');
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId('user-dialog')).not.toBeInTheDocument();
    });
  });

  it('loads more users when intersection observer fires', async () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getAllByTestId(/user-card-/).length).toBe(15);
    const observerInstance = (window.IntersectionObserver as jest.Mock).mock.results[0].value;
    await act(async () => {
      observerInstance.callback([{ isIntersecting: true }], observerInstance);
    });
    expect(screen.getAllByTestId(/user-card-/).length).toBe(30);
  });

  it('does not load more users if all users are already displayed', async () => {
    render(<UserList users={mockUsers.slice(0, 10)} />);
    expect(screen.getAllByTestId(/user-card-/).length).toBe(10);
    const observerInstance = (window.IntersectionObserver as jest.Mock).mock.results[0].value;
    await act(async () => {
      observerInstance.callback([{ isIntersecting: true }], observerInstance);
    });
    expect(screen.getAllByTestId(/user-card-/).length).toBe(10);
  });

  it('properly cleans up the intersection observer on unmount', () => {
    const { unmount } = render(<UserList users={mockUsers} />);
    unmount();
    expect(unobserveMock).toHaveBeenCalled();
  });
});
