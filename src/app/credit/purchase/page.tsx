import BaseLayout from "@/components/BaseLayout";
import CreditPurchase from "@/components/CreditPurchase";

const Page = () => {

    return (
        <BaseLayout renderRightPanel={false}>
            <CreditPurchase />
        </BaseLayout>
    );
};

export default Page;
