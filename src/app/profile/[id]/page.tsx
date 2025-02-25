import HomeScreen from "@/components/user-section/HomeScreen";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUser(id: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

const ProfilePage = async ({ params }: { params: { id: string } }) => {
    const user = await getUser(params.id);

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <HomeScreen user={user} />
    )
}

export default ProfilePage;