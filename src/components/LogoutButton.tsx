"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import Loading from "@/components/Loading";
import { useState } from "react";
const LogoutButton = () => {
	const [loading, setLoading] = useState(false);

	const handleLogout = () => {
		setLoading(true);

		// Simulate a delay for demonstration (e.g., API call or redirection)
		setTimeout(() => {
		setLoading(false); // Hide loading screen after the operation is complete
		}, 2000);
	};

	return (
		<>
		{loading && <Loading />}
		<LogoutLink onClick={handleLogout}>
			<DropdownMenuItem disabled={loading}>Logout</DropdownMenuItem>	
		</LogoutLink>
		</>
	);
};
export default LogoutButton;
