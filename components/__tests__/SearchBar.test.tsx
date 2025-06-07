import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockProps = {
    searchTerm: '',
    selectedRole: '',
    roles: ['Surveyor', 'Engineer', 'Architect', 'Supervisor'],
    onSearchTermChange: jest.fn(),
    onRoleChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial props', () => {
    render(<SearchBar {...mockProps} />);
    
    expect(screen.getByText('Search Users')).toBeInTheDocument();
    expect(screen.getByText('Filter by Role')).toBeInTheDocument();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
    
    const roleSelect = screen.getByRole('combobox');
    expect(roleSelect).toBeInTheDocument();
    expect(roleSelect).toHaveValue('');
    
    expect(screen.getByText('All Roles')).toBeInTheDocument();
    expect(screen.getByText('Surveyor')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Architect')).toBeInTheDocument();
    expect(screen.getByText('Supervisor')).toBeInTheDocument();
  });

  it('calls onSearchTermChange when input value changes', () => {
    render(<SearchBar {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(mockProps.onSearchTermChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onSearchTermChange).toHaveBeenCalledWith('test search');
  });

  it('calls onRoleChange when dropdown value changes', () => {
    render(<SearchBar {...mockProps} />);
    
    const roleSelect = screen.getByRole('combobox');
    fireEvent.change(roleSelect, { target: { value: 'Supervisor' } });
    
    expect(mockProps.onRoleChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onRoleChange).toHaveBeenCalledWith('Supervisor');
  });

  it('renders with pre-filled values when provided', () => {
    const filledProps = {
      ...mockProps,
      searchTerm: 'John',
      selectedRole: 'Supervisor',
    };
    
    render(<SearchBar {...filledProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    expect(searchInput).toHaveValue('John');
    
    const roleSelect = screen.getByRole('combobox');
    expect(roleSelect).toHaveValue('Supervisor');
  });
});
