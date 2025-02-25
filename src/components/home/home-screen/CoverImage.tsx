import { Heart, Image as ImageIcon, Video, CircleUser } from "lucide-react";
import { getUserStatus } from "./actions";
import { useEffect, useState } from "react";
import { UserType } from "./Users";

const CoverImage = async ({ user }: { user: UserType }) => {
	const [imageCount, setImageCount] = useState<number>(0);
	const [videoCount, setVideoCount] = useState<number>(0);
	const [totalLikes, setTotalLikes] = useState<number>(0);
	const [followerCount, setFollowerCount] = useState<number>(0);

	useEffect(() => {
		async function fetchData() {
			await getUserStatus(user)
				.then(res => {
					setImageCount(res.imageCount);
					setVideoCount(res.videoCount);
					setTotalLikes(Number(res.totalLikes._sum.likes));
					setFollowerCount(res.followerCount);
				})
		}

		fetchData();
	}, []);

	function formatNumber(num: number) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
		}
		return num.toString();
	}

	return (
		<div className='overflow-hidden relative'>
			<div className='flex justify-between items-center top-0 left-0 px-2 py-1 z-20 w-full'>
				<div className='flex items-center gap-2'>
					<div className='flex flex-col text-white'>
						<div className='flex gap-2 items-center'>
							<div className='flex items-center gap-1'>
								<ImageIcon className='w-4 h-4' />
								<span className='text-sm font-bold'>{imageCount}</span>
							</div>

							<span className='text-xs'>•</span>
							<div className='flex items-center gap-1'>
								<Video className='w-4 h-4' />
								<span className='text-sm font-bold'>{videoCount}</span>
							</div>

							<span className='text-xs'>•</span>
							<div className='flex items-center gap-1'>
								<Heart className='w-4 h-4' />
								<span className='text-sm font-bold'>{formatNumber(totalLikes || 0)}</span>
							</div>

							<span className='text-xs'>•</span>
							<div className='flex items-center gap-1'>
								<CircleUser className='w-4 h-4' />
								<span className='text-sm font-bold'>{followerCount}</span>
							</div>
						</div>
					</div>
				</div>
			</div >
		</div >
	);
};
export default CoverImage;
