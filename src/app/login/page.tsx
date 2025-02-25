'use client';
import Image from "next/image";
import { useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation"; // Use next/navigation for router
import LoadingWithoutImage from "@/components/LoadingWithoutImage";
import {
    RegisterLink,
    LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import styles from '../page.module.css';

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(""); // Add state for username
    const [errorMessage, setErrorMessage] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const router = useRouter(); // Initialize router
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        // if (!termsAccepted) {
        // 	setErrorMessage("You must accept the terms and conditions.");
        // 	return;
        // }

        try {
            setLoading(true);
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await response.json();
            console.log("ZZZZZZZZZZ", data);
            if (!response.ok) {
                setErrorMessage(data.error || "An error occurred during sign-up.");
                return;
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setLoading(false);
            router.push("/messages");
        } catch (error) {
            setLoading(false);
            console.error("Error during sign-up:", error);
            setErrorMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className='flex h-screen w-full'>
            {
                loading &&
                <LoadingWithoutImage />
            }
            <div className='flex-1 flex overflow-hidden bg-[#ffa885] relative justify-center items-center z-10 bg-noise'>
                <img style={{ marginLeft: '220px', marginBottom: '170px', opacity: '0.04' }}
                    src='/fansSecret-logo.jpeg'
                    alt='fansSecret-logo.jpeg'
                    className='absolute -left-1/4 opacity-15 -bottom-52 lg:scale-150 xl:scale-105 scale-[2]
            					pointer-events-none select-none border'
                />
                <div className='flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold'>
                    {/* <Image
					
						src={"/fansSecret-logo.jpeg"}
						alt='fansSecret-logo.jpeg'
						width={769}
						height={182}
						className='mt-20 w-[420px] z-0 pointer-events-none select-none rounded-full'
					/> */}

                    <p className='text-2xl md:text-3xl text-balance' style={{ textAlign: 'center' }}>
                        Welcome to FansSecret<span className=' px-2 font-bold text-white'></span>
                    </p>
                    {/* <p style={{ fontWeight: '250' }}> */}

                    <div className={styles.authMethods}>
                        <br />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md"
                            style={{ background: '#fafbff', color: "#808080", width: "100%" }}
                            placeholder="Enter your email"
                            required
                        />

                        <LoginLink style={{ width: "100%" }} authUrlParams={{
                            // connection_id: 'conn_01927c776912fadb76f4cf992a79b07f',
                            connection_id: 'conn_0193dbd2d48d5460e981e5c2043dd686',
                            login_hint: email
                        }}>
                            <button type="button" className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600" style={{ width: "100%", transition: 'background-color 0.3s ease' }}>Login</button>
                        </LoginLink>
                        <LoginLink className={styles.googleButton} style={{ borderRadius: "0.5rem", height: "40px" }}
                            authUrlParams={{
                                // connection_id: 'conn_01927e7135c4f2b23cbe7a9b52130357'
                                connection_id: 'conn_0193ddea33fd575f9a96199ed9f66406'
                            }}>
                            Login with Google
                        </LoginLink>

                    </div>

                    <div className="mt-4 text-center">
                        <p>
                            Don't have an account?{" "}
                            <a href="/signup" className="text-black hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            </div>

            <div className='flex-1 relative overflow-hidden justify-center items-center hidden md:flex'>
                <Image
                    src={"/auth-cover.jpg"}
                    alt='fanssecret'
                    fill
                    className='object-cover opacity-90 pointer-events-none select-none h-full'
                />
            </div>
        </div>
    );
};
export default Page;
