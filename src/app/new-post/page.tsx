import React, { Suspense } from 'react';
import BaseLayout from "@/components/BaseLayout";
import ContentTab from "./content/ContentTab";


const Page = () => {

	return (
		<BaseLayout renderRightPanel={false}>
			<Suspense fallback={<div>Loading...</div>}>
				<ContentTab />
			</Suspense>
		</BaseLayout>
	);
};
export default Page;
