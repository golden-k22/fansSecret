import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/prisma'; // Assuming Prisma is set up correctly

export const POST = async (req: any) => {
  const body = await req.json();
  const { senderId, receiverId, bannedword, send_content, send_time } = body;

  try {
    // Fetch sender's email
    const sender = await prisma.user.findUnique({
      where: { id: senderId },
      select: { email: true },
    });

    // Fetch receiver's email
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { email: true },
    });

    // Check if both users exist
    if (!sender || !receiver) {
      return new Response(
        JSON.stringify({ error: 'Sender or receiver not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Insert into BannedBehavior table with emails instead of IDs
    const newBannedBehavior = await prisma.bannedBehavior.create({
      data: {
        senderId: sender.email, // Store sender's email
        receiverId: receiver.email, // Store receiver's email
        bannedword,
        send_content,
        send_time: new Date(send_time), // Ensure correct format
      },
    });

    // Return the newly created record
    return new Response(JSON.stringify(newBannedBehavior), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to insert banned behavior' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};