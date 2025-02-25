import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CoverImage from "./CoverImage";
import CreatePost from "@/components/CreatePost";
import { Suspense } from "react";

const UserProfile = async ({ user }: any) => {
	return (
		<div className='flex flex-col'>
			<Suspense fallback={<p></p>}>
				<CoverImage user={user} />
			</Suspense>

			<div className='flex flex-col p-4'>
				<div className='flex flex-col md:flex-row gap-4 justify-between'>
					<Avatar className='w-20 h-20 border-2 -mt-10'>
						<AvatarImage src={user?.image || "/user-placeholder.png"} className='object-cover' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>

				<div className='flex flex-col mt-4'>
					<p className='text-lg font-semibold'>{user?.name}</p>
					<p className='text-sm mt-2 md:text-md'>
						Discover daily tips and tricks for fans health and care, along with insights into my personal
						routine with my fans. Subscribe now to gain access to exclusive content and become part of the
						community.
					</p>
				</div>
			</div>
			<div aria-hidden='true' className='h-2 w-full bg-muted' />
			<CreatePost></CreatePost>
		</div>
	);
};
export default UserProfile;
