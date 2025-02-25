import { NextResponse } from "next/server";
import prisma from '@/db/prisma'; // Ensure Prisma is set up correctly

export async function GET() {
    try {
      const bannedActive = await prisma.bannedActive.findMany();
  
      return NextResponse.json(bannedActive);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch banned words" }, { status: 500 });
    }
  }