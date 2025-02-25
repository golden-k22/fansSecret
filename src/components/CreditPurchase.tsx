"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
import { CreditRate, NowpaymentLinkId } from "./CreditRate";
import { QRCodeCanvas } from 'qrcode.react';
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

interface RangeSliderProps {
	minValue: number;
	maxValue: number;
	defaultValue: number;
	onChange: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
	minValue,
	maxValue,
	defaultValue,
	onChange,
}) => {
	const [value, setValue] = useState(defaultValue);

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value);
		setValue(newValue);
		onChange(newValue);
	};

	return (
		<div className="relative w-50" style={{ margin: '30px auto 30px auto' }}>
			<div className="w-full" style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
				<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Pay:  $</label>
				<input
					type="number"
					value={value}
					step={10}
					className="w-4/5 px-4 py-2 border border-gray-300 rounded-md"
					style={{ marginBottom: "5px", background: "#fafbff", color: "#121212" }}
					disabled
					readOnly
				/>
			</div>
			<input
				type="range"
				min={minValue}
				max={maxValue}
				value={value}
				step={10}
				onChange={handleSliderChange}
				className="w-full appearance-none rounded-lg"
				style={{
					cursor: "pointer",
					background: "#808080"
				}}
			/>
		</div>
	);
};

type UserType = {
	id: string;
	email: string;
}

export default function CreditPurchase() {

	const [payAmount, setPayAmount] = useState(10);
	const [creditAmount, setCreditAmount] = useState("7.00000");
	const [isWaiting, setIsWaiting] = useState(false);
	const [paymentId, setPaymentId] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [payAddress, setPayAddress] = useState("");
	const [isLoadingPayment, setIsLoadingPayment] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [user, setUser] = useState<UserType>();

	useEffect(() => {
		const fetchUsers = async () => {
			const currentUser: any = await getUserAction();
			setUser(currentUser);
		};

		fetchUsers();
	}, []);

	const chartDataX = ['10', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'];
	let chartDataYSeries1 = [], chartDataYSeries2 = [];
	for (let i = 0; i < chartDataX.length; i++) {
		chartDataYSeries1.push(chartDataX[i]);
		let interestRate = CreditRate.filter((rate) => rate.price === parseFloat(chartDataX[i]))[0].interest_rate;
		chartDataYSeries2.push((parseFloat(chartDataX[i]) * (1 - interestRate)).toString());
	};

	const onChangePurchaseCredit = (value: number) => {
		setPayAmount(value);
		if (CreditRate.filter((rate) => rate.price === value).length > 0) {
			let interestRate = CreditRate.filter((rate) => rate.price === value)[0].interest_rate;
			setCreditAmount((value * (1 - interestRate)).toFixed(5));
		} else {
			setCreditAmount("0.00000");
		}
	};

	const handlePurchase = () => {
		if (user && user.id) {
			axios.post(`/api/credits/${user.id}`, {
				amount: payAmount,
				type: "Purchased"
			});
			// window.open(`https://nowpayments.io/payment/?iid=${NowpaymentLinkId?[payAmount.toString()]}`, '_blank', 'noopener,noreferrer');
			window.open('https://nowpayments.io/payment/?iid=' + NowpaymentLinkId[payAmount.toString() as keyof typeof NowpaymentLinkId], '_blank', 'noopener,noreferrer');
		}
	};

	const handleClickAddress = () => {
		navigator.clipboard.writeText(payAddress);
	};

	return (
		<div className={cn("flex flex-col w-full items-center mt-32", styles.fancyOverlay)}>
			<div className='w-full flex flex-col items-center mb-24'>
				<div className='mx-auto max-w-7xl px-6 xl:px-8' style={{ textAlign: "center" }}>
					<div className='mx-auto max-w-2xl sm:text-center'>
						<h1 className='text-center text-black dark:text-white text-4xl font-semibold max-w-xs sm:max-w-none md:text-6xl !leading-tight'>
							Credit Purchase
						</h1>
					</div>
					<Line
						data={{
							labels: chartDataX,
							datasets: [
								{
									label: 'Pay',
									data: chartDataYSeries1,
									backgroundColor: 'rgba(255, 99, 132, 0.2)',
									borderColor: 'rgba(0, 99, 132, 1)',
									borderWidth: 1,
								},
								{
									label: 'Credit',
									data: chartDataYSeries2,
									backgroundColor: 'rgba(255, 99, 132, 0.2)',
									borderColor: 'rgba(255, 99, 132, 1)',
									borderWidth: 1,
								},
							],
						}}
					/>
					<div className='flex flex-wrap xl:flex-nowrap items-center bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto mt-4 max-w-2xl rounded-3xl ring-1 ring-gray-300/70 dark:ring-gray-700 xl:mx-0 xl:flex xl:max-w-none'>
						<RangeSlider
							minValue={10}
							maxValue={1000}
							defaultValue={10}
							onChange={onChangePurchaseCredit}
						/>
					</div>
					<div className='flex flex-wrap xl:flex-nowrap items-center bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto mt-4 max-w-2xl rounded-3xl ring-1 ring-gray-300/70 dark:ring-gray-700 xl:mx-0 xl:flex xl:max-w-none'>
						<div className="relative w-50" style={{ margin: '30px auto 30px auto' }}>
							<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>-{CreditRate.filter((rate) => rate.price === payAmount).length > 0 ? (CreditRate.filter((rate) => rate.price === payAmount)[0].interest_rate * 100).toFixed(5) : 0}%</label>
							<div className="w-full" style={{ marginTop: "10px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
								<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Get:  $</label>
								<input
									type="number"
									value={creditAmount}
									className="w-4/5 px-4 py-2 border border-gray-300 rounded-md"
									style={{ marginBottom: "5px", background: "#fafbff", color: "#121212" }}
									disabled
									readOnly
								/>
							</div>
						</div>
					</div>
					<button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" style={{ marginTop: "20px", marginBottom: "20px" }} onClick={handlePurchase}>{isLoadingPayment ? "Loading..." : "Purchase"}</button><br />
					{
						errMessage !== "" &&
						<label style={{ marginTop: "20px", marginRight: "5px", marginBottom: "0.5rem" }}>{errMessage}</label>
					}
					{
						isWaiting &&
						<div className='flex flex-wrap xl:flex-nowrap items-center bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto mt-4 max-w-2xl rounded-3xl ring-1 ring-gray-300/70 dark:ring-gray-700 xl:mx-0 xl:flex xl:max-w-none' style={{ justifyContent: "center" }}>
							<div className="relative w-50" style={{ margin: '30px auto 30px auto' }}>
								<div style={{ margin: "auto", width: "160px" }}>
									<QRCodeCanvas value={payAddress} imageSettings={{ src: "https://cryptologos.cc/logos/tether-usdt-logo.png", height: 40, width: 40, excavate: false }} />
								</div>
								<div className="w-full" style={{ marginTop: "20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
									<input
										value={payAddress}
										className="w-4/5 px-4 py-2 border border-gray-300 rounded-md"
										style={{ marginBottom: "5px", background: "#fafbff", color: "#121212", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "240px" }}
										disabled
									/>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" style={{ cursor: "pointer", marginLeft: "5px" }} onClick={handleClickAddress}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
									</svg>
								</div>
								<div className="w-full" style={{ marginTop: "20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
									<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Payment Id: {paymentId}</label>
								</div>
								<div className="w-full" style={{ marginTop: "20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
									<label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>Status: {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}</label>
								</div>
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	);
}
