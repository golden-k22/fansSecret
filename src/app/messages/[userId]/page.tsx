import { Suspense } from "react";
import BaseLayout from "@/components/BaseLayout";

import UserPage from "@/components/home/home-screen/UserPage";
import MessagingPage from "@/components/home/home-screen/MessagingPage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


const Page = async ({ params }: any) => {
  const userId = params.userId
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <BaseLayout renderRightPanel={false}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-5"></div>
        <MessagingPage senderId={user?.id} receiverId={userId} />
      </Suspense>
    </BaseLayout>
  );
};
export default Page;
