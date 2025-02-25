import BaseLayout from "@/components/BaseLayout";
import CreditManage from "@/components/CreditManage";

const Page = () => {
    return (
        <BaseLayout renderRightPanel={false}>
            <CreditManage />
        </BaseLayout>
    );
};

export default Page;
