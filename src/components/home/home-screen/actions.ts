"use server";

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserType } from "./Users";

export async function getPostsAction() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	const posts = await prisma.post.findMany({
		include: {
			comments: {
				include: {
					user: true,
				},
			},
			likesList: { where: { userId: user.id } },
		},
	});

	console.log("POSTS ARE ", posts);

	return posts;
}

export async function deletePostAction(postId: string) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const post = await prisma.post.findUnique({ where: { id: postId } });

	if (post?.userId !== user?.id) throw new Error("Only admin can delete posts");

	await prisma.post.delete({ where: { id: postId } });

	return { success: true };
}

export async function likePostAction(postId: string) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	const userProfile = await prisma.user.findUnique({ where: { id: user.id } });
	if (!userProfile?.isSubscribed) return;

	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: { likes: true, likesList: { where: { userId: user.id } } },
	});

	if (!post) throw new Error("Post not found");

	let newLikes: number;
	if (post.likesList.length > 0) {
		newLikes = Math.max(post.likes - 1, 0);
		await prisma.like.deleteMany({
			where: { postId: postId, userId: user.id },
		});
	} else {
		newLikes = post.likes + 1;
		await prisma.like.create({
			data: { postId: postId, userId: user.id },
		});
	}

	await prisma.post.update({
		where: { id: postId },
		data: { likes: newLikes },
	});

	return { success: true };
}

export async function commentOnPostAction(postId: string, text: string) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	const userProfile = await prisma.user.findUnique({ where: { id: user.id } });
	if (!userProfile?.isSubscribed) return;

	const comment = await prisma.comment.create({
		data: {
			text,
			postId,
			userId: user.id,
		},
	});

	return { success: true };
}


export async function getUsersAction() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	const users = await prisma.user.findMany({
		// include: {
		// 	// comments: {
		// 	// 	include: {
		// 	// 		user: true,
		// 	// 	},
		// 	// },
		// 	// likesList: { where: { userId: user.id } },
		// },
	});

	console.log(
		users, "FETCHED USERS"
	)

	return users;
}

export async function getUserAction() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	return user;
}


export async function getUsersMessagesActions() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

	const users = await prisma.user.findMany({
		// include: {
		// 	// comments: {
		// 	// 	include: {
		// 	// 		user: true,
		// 	// 	},
		// 	// },
		// 	// likesList: { where: { userId: user.id } },
		// },
	});

	console.log(
		users, "FETCHED USERS"
	)

	return users;
}


export async function getUserData(userId: string): Promise<any> {
	try {
		const userData = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		return userData;
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

export async function getAllUsers(): Promise<any> {
	try {
		const allUsers = await prisma.user.findMany();
		return allUsers;
	} catch (error) {
		console.error('Error fetching all users:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

export async function getUserStatus(user: UserType): Promise<any> {
	try {
		const imageCount = await prisma.post.count({
			where: {
				mediaType: "image",
				userId: user.id
			},
		});

		const videoCount = await prisma.post.count({
			where: {
				mediaType: "video",
				userId: user.id
			},
		});

		const totalLikes = await prisma.post.aggregate({
			_sum: {
				likes: true,
			},
			where: {
				userId: user.id
			}
		});

		const followerCount = await prisma.follower.count({
			where: {
				userId: user.id,
			},
		});

		return {
			imageCount: imageCount,
			videoCount: videoCount,
			totalLikes: totalLikes,
			followerCount: followerCount
		}
	} catch (error) {
		throw error;
	}
}

export async function handleFollowing(userId: string, followerId: string): Promise<any> {
	try {
		const newFollower = await prisma.follower.create({
			data: {
				userId,
				followerId,
			},
		});
		return newFollower;
	} catch (error) {
		console.error('Error creating follower:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

export async function CheckIfFollowing(userId: string, followerId: string): Promise<boolean> {
	try {
		const existingFollower = await prisma.follower.findFirst({
			where: {
				userId,
				followerId,
			},
		});

		return existingFollower !== null;
	} catch (error) {
		console.error('Error checking following status:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}
