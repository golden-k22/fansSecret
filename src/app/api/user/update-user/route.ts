// /pages/api/user/updateUser.js
import prisma from "@/db/prisma";

// Define the PUT handler as an exported constant
export const PUT = async (req: any) => {
  try {
    // Parse JSON payload
    const { id } = await req.json(); // Parses the JSON body correctly if sent as JSON
    console.log("User ID received:", id);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isVerified: true },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user2." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
