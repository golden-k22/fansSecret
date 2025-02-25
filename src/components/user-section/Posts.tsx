"use client";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import Post from "./Post";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getPostsAction } from "./actions";
import { getUsersAction } from "./actions";
import { useEffect, useState } from "react";
import UserPage from "./UserPage";
// import {HandleCredits} "fs/promises";

const Posts = ({
  admin,
  query = null,
  isCreater = false,
}: {
  admin: User;
  query: any;
  isCreater: boolean;
}) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPostsAction(),
  });

  const [fetchedUsers, setFetchedUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      const users: any = await getUsersAction()
      // console.log(users, "IFNAL USERS")
      setFetchedUsers(users)
    }
    fetchUsers()
  }, [])


  //console.log("QUERY: ", query);
  return (
    <div>
      <div className="text-balance  text-sm leading-loose text-muted-foreground md:text-left text-center my-[2%] w-[100%] ml-4"> {query && `Showing results for ${query.includes("%23") ? query.substring(3) : query}`}</div>
      {!isLoading && query
        ? (query.includes("%23")
          ? posts?.map((post) => {
            let filter = query.substring(3)
            //  console.log(post?.hashtags, "HASHHHH")
            //  console.log(post, "MAPPED POSTS ")
            if (!(post?.hashtags?.includes(filter))) {
              return
            }
            // console.log(post, "MAPPED POST WITH QUERY")
            return (
              <Post
                key={post.id}
                post={post}
                admin={admin}
              />
            );
          })
          : fetchedUsers?.map((user: any) => {
            // filter conditiion for users
            if (!(user?.name.toLowerCase().includes(query.toLowerCase()))) {
              return
            }
            if (!isCreater) {
              if (!user?.isCreater) {
                return
              }
            }

            return (
              <UserPage
                style={{ width: "40vw" }}
                id={user?.id}
                key={user?.id}
                post={user}
                admin={false}
                isSubscribed={false}
              />
            );
          }))
        : posts?.map((post) => {
          // console.log(posts, 'MAPPED POSTS WITHOUT QUERY')
          // if (post.isSheduled) {
          //   // console.log(post.isSheduled, "ACTUAL DATE ")
          //   const scheduledDate = new Date(post.isSheduled);
          //   ;
          //   const currentDate = new Date();
          //   // console.log(scheduledDate, "SHEDULED DATE CONDITION OUTSIDE")
          //   // console.log(currentDate, "CURRENT DATE CONDITION OUTSIDE")
          //   if (currentDate < scheduledDate) {
          //     // console.log("CONDITION TRUE")
          //     // console.log(scheduledDate, "SHEDULED DATE")
          //     // console.log(currentDate, "CURRENT DATE")
          //     return
          //   };
          // }
          return <Post
            key={post.id}
            post={post}
            admin={admin}
          />
        })}

      {isLoading && (
        <div className="mt-10 px-3 flex flex-col gap-10">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && posts?.length === 0 && (
        <div className="mt-10 px-3">
          <div className="flex flex-col items-center space-y-3 w-full md:w-3/4 mx-auto ">
            <p className="text-xl font-semibold">
              No Posts <UnderlinedText>Yet</UnderlinedText>
            </p>

            <p className="text-center">
              Stay tuned for more posts from{" "}
              <span className="text-primary font-semibold text-xl">fans.</span>{" "}
              You can subscribe to access exclusive content when it's available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Posts;
