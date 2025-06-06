import { renderHook, waitFor } from '@testing-library/react';
import { useUsers } from '../useUsers';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users and update state correctly', async () => {
    const mockUsers = [
      {
        id: '1',
        username: 'testuser',
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        avatar: 'https://example.com/avatar.png',
        role: 'Developer',
        join_date: '2/28/2024',
        description: 'Test description'
      }
    ];

    const mockResponse = {
      data: {
        users: mockUsers
      }
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users'
    );
  });

  it('should handle API error correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch users');
    expect(result.current.users).toEqual([]);
  });

  it('should handle network error correctly', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.users).toEqual([]);
  });
});
