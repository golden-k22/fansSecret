import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { centsToDollars } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import { getDashboardData } from "../actions";

const PaymentsTab = async () => {
	const { totalRevenue, totalSubscriptions, totalSales } = await getDashboardData();
	return (
		<>
			<div className='flex justify-between items-center mt-10'>
				<Card style={{ marginLeft: "10px" }}
				>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 '>
						<CardTitle className='text-sm font-medium '>Available Balance</CardTitle>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>${totalRevenue || 0}</div>
					</CardContent>
				</Card>

				{/* <Button style={{ backgroundColor: "#3A3A3A" , marginRight:"10px"}}>Request Amount</Button> */}
				<Button style={{ marginRight: "10px" }} className=' flex gap-10' variant={"outline"}>
					<span className='uppercase font-semibold tracking-wide'>Request Amount</span>
				</Button>



			</div>

			<div className='flex flex-wrap gap-5 my-5 ml-3 mt-10'>
				<div className="text-md text-stone-300">Your payment will be processed within a 5-7 business days. If you have any questions or need further assistance, please don’t hesitate to reach out to our support team.</div>
			</div>
		</>
	);
};
export default PaymentsTab;


