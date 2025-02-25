"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "next-cloudinary/dist/cld-video-player.css";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";
import TanStackProvider from "@/providers/TanStackProvider";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/components/Loading";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: "FansSecret",
// 	description:
// 		"FansSecret is a platform for both genders",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<KindeProvider>
			<html lang='en' suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
						<div className='h-screen flex flex-col'>
							<div className='flex-1'>
								<TanStackProvider>{children}</TanStackProvider>
							</div>
							<Footer />
						</div>
					</ThemeProvider>
					<Toaster />
				</body>
			</html>
		</KindeProvider>
	);
}
