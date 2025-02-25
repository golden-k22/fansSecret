import BaseLayout from "@/components/BaseLayout";

import Notications from "@/components/notification";


//  const frequencies: PricingTierFrequency[] = [
// 	{ id: "1", value: "1", label: "Monthly", priceSuffix: "/month" },
// 	{ id: "2", value: "2", label: "Annually", priceSuffix: "/year" },
// ];

const Page = () => {

  
  return (
    <BaseLayout renderRightPanel={false}>
      <div className="mt-5"></div>
      <Notications />
    </BaseLayout>
  );
};
export default Page;
