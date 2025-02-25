import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AdminSidebar from "./AdminSidebar";
import SuggestedProducts from "./SuggestedProducts";

const BaseLayout = async ({
	children,
	renderRightPanel = true,
}: {
	children: ReactNode;
	renderRightPanel?: boolean;
}) => {

	const { isAuthenticated } = getKindeServerSession();
	const { getUser } = getKindeServerSession()
	const user = await getUser()
	const isAdmin = process.env.ADMIN_EMAIL === user?.email;

	// if (!(await isAuthenticated())) {
	// 	return redirect("/");
	// }

	return (
		<div className='flex max-w-2xl lg:max-w-7xl mx-auto relative'>
			{/* <div className='flex max-w-2xl mx-auto relative' style={{marginLeft: 'unset', maxWidth: '100%'}}> */}
			<Sidebar id={user?.id ?? ""} />
			<div className={`w-full flex flex-col ${renderRightPanel ? 'lg:w-3/5' : 'lg:w-full'}`}>{children}</div>
			{/* </div><div className='w-full flex flex-col border-r'>{children}</div> */}
			{renderRightPanel && <SuggestedProducts />}
		</div>
	);

};

export default BaseLayout;
