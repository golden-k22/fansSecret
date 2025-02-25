import React, { Suspense } from 'react';
import BaseLayout from "@/components/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./content/ContentTab";
import StoreTab from "./store/StoreTab";
import AnalyticsTab from "./analytics/AnalyticsTab";


const Page = () => {

	return (
		<BaseLayout renderRightPanel={false}>
			<Suspense fallback={<div>Loading...</div>}>
				<Tabs defaultValue='content' className='w-full mx-auto my-10 px-2 md:px-10'>
					<TabsList className='flex flex-col md:flex-row w-full md:w-3/4 mx-auto h-auto'>
						<TabsTrigger value='content' className='w-full md:w-auto'>
							Create
						</TabsTrigger>

						<TabsTrigger value='analytics' className='w-full md:w-auto'>
							Analytics
						</TabsTrigger>
					</TabsList>

					<TabsContent value='content'>
						<ContentTab />
					</TabsContent>
					<TabsContent value='store'>
						<StoreTab />
					</TabsContent>
					<TabsContent value='analytics'>
						<AnalyticsTab />
					</TabsContent>
				</Tabs>
			</Suspense>
		</BaseLayout>
	);
};
export default Page;
