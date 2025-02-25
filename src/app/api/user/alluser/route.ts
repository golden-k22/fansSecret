import prisma from "@/db/prisma";

export const GET = async (req: any) => {
  try {
    const url = new URL(req.url);
    const receiverId = url.searchParams.get("receiverId");
    console.log(receiverId, "RECEIVER ID");

    const allUsers = await prisma.user.findMany({
      where: receiverId ? { id: { not: receiverId } } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return new Response(JSON.stringify(allUsers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
};
