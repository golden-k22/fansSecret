import { NextResponse } from 'next/server';
import prisma from '@/db/prisma'; // Adjust the path to your Prisma client

export async function GET() {
  try {
    const messages = await prisma.adminMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
