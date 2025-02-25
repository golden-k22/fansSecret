
import BaseLayout from "@/components/BaseLayout";
import UserPage from "@/components/home/home-screen/UserPage";
import CreaterVerificationForm from "@/components/onboarding/CreaterVerificationForm";

const sizeMap: { [key: string]: string } = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
};

const Page = ({ params }: any) => {
  const user = params.accountId
  console.log("USER FROM PARAMS", user)

  return (
    <BaseLayout renderRightPanel={false}>
      <div className="mt-5"></div>
      <CreaterVerificationForm user={user} />
    </BaseLayout>
  );
};
export default Page;
