import { useEffect, useState } from 'react';
import { User } from "@/utils/types";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users');
                if (!res.ok) throw new Error('Failed to fetch users');
                const data: User[] = await res.json();
                setUsers(data);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};