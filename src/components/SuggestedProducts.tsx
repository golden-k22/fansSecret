import prisma from "@/db/prisma";
import SuggestedProduct from "./SuggestedProduct";
import Serchbar from "./Serchbar";
import { Coins } from "lucide-react";

const SuggestedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isArchived: false,
    },
    take: 4,
  });

  return (
    <div
      className="lg:w-2/5 hidden lg:flex flex-col gap-3 px-2 sticky top-0 right-0
    h-screen ml-3"
    >
      <div className="flex flex-col gap-2 mt-20 ">
        <div className="flex gap-2 self-end mb-4 mr-4 border rounded-full border-gray-800 px-8 py-2 ">
          <Coins className="w-6 h-6" />
          <div className="font-bold text-md text-[#FFD2BF]">100</div>
        </div>
        <Serchbar />
        <p className="uppercase text-muted-foreground font-semibold tracking-tight">
          Recommended Posts
        </p>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <SuggestedProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SuggestedProducts;
