"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import styles from "@/components/styles/pricing.module.css";
import { getUserAction } from "./home/home-screen/actions";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

type UserType = {
	id: string;
	email: string;
}

export default function CreditManage() {

	const [currentCredit, setCurrentCredit] = useState(0);
	const [earning, setEarning] = useState(0);
	const [creditHistory, setCreditHistory] = useState([]);
	const [user, setUser] = useState<UserType>();

	useEffect(() => {
		const fetchUsers = async () => {
			const currentUser: any = await getUserAction();
			setUser(currentUser);
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		if (user && user.id) {
			axios.get(`/api/credits/${user.id}`)
				.then((creditHistory: any) => {
					let creditHistoryData = creditHistory.data;
					setCreditHistory(creditHistoryData);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [user]);

	useEffect(() => {
		setCurrentCredit(0);
		creditHistory.forEach((history: any, index: number) => {
			console.log("history: ", index, history)
			if (history.type === "Purchased") {
				setCurrentCredit(prev => prev + history.amount);
			}
			if (history.type === "Earned") {
				setCurrentCredit(prev => prev + history.amount);
				setEarning(prev => prev + history.amount);
			}
			if (history.type === "Spent") {
				setCurrentCredit(prev => prev - history.amount);
			}
			if (history.type === "Withdrawed") {
				setCurrentCredit(prev => prev - history.amount);
			}
		});
	}, [creditHistory]);

	const fancyDateTimeFormat = (str: String) => {
		const date = new Date(str.toString());

		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		};

		const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
		return formattedDate;
	}

	return (
		<div className={cn("flex flex-col w-full items-center mt-32", styles.fancyOverlay)}>
			<div className='w-full flex flex-col items-center mb-24'>
				<div className='mx-auto max-w-7xl px-6 xl:px-8' style={{ textAlign: "center" }}>
					<div className='mx-auto max-w-2xl sm:text-center'>
						<h1 className='text-center text-black dark:text-white text-4xl font-semibold max-w-xs sm:max-w-none md:text-6xl !leading-tight'>
							Credit Manage
						</h1>
					</div>
					<div className='bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto mt-4 max-w-2xl rounded-3xl ring-1 ring-gray-300/70 dark:ring-gray-700 xl:mx-0 xl:max-w-none' style={{ paddingTop: "40px", paddingBottom: "40px" }}>
						<div className="relative w-50">
							<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Current Credit: ${currentCredit}</label>
							<Link href={"/credit/purchase"} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" style={{ marginTop: "20px", marginLeft: "50px" }} >
								Purchase
							</Link>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto mt-4 max-w-2xl rounded-3xl ring-1 ring-gray-300/70 dark:ring-gray-700 xl:mx-0 xl:max-w-none' style={{ paddingTop: "20px", paddingBottom: "40px" }}>
						<div className="relative w-50" style={{ margin: '30px auto 30px auto', marginBottom: "20px" }}>
							<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Earnings: ${currentCredit}</label>
							<Link href={"/credit/purchase"} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" style={{ marginTop: "20px", marginLeft: "50px" }} >
								Request Withdrawl
							</Link>
						</div>
						<Line
							data={{
								labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
								datasets: [
									{
										label: 'Earnings',
										data: [12, 19, 3, 5, 2, 3, 9, 12, 19, 3, 5, 2, 3, 9],
										backgroundColor: 'rgba(255, 99, 132, 0.2)',
										borderColor: 'rgba(255, 99, 132, 1)',
										borderWidth: 1,
									},
								],
							}}
						/>
						{
							creditHistory.length > 0 &&
							<div className="relative w-50 px-5" style={{ margin: '30px auto 30px auto', marginBottom: "10px" }}>
								<div style={{ display: "flex", marginBottom: "20px", alignItems: "center", justifyContent: "space-around" }}>
									<div style={{ display: "flex" }}>
										<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Type:</label>
										<select style={{ background: "#fafbff", color: "#000", borderRadius: "5px", marginLeft: "10px" }}>
											<option>All Activity</option>
											<option>Purchased</option>
											<option>Earned</option>
											<option>Spent</option>
											<option>Withdrawed</option>
										</select>
									</div>
									<div style={{ display: "flex" }}>
										<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Balance: ${currentCredit}</label>
									</div>
								</div>
								<table className="text-sm text-left text-gray-500 dark:text-gray-400" style={{ overflow: "auto", display: "block", margin: "auto" }} >
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<th scope="col" className="px-6 py-3">
												Date
											</th>
											<th scope="col" className="px-6 py-3">
												Description
											</th>
											<th scope="col" className="px-6 py-3">
												Amount
											</th>
											<th scope="col" className="px-6 py-3">
												Balance
											</th>
										</tr>
									</thead>
									<tbody>
										{creditHistory.map((history: any) => (
											<tr key={history.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
												<td className="px-6 py-4">
													{fancyDateTimeFormat(history.createdAt)}
												</td>
												<td className="px-6 py-4">
													{(history.type === "Purchased" || history.type === "Withdrawed") ? history.type : history.type === "Earned" ? "Earned" : "Spent"}
												</td>
												<td className="px-6 py-4">
													{(history.type === "Purchased" || history.type === "Earned") ? "+" + history.amount : "-" + history.amount}
												</td>
												<td className="px-6 py-4">
													{(history.type === "Purchased" || history.type === "Earned") ? "+" + history.amount : "-" + history.amount}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
}
