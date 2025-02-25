import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CoverImage from "./CoverImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";
import CreatePost from "@/components/CreatePost";

const UserProfile = async () => {
	const currentUser = await getUserProfileAction();

	const admin = await prisma.user.findUnique({
		where: {
			email: currentUser?.email!,
		},
	});
	return (
		<div className='flex flex-col'>
			{admin ? <CoverImage user={admin} /> : ""}

			<div className='flex flex-col p-4'>
				<div className='flex flex-col md:flex-row gap-4 justify-between'>
					<Avatar className='w-20 h-20 border-2 -mt-10'>
						<AvatarImage src={admin?.image || "/user-placeholder.png"} className='object-cover' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<div className='flex'>
						<Button asChild className='rounded-full flex gap-10 cursor-pointer'>
							<span className='uppercase font-semibold tracking-wide'>Follow</span>
						</Button>
					</div>
				</div>

				<div className='flex flex-col mt-4'>
					<p className='text-lg font-semibold'>{admin?.name}</p>
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
