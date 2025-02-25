import React from 'react'
import BaseLayout from "@/components/BaseLayout";
import SettingsComponent from "@/components/SettingsComponent";

const Page = () => {
    return (
        <BaseLayout renderRightPanel={false}>
            <SettingsComponent />
        </BaseLayout>
    );
};

export default Page;