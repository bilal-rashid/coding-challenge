import React from 'react';
import { User } from "@/utils/types";

interface UserCardProps {
    user: User;
    onViewMore: (user: User) => void;
}
export default function UserCard({ user, onViewMore }: UserCardProps) {
    return (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden w-full max-w-sm mx-auto h-[450px] flex flex-col bg-[linear-gradient(to_bottom,white_0%,white_41%,#F3708D_41%,#F3708D_100%)] opacity-95">
            <div className="h-[41%] bg-[#F3708D] flex justify-center items-center py-10 rounded-bl-[30px]">
                <div className="w-[105px] h-[105px] rounded-full flex items-center justify-center border-2 border-white">
                    <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden bg-gray-200">
                        <img
                            src={user.avatar}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="h-[59%] bg-white p-6 text-center flex-1 flex flex-col rounded-tr-[30px]">
                <h3 className="text-xl font-medium text-gray-800">
                    {user.firstname} {user.lastname}
                </h3>
                <p className="text-sm text-gray-500 mt-3 mx-4 leading-relaxed flex-1 overflow-hidden">
                    {user.description.slice(0, 80)}...
                </p>

                <button
                    onClick={() => onViewMore(user)}
                    className="mt-4 bg-[#F24A6F] text-white px-8 py-3 rounded-md hover:bg-[#EF3954] cursor-pointer transition font-small self-center"
                >
                    View More
                </button>
            </div>
        </div>
    );
};
