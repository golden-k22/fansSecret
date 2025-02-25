// pages/merch/[id].js

import BaseLayout from "@/components/BaseLayout";
import ProductCard from "@/components/ProductCard";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCheckout from "./ProductCheckout";
import prisma from "@/db/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
	const currentProduct = await prisma.product.findUnique({
		where: {
			id: params.id,
		},
	});

	if (!currentProduct || currentProduct.isArchived) return notFound();

	const products = await prisma.product.findMany({
		where: {
			isArchived: false,
			id: { not: params.id },
		},
	});

	return (
		<BaseLayout renderRightPanel={false}>
			<Suspense fallback={<div>Loading...</div>}>
				<div className='px-3 md:px-7 my-20'>
					<ProductCheckout product={currentProduct} />
					<h1 className='text-3xl text-center mt-20 mb-10 font-bold tracking-tight'>
						<UnderlinedText className='decoration-wavy underline-offset-8'>Suggested</UnderlinedText>
					</h1>
					<div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</Suspense>
		</BaseLayout>
	);
};

export default Page;