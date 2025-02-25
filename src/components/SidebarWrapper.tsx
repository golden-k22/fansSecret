// 'use server';

// import Sidebar from './Sidebar';
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { getUserProfileAction } from "@/app/update-profile/actions";

// const SidebarWrapper = async ({ id }: { id: string }) => {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   const userProfile = await getUserProfileAction();
  
//   return (
//     <Sidebar
//       id={id}
//       user = {user}
//       userProfile={userProfile}
//     />
//   );
// };

// export default SidebarWrapper;