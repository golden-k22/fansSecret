
import prisma from "@/db/prisma";

export const POST = async (req: any, { params }: any) => {

  const sizeMap: { [key: string]: string } = {
    sm: "Small",
    md: "Medium",
    lg: "Large",
  };

  try {

    const { receiverId } = params;
    console.log(receiverId, "RECEIVER ID123")
    const body = await req.json();
    console.log(body, "REQUEST BODY")

    const message = {
      content: body.content,
      senderId: body.senderId,
      receiverId: receiverId
    }

    const updatedUser = await prisma.message.create({
      data: message,
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    //console.error("Error updating user1:", error);
    return new Response(JSON.stringify({ error: "Failed to update user1." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

type Message = { createdAt: string; };
export const GET = async (req: any, { params }: any) => {
  try {
    const { receiverId } = params;
    const url = new URL(req.url); // Get the full URL
    const senderId = url.searchParams.get('senderId'); 
    //console.log(receiverId, "RECEIVER ON API");

    // let senderId;
    // if (req.body) {
    //   const body = await req.json();
    //   senderId = body.senderId;
    // } else {
    //   console.warn("Request body is empty or invalid.");
    // }

    console.log(senderId, "SENDER ON API");

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: senderId ?? "",
            receiverId: receiverId ?? "",
          },
          {
            senderId: receiverId ?? "",
            receiverId: senderId ?? "",
          }
        ]

      },
    });
    console.log(messages, "messages");
    const sortedMessages = [...messages].sort((a, b) => {
      // return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return new Response(JSON.stringify(sortedMessages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user2:", error);
    return new Response(JSON.stringify({ error: "Failed to update user." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

