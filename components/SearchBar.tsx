import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  selectedRole: string;
  roles: string[];
  onSearchTermChange: (term: string) => void;
  onRoleChange: (role: string) => void;
}

export default function SearchBar({
  searchTerm,
  selectedRole,
  roles,
  onSearchTermChange,
  onRoleChange
}: SearchBarProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label htmlFor="search-input" className="block text-sm font-medium text-white mb-1">
          Search Users
        </label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Search by name or username..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white outline-none"
        />
      </div>
      
      <div className="md:w-48">
        <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Role
        </label>
        <select
          id="role-filter"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white outline-none"
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
