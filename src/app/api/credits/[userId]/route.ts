
import prisma from "@/db/prisma";

type creditHistory = { createdAt: string; };

export const POST = async (req: any, { params }: any) => {
    try {
        const { userId } = params;

        const body = await req.json();

        console.log('body is ', body);

        const credithistory = {
            userId: userId,
            amount: body.amount,
            type: body.type,
            fromUserId: body.fromUserId !== undefined ? body.fromUserId : "",
            toUserId: body.toUserId !== undefined ? body.toUserId : ""
        };

        console.log("creditHistory: ", credithistory);

        const creditHistory = await prisma.creditHistory.create({
            data: credithistory
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                credits: {
                    increment: body.amount
                }
            }
        });

        return new Response(JSON.stringify(creditHistory), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error Finding Credit History:", error);
        return new Response(JSON.stringify({ error: "Failed to create credit." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};

export const GET = async (req: any, { params }: any) => {
    try {
        const { userId } = params;

        console.log(userId, "CREDIT ON API");

        const creditHistory = await prisma.creditHistory.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        console.log(creditHistory, "creditHistory");

        return new Response(JSON.stringify(creditHistory), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error Finding Credit History:", error);
        return new Response(JSON.stringify({ error: "Failed to get credit." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};

