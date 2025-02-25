'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import {
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import styles from '../page.module.css';

const Page = () => {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [showPrivateSitePopup, setShowPrivateSitePopup] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [triggerRegisterLink, setTriggerRegisterLink] = useState(false);

	useEffect(() => {
		if (triggerRegisterLink) {
			document.getElementById("register-button")?.click();
			setTriggerRegisterLink(false);
		}
	}, [triggerRegisterLink]);

	const handleChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFirstname(event.target.value);
	};

	const handleChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLastname(event.target.value);
	};

	const handleCheckboxChange = () => {
		if (isChecked) {
			setIsChecked(false);
		} else {
			setIsChecked(true);
			setShowPrivateSitePopup(true);
		}
	};

	const closePrivateSitePopup = () => {
		setShowPrivateSitePopup(false);
		setTriggerRegisterLink(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	const handleSignUp = () => {
		if (!termsAccepted) {
			setShowPopup(true);
		} else if (!showPrivateSitePopup) {
			setShowPrivateSitePopup(true);
		}
	}

	return (
		<div className="flex h-screen w-full">
			<div className="flex-1 flex overflow-hidden bg-[#ffa885] relative justify-center items-center z-10 bg-noise">
				<img
					style={{ marginLeft: '220px', marginBottom: '170px', opacity: '0.04' }}
					src="/fansSecret-logo.jpeg"
					alt="fansSecret-logo.jpeg"
					className="absolute -left-1/4 opacity-15 -bottom-52 lg:scale-150 xl:scale-105 scale-[2]
                    pointer-events-none select-none border"
				/>
				<div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
					<p className="text-2xl md:text-3xl text-balance" style={{ textAlign: 'center' }}>
						Welcome to FansSecret<span className="px-2 font-bold text-white"></span>
					</p>
					<div className={styles.authMethods}>
						<input
							type="text"
							id="firstname"
							value={firstname}
							onChange={handleChangeFirstname}
							className="border border-gray-300 p-2 rounded-md"
							placeholder="First Name"
							style={{ background: "#fafbff", color: "#808080", width: "100%" }}
							required
						/>
						<input
							type="text"
							id="lastname"
							value={lastname}
							onChange={handleChangeLastname}
							className="border border-gray-300 p-2 rounded-md"
							placeholder="Last Name"
							style={{ background: "#fafbff", color: "#808080", width: "100%" }}
							required
						/>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="border border-gray-300 p-2 rounded-md"
							placeholder="Enter your email"
							style={{ background: "#fafbff", color: "#808080", width: "100%" }}
							required
						/>

						<div style={{ textAlign: 'left', width: "100%" }}>
							<label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
								<input
									type="checkbox"
									checked={isChecked}
									onChange={handleCheckboxChange}
									className="sr-only"
								/>
								<span className="label flex items-center text-sm font-medium text-white">
									Fan
								</span>
								<span
									className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isChecked ? 'bg-[#212b36]' : 'bg-[#212b36]'
										}`}
								>
									<span
										className={`dot h-6 w-6 rounded-full bg-white duration-200 ${isChecked ? 'translate-x-[28px]' : ''
											}`}
									></span>
								</span>
								<span className="label flex items-center text-sm font-medium text-white">
									Creator
								</span>
							</label>

							<div style={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
								<input
									type="checkbox"
									id="terms-accepted"
									checked={termsAccepted}
									onChange={() => setTermsAccepted(!termsAccepted)}
									style={{ background: "#fafbff", color: "#808080", marginRight: "7px" }}
								/>
								<label htmlFor="terms-accepted" className="text-sm">
									I agree to the terms and conditions
								</label>
							</div>
						</div>

						{termsAccepted && showPrivateSitePopup ? (
							<>
								<RegisterLink
									id="register-button"
									style={{ width: "100%" }}
									authUrlParams={{
										connection_id: 'conn_0193dbd2d48d5460e981e5c2043dd686',
										login_hint: email,
									}}
								>
									<button
										type="button"
										className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600"
										style={{ width: "100%", transition: 'background-color 0.3s ease' }}
									>
										Create Account
									</button>
								</RegisterLink>
								<RegisterLink
									className={styles.googleButton}
									style={{ borderRadius: "0.5rem", height: "40px", marginTop: "10px" }}
									authUrlParams={{
										connection_id: 'conn_0193ddea33fd575f9a96199ed9f66406'
									}}
								>
									Sign up with Google
								</RegisterLink>
							</>
						) : (
							<>
								<button
									type="button"
									className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600"
									style={{ width: "100%" }}
									onClick={handleSignUp}
								>
									Create Account
								</button>
								<button
									type="button"
									className={styles.googleButton}
									style={{ borderRadius: "0.5rem", height: "40px", marginTop: "10px" }}
									onClick={handleSignUp}
								>
									Sign up with Google
								</button>
							</>
						)}

						{showPopup && (
							<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
								<div className="bg-white p-6 rounded-md shadow-lg">
									<p className="text-red-600 font-semibold">You must accept the terms and conditions before signing up.</p>
									<button
										className="mt-4 px-10 py-2 mx-auto flex bg-blue-600 text-white rounded-md hover:bg-blue-700"
										onClick={closePopup}
									>
										OK
									</button>
								</div>
							</div>
						)}
						{showPrivateSitePopup && (
							<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
								<div className="bg-white p-6 rounded-md shadow-lg text-center">
									<p className="text-gray-800 font-semibold mb-4 max-w-[400px]">
										FansSecret is a private fansite. It is not like the other fansites. If you copy, screenshot, photograph, or in any other way share content from FansSecret outside of FansSecret, we will pursue legal action against you.
									</p>
									<button
										className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
										onClick={closePrivateSitePopup}
									>
										OK
									</button>
								</div>
							</div>
						)}
						<RegisterLink
							id="register-button"
							style={{ width: "100%", display: 'none' }}
							authUrlParams={{
								connection_id: 'conn_0193dbd2d48d5460e981e5c2043dd686',
								login_hint: email,
							}}
						>
							<button
								type="button"
								className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600"
								style={{ width: "100%", transition: 'background-color 0.3s ease' }}
							>
								Create Account
							</button>
						</RegisterLink>
					</div>
					<div className="mt-4 text-center">
						<p>
							Already have an account?{" "}
							<a href="/login" className="text-black hover:underline">
								Log in
							</a>
						</p>
					</div>
				</div>
			</div>

			<div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
				<Image
					src={"/auth-cover.jpg"}
					alt="fanssecret"
					fill
					className="object-cover opacity-90 pointer-events-none select-none h-full"
				/>
			</div>
		</div>
	);
};
export default Page;
