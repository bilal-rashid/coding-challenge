import { useEffect, useState, useRef } from 'react';
import { User } from "@/utils/types";
import UserCard from "@/components/userCard";


interface Props {
    users: User[];
}

const BATCH_SIZE = 15;

const UserList: React.FC<Props> = ({ users }) => {
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // Load more when user scrolls to the bottom
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (entry.isIntersecting && visibleCount < users.length) {
                    setVisibleCount(prev => prev + BATCH_SIZE);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
        );

        const current = loaderRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [visibleCount, users.length]);

    const visibleUsers = users.slice(0, visibleCount);
    const handleViewMore = (user: User) => {
        console.log('Show modal for:', user);
    };

    return (
        <div className="columns-1 gap-6 sm:columns-2 xl:columns-3 space-y-6 max-w-7xl">
            {visibleUsers.map((user) => (
                <div key={user.id} className="break-inside-avoid mb-6">
                    <UserCard user={user} onViewMore={handleViewMore} />
                </div>
            ))}
            <div ref={loaderRef} className="h-10 col-span-full"></div>
        </div>
    );
};

export default UserList;
