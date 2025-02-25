"use client";
import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";
import Loading from "@/components/Loading";

const AuthButtons = () => {
	const [loading, setLoading] = useState(false);
	const handleClick = () => {
		setLoading(true);
		// Simulate a delay (e.g., API call or redirection)
		// setTimeout(() => {
		//   setLoading(false); // Hide loading screen after a delay
		// }, 2000); // Adjust this delay as needed
	  };

	return (
		<>
		{ loading && <Loading />}
		<div className='flex gap-3 flex-1 md:flex-row flex-col'>
			<RegisterLink className='flex-1' onClick={handleClick} href="/signup">
				<Button style={{ backgroundColor: "black" }} className='w-full text-black' variant={"outline"} disabled={loading}>
					Sign up
				</Button>
			</RegisterLink>
			<LoginLink className='flex-1' onClick={handleClick} href="/login">
				<Button style={{ backgroundColor: "#3A3A3A" }} className='w-full' disabled={loading}>
					Login
				</Button>
			</LoginLink>
		
		</div>
		</>
	);
};
export default AuthButtons;
