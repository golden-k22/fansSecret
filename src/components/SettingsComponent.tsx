"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import styles from "@/components/styles/pricing.module.css";

export default function SettingsComponent() {

    const [payETHAddress, setPayETHAddress] = useState("");

    useEffect(() => {
    }, []);

    const onChangeETHAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayETHAddress(event.target.value);
    }

    return (
        <div className={cn("flex flex-col w-full items-center mt-32", styles.fancyOverlay)}>
            <div className='w-full flex flex-col items-center mb-24'>
                <div className='mx-auto max-w-7xl px-6 xl:px-8' style={{ textAlign: "center" }}>
                    <div className='mx-auto max-w-2xl sm:text-center'>
                        <h1 className='text-center text-black dark:text-white text-4xl font-semibold max-w-xs sm:max-w-none md:text-6xl !leading-tight'>
                            My Account
                        </h1>
                    </div>
                    <div className='bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto mt-4 max-w-2xl rounded-3xl ring-1 ring-gray-300/70 dark:ring-gray-700 xl:mx-0 xl:max-w-none' style={{ paddingTop: "40px", paddingBottom: "40px" }}>
                        <div className="relative w-50" style={{ margin: '30px auto 30px auto', marginTop: "0px" }}>
                            <label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>ETH Address: </label>
                            <div className="w-full" style={{ marginTop: "20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                <input
                                    value={payETHAddress}
                                    className="w-4/5 px-4 py-2 border border-gray-300 rounded-md"
                                    style={{ marginBottom: "5px", background: "#fafbff", color: "#121212", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "240px" }}
                                    onChange={onChangeETHAddress}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
