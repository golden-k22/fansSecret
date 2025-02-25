import BaseLayout from "@/components/BaseLayout";
import UserProfile from "./UserProfile";
// import Posts from "./Posts";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const HomeScreen = async ({ query = null }: any) => {
  const user = await getUserProfileAction();

  console.log("QUERY: ", query)
  console.log("Loggedin user", user);

  try {
    if (user) {
      const body = {
        id: user.id,
        email: user.email!,
        name: user.name,
        image: user.image,
        isSubscribed: false,
        isCreater:false,
        customerId:"3",
        referralId: "default-referral-id",
      };
      console.log(user, "USER ACTUAL");
      const users = await prisma.user.create({
        data: body,
      });

      console.log("USER POSTED :", users);
      
      const admin = user.isCreater || false;
    
      console.log("email", admin);
    
      if (!user) return notFound();
    
      return (
        <BaseLayout>
          <UserProfile />
        </BaseLayout>
      );
    }
  } catch (error) {
    console.log("USER FETCHING ERROR: ", error);
  }

};
export default HomeScreen;


console.log("real user id2: components\\admin\\AdminScreen", "sss");