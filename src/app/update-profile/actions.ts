"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function getUserProfileAction() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) return null;
	const customerId = await bcrypt.hash(Date.now().toString(), 10);
	const referralId = await bcrypt.hash(Date.now().toString(), 10);
	
	try {
		const currentUser = await prisma.user.findUnique({ where: { id: user.id } });
		console.log("app\\update-profile\\action", user)
		console.log(currentUser, "CURRRENT")
		if (!currentUser) {
			const body = {
				id: user.id,
				email: user.email!,
				name: user.given_name + " " + user.family_name,
				image: user.picture,
				isSubscribed: false,
				isCreater:false,
				customerId:customerId,
				referralId: referralId,
				isBlocked: false,
			  }

			const users = await prisma.user.create({
				data: body
			  });
			  console.log("USER POSTED IN DATABASE  :", users)
			  return users
		}
		return currentUser;
	} catch (error) { 
			console.log("user is not in db", error)
	}
}

export async function updateUserProfileAction({ name, image }: { name: string; image: string }) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	const updatedFields: Partial<User> = {};

	if (name) updatedFields.name = name;
	if (image) updatedFields.image = image;

	const updatedUser = await prisma.user.update({
		where: { id: user.id },
		data: updatedFields,
	});

	revalidatePath("/update-profile");

	return { success: true, user: updatedUser };
}
