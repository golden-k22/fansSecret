import BaseLayout from "@/components/BaseLayout";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";
import UsersPage from "./Users";

const HomeScreen = async ({ query = null }: any) => {
  const user = await getUserProfileAction();

  console.log("QUERY: components\\home\\home-screen\\HomeScreen", query)
  console.log("Loggedin user", user);

  try {
    if (user) {
      const body = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        isSubscribed: false,
        customerId: "3",
        isCreater: false,
        referralId: "default-referral-id",
        isBlocked: false,
      };

      console.log(user, "USER ACTUAL");
      // const users = await prisma.user.create({
      //   data: body,
      // });

      // console.log("USER POSTED :", users);
      const admin = user.isCreater || false;

      console.log("email", admin);

      if (!user) return notFound();

      if (user?.isBlocked === true) {
        return (
          <div className="flex max-w-2xl lg:max-w-7xl mx-auto relative">
            <div className="w-full p-4 text-center text-red-600 font-bold">
              Your account has been blocked. Please contact support for more information.
            </div>
          </div>
        );
      }



      return (
        <BaseLayout renderRightPanel={false}>
          <UsersPage />
        </BaseLayout>
      );
    }
  } catch (error) {
    console.log("USER FETCHING ERROR: ", error);
  }
};
export default HomeScreen;