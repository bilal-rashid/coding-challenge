import { Geist, Geist_Mono } from "next/font/google";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "@/components/userCard";
import LoadingView from "@/components/icons/LoadingView";
import { User } from "@/utils/types";

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

  const handleViewMore = (user: User) => {
    console.log('Show modal for:', user);
  };
  return (
    <>
      <div className="bg-back"></div>
      
      <div className={`${geistSans.className} ${geistMono.className} min-h-screen font-[family-name:var(--font-geist-sans)] relative overflow-auto h-screen`}>

        {loading && (
            <div className="w-screen h-screen bg-white/30 flex flex-col flex-nowrap justify-center items-center">
              <div className="flex flex-col">
                <LoadingView/>
                <span className="ml-3 text-white">Loading users...</span>
              </div>
            </div>
        )}
        <main className="px-4 sm:px-8 md:px-16 pb-10 flex flex-col flex-nowrap justify-center items-center">
          
          {error && (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg max-w-2xl mx-auto">
              {error}
            </div>
          )}
          
          {!loading && !error && (
            <div className="columns-1 gap-6 sm:columns-2 xl:columns-3 space-y-6 max-w-7xl">
              {users.map((user) => (
                <div key={user.id} className="break-inside-avoid mb-6">
                  <UserCard user={user} onViewMore={handleViewMore} />
                </div>
              ))}
            </div>
          )}
        </main>
        
        <footer className="py-4 text-center text-white text-sm">
          <p>© {new Date().getFullYear()} User Directory. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
