import BaseLayout from "@/components/BaseLayout";

import PaymentsTab from "./payments/PaymentsTab";

const Page = () => {
  return (
    <BaseLayout renderRightPanel={false}>
      <PaymentsTab />
    </BaseLayout>
  );
};
export default Page;
