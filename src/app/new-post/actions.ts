"use server";

import prisma from "@/db/prisma";
import { centsToDollars } from "@/lib/utils";
import { getUserProfileAction } from "@/app/update-profile/actions";

type PostArgs = {
  text: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  isPublic: boolean;
  tags: any;
  collaboratetags: any;
  sheduled: any;
  price?: number;
};

export async function createPostAction({
  isPublic,
  mediaUrl,
  mediaType,
  text,
  tags,
  collaboratetags,
  sheduled,
  price
}: PostArgs) {
  const admin = await checkIfAdmin();

  if (!admin) {
    // throw Error("Unauthorized");
    return { success: false, message: "Unauthorized" };
  }

  console.log(
    "FORM DATA ",
    text,
    mediaUrl,
    mediaType,
    isPublic,
    admin?.id,
    tags,
    collaboratetags,
    sheduled,
    price
  );

  const newPost = await prisma.post.create({
    data: {
      text,
      mediaUrl,
      mediaType,
      isPublic,
      userId: admin?.id,
      hashtags: tags,
      collaboratetags: collaboratetags,
      isSheduled: sheduled.toString(),
      price: price
    },
  });

  if (collaboratetags !== "") {
    let collaborateUsers = collaboratetags.trim().split(",");
    for (let i = 0; i < collaborateUsers.length; i++) {
      console.log("collaborateUsers[i]: ", collaborateUsers[i])
      const user = await prisma.user.findFirst({
        where: {
          email: {
            startsWith: collaborateUsers[i].replaceAll("@", "")
          }
        }
      });
      console.log("collaborateUsers: ", JSON.stringify(user));
      if (user !== null) {
        const newNotification = await prisma.notifications.create({
          data: {
            userId: user?.id,
            title: "Collaborative Content Request",
            description: `${admin?.id} requested on post ${newPost.id} collaborate with you.`
          },
        });
      }
    }
  }

  return { success: true, post: newPost };
}

export async function getAllProductsAction() {
  const isAdmin = await checkIfAdmin();

  if (!isAdmin) {
    // throw new Error("Unauthorized");
    return null;
  }

  const products = await prisma.product.findMany();

  return products;
}

type ProductArgs = {
  name: string;
  image: string;
  price: string;
};

export async function addNewProductToStoreAction({
  name,
  image,
  price,
}: ProductArgs) {
  const isAdmin = await checkIfAdmin();

  if (!isAdmin) {
    return { success: false, message: "Unauthorized" };
  }

  if (!name || !image || !price) {
    throw new Error("Please provide all the required fields");
  }

  const priceInCents = Math.round(parseFloat(price) * 100);

  if (isNaN(priceInCents)) {
    throw new Error("Price must be a number");
  }

  const newProduct = await prisma.product.create({
    data: {
      image,
      price: priceInCents,
      name,
    },
  });

  return { success: true, product: newProduct };
}

export async function toggleProductArchiveAction(productId: string) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new Error("Product not found");
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      isArchived: !product.isArchived,
    },
  });

  return { success: true, product: updatedProduct };
}

export async function getDashboardData() {
  const totalRevenuePromise = Promise.all([
    prisma.order.aggregate({
      _sum: {
        price: true,
      },
    }),
    prisma.subscription.aggregate({
      _sum: {
        price: true,
      },
    }),
  ]);

  const totalSalesPromise = prisma.order.count();
  const totalSubscriptionsPromise = prisma.subscription.count();

  const recentSalesPromise = prisma.order.findMany({
    take: 4,
    orderBy: {
      orderDate: "desc",
    },
    select: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      price: true,
      orderDate: true,
    },
  });

  const recentSubscriptionsPromise = prisma.subscription.findMany({
    take: 4,
    orderBy: {
      startDate: "desc",
    },
    select: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      price: true,
      startDate: true,
    },
  });


  const [
    totalRevenueResult,
    totalSales,
    totalSubscriptions,
    recentSales,
    recentSubscriptions,
  ] = await Promise.all([
    totalRevenuePromise,
    totalSalesPromise,
    totalSubscriptionsPromise,
    recentSalesPromise,
    recentSubscriptionsPromise,
  ]);

  const totalRevenue =
    (totalRevenueResult[0]._sum.price || 0) +
    (totalRevenueResult[1]._sum.price || 0);

  return {
    totalRevenue: centsToDollars(totalRevenue),
    totalSales,
    totalSubscriptions,
    recentSales,
    recentSubscriptions,
  };
}

async function checkIfAdmin() {

  const user = await getUserProfileAction();
  console.log("USER:", user?.isCreater);

  const isAdmin = user?.isCreater;

  if (!user || !isAdmin) return false;

  return user;
}
