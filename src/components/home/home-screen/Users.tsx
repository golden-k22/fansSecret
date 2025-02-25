"use client";

import { getAllUsers } from "./actions";
import { useEffect, useState } from "react";
import SingleUser from "./User";

export interface UserType {
    firstname: string | null;
    lastname: string | null;
    email: string;
    id: string;
    image: string | null;
    name: string | null;
    username: string | null;
    birthday: string | null;
    isSubscribed: boolean;
    referredBy: string | null;
}

export default function UsersPage() {
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers: UserType[] = await getAllUsers();
                setUsers(allUsers);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="mt-20 mx-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users?.length ? users?.map((user, index) => {
                    return (
                        <SingleUser
                            user={user}
                            key={`user-${index}`}
                        />
                    )
                }) : ""
                }
            </div>
        </div>
    )
}