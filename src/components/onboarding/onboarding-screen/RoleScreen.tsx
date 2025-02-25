import BaseLayout from "@/components/BaseLayout";
import UserPage from "@/components/home/home-screen/UserPage";
import ReferralForm from "../ReferralForm";

const Page = ({user} : any) => {
  return (
    <BaseLayout renderRightPanel={false}>
      <div className="mt-5"></div>

      <ReferralForm user={user}/>
    </BaseLayout>
  );
};
export default Page;
