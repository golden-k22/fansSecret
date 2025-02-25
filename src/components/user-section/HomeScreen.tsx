import BaseLayout from "@/components/BaseLayout";
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import { getUserProfileAction } from "@/app/update-profile/actions";

const HomeScreen = async ({ user }: any) => {
  const admin = await getUserProfileAction();
  try {
    if (user) {
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
          <UserProfile user={user} />
          {admin ? <Posts isCreater={user.isCreater} admin={admin} query={''} /> : ""}
        </BaseLayout>
      );
    }
  } catch (error) {
    console.log("USER FETCHING ERROR: ", error);
  }
};
export default HomeScreen;