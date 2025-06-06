import { Geist, Geist_Mono } from "next/font/google";
import { useUsers } from "@/hooks/useUsers";
import UserList from "@/components/userList";
import LoadingView from "@/components/loadingView";
import ErrorView from "@/components/errorView";
import SearchBar from "@/components/SearchBar";
import { useState, useMemo, useEffect } from "react";
import { User } from "@/utils/types";
import { useDebounce } from "@/hooks/useDebounce";
import EmptySvg from "@/components/icons/EmptySvg";
import EmptyView from "@/components/emptyView";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const availableRoles = useMemo(() => {
    if (!users || users.length === 0) return [];
    const roles = users.map(user => user.role);
    return [...new Set(roles)].sort();
  }, [users]);
  
  useEffect(() => {
    if (!users || users.length === 0) {
      setFilteredUsers([]);
      return;
    }
    
    const isSearching = debouncedSearchTerm !== '' || selectedRole !== '';
    
    if (!isSearching) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => {
      const matchesSearchTerm = debouncedSearchTerm === '' || 
        user.firstname.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        user.lastname.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        user.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesRole = selectedRole === '' || user.role === selectedRole;
      
      return matchesSearchTerm && matchesRole;
    });
    
    setFilteredUsers(filtered);
  }, [users, debouncedSearchTerm, selectedRole]);
  
  return (
    <>
      <div className="bg-back"></div>
      
      <div className={`${geistSans.className} ${geistMono.className} min-h-screen font-[family-name:var(--font-geist-sans)] relative overflow-auto h-screen`}>

        {loading && (
            <LoadingView/>
        )}
        {error && (
            <ErrorView errorMessage={error}/>
        )}
        {users.length === 0 && (
            <EmptyView/>
        )}
        <main className="px-4 sm:px-8 md:px-16 pb-10 flex flex-col flex-nowrap justify-center items-center">
          {!loading && !error && (
            <>
              <div className="hyper-care-logo mb-6 mt-8">
                <img src="https://admin.hypercare.com/static/media/horizontal-logo-white.be044a4b.svg" alt="hypercare white logo"/>

              </div>
              {/*<h1 className="text-3xl font-bold text-center mb-6 mt-8 text-gray-50">*/}
              {/*  User Directory*/}
              {/*</h1>*/}
              
              <SearchBar
                searchTerm={searchTerm}
                selectedRole={selectedRole}
                roles={availableRoles}
                onSearchTermChange={setSearchTerm}
                onRoleChange={setSelectedRole}
              />
              
              {(debouncedSearchTerm !== '' || selectedRole !== '') && filteredUsers.length === 0 && (
                <div className="flex flex-col items-center text-center py-10">
                  <EmptySvg/>
                  <p className="text-gray-100 text-lg mt-4">No users found matching your search.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedRole('');
                    }}
                    className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-gray-700 cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}
              
              <UserList users={filteredUsers.length > 0 || debouncedSearchTerm !== '' || selectedRole !== '' ? filteredUsers : users}/>
            </>
          )}
        </main>
        
        <footer className="py-4 text-center text-gray-500 text-sm">
        </footer>
      </div>
    </>
  );
}
