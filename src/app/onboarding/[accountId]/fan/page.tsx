// "use client"
import BaseLayout from "@/components/BaseLayout";
import UserPage from "@/components/home/home-screen/UserPage";
import FanVerificationForm from "@/components/onboarding/FanVerificationForm";

// const frequencies: PricingTierFrequency[] = [
// 	{ id: "1", value: "1", label: "Monthly", priceSuffix: "/month" },
// 	{ id: "2", value: "2", label: "Annually", priceSuffix: "/year" },
// ];

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
      <FanVerificationForm user={user} />
    </BaseLayout>
  );
};
export default Page;
