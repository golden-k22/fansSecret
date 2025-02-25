
import prisma from "@/db/prisma";

type notification = { createdAt: string; };

export const GET = async (req: any, { params }: any) => {
    try {
        const { userId } = params;

        console.log(userId, "NOTIFICATION ON API");

        const notification = await prisma.notifications.findMany({
            where: {
                userId: userId
            }
        });
        console.log(notification, "notification");

        return new Response(JSON.stringify(notification), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error Finding Notification:", error);
        return new Response(JSON.stringify({ error: "Failed to get credit." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};

