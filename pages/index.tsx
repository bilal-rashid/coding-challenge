import { Geist, Geist_Mono } from "next/font/google";
import { useUsers } from "@/hooks/useUsers";
import UserList from "@/components/userList";
import LoadingView from "@/components/loadingView";

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
  return (
    <>
      <div className="bg-back"></div>
      
      <div className={`${geistSans.className} ${geistMono.className} min-h-screen font-[family-name:var(--font-geist-sans)] relative overflow-auto h-screen`}>

        {loading && (
            <LoadingView/>
        )}
        <main className="px-4 sm:px-8 md:px-16 pb-10 flex flex-col flex-nowrap justify-center items-center">
          
          {error && (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg max-w-2xl mx-auto">
              {error}
            </div>
          )}
          
          {!loading && !error && (
            <UserList users={users}/>
          )}
        </main>
        
        <footer className="py-4 text-center text-white text-sm">
          <p>© {new Date().getFullYear()} User Directory. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
