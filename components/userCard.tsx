import React from 'react';
import { User } from "@/utils/types";

interface UserCardProps {
    user: User;
    onViewMore: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewMore }) => {
    return (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden w-full max-w-sm mx-auto h-[450px] flex flex-col">
            <div className="bg-blue-500 flex justify-center items-center py-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white bg-gray-200">
                    <img
                        src={user.avatar}
                        alt={`${user.firstname} ${user.lastname}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="p-6 text-center flex-1 flex flex-col">
                <h3 className="text-xl font-medium text-gray-800">
                    {user.firstname} {user.lastname}
                </h3>
                <p className="text-sm text-gray-500 mt-3 mx-4 leading-relaxed flex-1 overflow-hidden">
                    {user.description.slice(0, 80)}...
                </p>

                <button
                    onClick={() => onViewMore(user)}
                    className="mt-4 bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition font-small self-center"
                >
                    View More
                </button>
            </div>
        </div>
    );
};

export default UserCard;
