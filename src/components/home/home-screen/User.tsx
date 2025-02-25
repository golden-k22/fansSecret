"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserType } from "./Users";
import CoverImage from "./CoverImage";
import { User } from "@prisma/client";
import { Suspense, useEffect, useState } from "react";
import { getUserAction, handleFollowing, CheckIfFollowing } from "./actions";
import Link from "next/link";

const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

const SingleUser = ({
    user,
}: {
    user: UserType;
}) => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const cUser: any = await getUserAction();
            setCurrentUser(cUser);
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        async function checkIsFollowing() {
            if (currentUser) {
                const val = await CheckIfFollowing(user.id, currentUser.id);
                setIsFollowing(val);
            }
        }
        checkIsFollowing();
    }, [currentUser]);

    const handleFollow = () => {
        if (currentUser && currentUser.id) {
            handleFollowing(user.id, currentUser.id);
        }
    }

    if (currentUser && currentUser.id === user.id) return null;

    return (
        <div className="flex flex-col items-center justify-center">
            <Link className="flex flex-col items-center gap-2 mb-2" href={`${publicUrl}/profile/${user.id}`}>
                <Avatar className='w-20 h-20 border-2'>
                    <AvatarImage
                        src={user?.image || "/user-placeholder.png"}
                        className="object-cover"

                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-md md:text-md" style={{ cursor: "pointer" }}>{user ? user.name : ""}</span>
            </Link>
            <Suspense fallback={<p></p>}>
                <CoverImage user={user} />
            </Suspense>
            {
                currentUser && !isFollowing ?
                    <div className='flex mt-2'>
                        <Button asChild className='rounded-full flex gap-10 cursor-pointer' onClick={handleFollow}>
                            <span className='uppercase font-semibold tracking-wide'>+ Follow</span>
                        </Button>
                    </div> :
                    <div className='flex mt-2'>
                        <Button asChild className='rounded-full flex gap-10 cursor-pointer'>
                            <span className='uppercase font-semibold tracking-wide'>Following</span>
                        </Button>
                    </div>
            }
        </div>
    );
};

export default SingleUser;
