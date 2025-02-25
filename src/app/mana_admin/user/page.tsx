

import BaseLayout from "@/components/BaseLayout";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import UserManage from "@/components/home/home-screen/UserManage";
import prisma from "@/db/prisma";

// type User = {
// 	userID: string;
// 	name: string;
// 	age: number;
// 	email: string;
// };


const Page = async () => {
	// const [users, setUsers] = useState<User[]>([]);
	// const [searchQuery, setSearchQuery] = useState("");

	// const fetchUsers = async (query: string) => {
	// 	const response = await fetch(`/api/users?query=${query}`);
	// 	const data = await response.json();
	// 	setUsers(data);
	// };

	// useEffect(() => {
	// 	// Fetch all users initially
	// 	fetchUsers("");
	// }, []);

	// const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const query = e.target.value;
	// 	setSearchQuery(query);
	// 	fetchUsers(query);
	// };

	return (
		<BaseLayout renderRightPanel={false}>
			<div className='px-3 md:px-10 my-10'>
				<h1 className='text-3xl text-center my-5 font-bold tracking-tight'>
					All Users
				</h1>

				<div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
			
					<UserManage />
				</div>
			</div>
		</BaseLayout>
	);
};
export default Page;
