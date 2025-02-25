import { NextResponse } from "next/server";
import prisma from "@/db/prisma"; // Adjust the import path to your Prisma client

// Fetch a specific banned word by ID (GET request)
export async function GET(request: Request) {
  try {
    
    const bannedWord = await prisma.bannedWord.findMany({
      where: { banned_state: true },
    });

    if (!bannedWord) {
      return NextResponse.json({ error: "Banned word not found" }, { status: 404 });
    }

    return NextResponse.json(bannedWord);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch banned word" }, { status: 500 });
  }
}
