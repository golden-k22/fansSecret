"use client";

import axios from "axios";
import BaseLayout from "@/components/BaseLayout";
import UserPage from "@/components/home/home-screen/UserPage";
import { getUsersAction } from "@/components/home/home-screen/actions";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import MessagingPage from "@/components/home/home-screen/MessagingPage";
import Loading from "@/components/Loading";
import LoadingWithoutImage from "@/components/LoadingWithoutImage";

import Sidebar from "@/components/Sidebar";
import Searchbar1 from "@/components/Searchbar1";
const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isCreater = searchParams.get("isCreater");

  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const users: any = await getUsersAction();
      setFetchedUsers(users);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleClick = async (selectedReceiverId: string) => {
    setChatLoading(true);
    if (!id || !selectedReceiverId) {
      return;
    }
    const res = await axios.get(`/api/message/${selectedReceiverId}`, {
      params: { senderId: id },
    });

    setMessageData(res.data);
    setReceiverId(selectedReceiverId);
    setChatLoading(false);
  }

  return (

    <div className="w-[40vw] lg:w-4.8/5 flex  border-r">
      <div className="mt-5"></div>
      {loading && <Loading />}
      {chatLoading && <LoadingWithoutImage/>}
      
      <div className=" w-[40vw]  lg:w-4.8/5 flex flex-col  border-r">
      <div>
        <Searchbar1 />
      </div>
        {fetchedUsers?.map((user: any) => {
          if (user) {
            if (user.id == id) {
              return;
            }

            if (!isCreater) {
              if (!user.isCreater) {
                return;
              }
            }
            return (
              <div key={user.id} onClick={() => handleClick(user.id)} style={{ backgroundColor: user.id == receiverId ? "#41a0da" : "" }}>
                <UserPage
                  style={{ width: "40vw" }}
                  id={user.id}
                  key={user.id}
                  post={user}
                  admin={false}
                  isSubscribed={false}
                />
              </div>
            );
          }
        })}
      </div>
      <div >
        <MessagingPage body={"Tap on User to start Chating"} style={{ width: "35vw" }} messageData={messageData} senderId={id} receiverId={receiverId} />
      </div>
    </div>

  );
};
export default Page;