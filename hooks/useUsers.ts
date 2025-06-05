import { useEffect, useState } from 'react';
import { User } from "@/utils/types";
interface ApiResponse {
    data: {
        users: User[];
    };
}
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users');
                if (!res.ok) throw new Error('Failed to fetch users');
                const json: ApiResponse = await res.json();
                setUsers(json.data.users);
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