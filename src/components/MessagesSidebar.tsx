"use client";

import UserPage from "@/components/home/home-screen/UserPage";
import { getUsersAction } from "@/components/home/home-screen/actions";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";

const MessagesSidebar = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isCreater = searchParams.get("isCreater");
  console.log(id, "ID");

  const [fetchedUsers, setFetchedUsers] = useState([]);
  useEffect(() => {

    const fetchUsers = async () => {
      const users: any = await getUsersAction();
      console.log(users, "IFNAL USERS");
      setFetchedUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full lg:w-4.8/5 flex flex-col border-r">

      <div className="mt-5"></div>
      {fetchedUsers?.map((user: any) => {
        if (user?.id == id) {
          return;
        }

        if (!isCreater) {
          if (!user?.isCreater) {
            return
          }
        }
        return (
          <UserPage
            style={{ width: "40vw", cursor: "pointer" }}
            id={user?.id}
            key={user?.id}
            post={user}
            admin={false}
            isSubscribed={false}
          />
        );
      })}
    </div>
  );
};
export default MessagesSidebar;
