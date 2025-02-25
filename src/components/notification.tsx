"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "@/components/styles/pricing.module.css";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import axios from "axios";
import internal from "stream";

export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface PricingTier {
  name: string;
  id: string;
  discountPrice: string | Record<string, string>;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  cta: string;
  soldOut?: boolean;
  monthlyUrl: string;
  yearlyUrl: string;
}

export const frequencies: PricingTierFrequency[] = [
  { id: "1", value: "1", label: "Monthly", priceSuffix: "/month" },
  { id: "2", value: "2", label: "Annually", priceSuffix: "/year" },
];

export const tiers: PricingTier[] = [
  {
    name: "Premium Plan",
    id: "0",
    price: { "1": "$89", "2": "$999" },
    discountPrice: { "1": "$59", "2": "$499" },
    description: `Get access to our exclusive content. Cancel anytime.`,
    features: [
      `Access to all premium content`,
      "Comment your thoughts",
      "Like your favorite posts",
    ],
    cta: `Join Us`,
    monthlyUrl:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_STRIPE_DEV_MONTHLY_URL!
        : process.env.NEXT_PUBLIC_STRIPE_LIVE_MONTHLY_URL!,
    yearlyUrl:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_STRIPE_DEV_YEARLY_URL!
        : process.env.NEXT_PUBLIC_STRIPE_LIVE_YEARLY_URL!,
  },
];

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default function Pricing() {
  const [notifications, setNotifications] = useState([]);



  const fetchMessages = async () => {
    try {
      const body = {

      };

    } catch (error) {
      console.log(error, "RESPONSE ERROR");
    }
  };

  useEffect(() => {
    axios.get(`/api/notification/kp_52b059d30d3f473e8d4e718b9c7fdc9e`)
      .then((notification) => {
        let notificationData = notification.data;
        console.log("notificationData: ", notificationData)
        setNotifications(notificationData);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  return (
    <div
      className={cn("flex flex-col w-full items-center ", styles.fancyOverlay)}
    >
      {!notifications ? (
        <div className="  mt-2 text-base leading-7 text-gray-700 dark:text-gray-400">
          No new notifications at the moment.
        </div>
      ) : (
        <>
          {
            notifications.map((notification: any, index: number) =>
              <div
                key={index}
                style={{ width: "100%" }}
                className="w-full flex flex-col items-center"
              >
                <div className="mx-auto max-w-7xl w-[100%] hover:bg-gray-50">
                  <div
                    style={{ width: "100%", border: "none", outline: "none", }}
                    className=" h-[6.5rem] flex flex-wrap xl:flex-nowrap items-center bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto max-w-2xl  xl:mx-0 xl:flex xl:max-w-none w-[100%]  "
                  >
                    <div className="p-4  xl:flex-auto  w-[100%]">
                      <h3 className="text-black dark:text-white text-lg font-bold tracking-tight">
                      {notification.title}
                      </h3>
                      <p className=" text-sm leading-7 text-gray-700 dark:text-gray-400">
                        {notification.description}
                      </p>
                      <p className=" text-sm leading-7 text-[#48628b] ">
                        {/* <p className=" text-sm leading-7 text-[#c61a1a] dark:text-gray-400"> */}
                        12/10/2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          <div
            style={{ width: "100%" }}
            className="w-full flex flex-col items-center"
          >
            <div className="mx-auto max-w-7xl w-[100%] hover:bg-gray-50">
              <div
                style={{ width: "100%", border: "none", outline: "none", }}
                className=" h-[6.5rem] flex flex-wrap xl:flex-nowrap items-center bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto max-w-2xl  xl:mx-0 xl:flex xl:max-w-none w-[100%]  "
              >
                <div className="p-4  xl:flex-auto  w-[100%]">
                  <h3 className="text-black dark:text-white text-lg font-bold tracking-tight">
                    Purchase success
                  </h3>
                  <p className=" text-sm leading-7 text-gray-700 dark:text-gray-400">
                    Your Purchase is successful
                  </p>
                  <p className=" text-sm leading-7 text-[#48628b] ">
                    {/* <p className=" text-sm leading-7 text-[#c61a1a] dark:text-gray-400"> */}
                    10/10/2024
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%" }}
            className="w-full flex flex-col items-center"
          >
            <div className="mx-auto max-w-7xl w-[100%] hover:bg-gray-50">
              <div
                style={{ width: "100%", border: "none", outline: "none", }}
                className=" h-[6.5rem] flex flex-wrap xl:flex-nowrap items-center bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto max-w-2xl  xl:mx-0 xl:flex xl:max-w-none w-[100%]  "
              >
                <div className="p-4  xl:flex-auto  w-[100%]">
                  <h3 className="text-black dark:text-white text-lg font-bold tracking-tight">
                    Purchase success
                  </h3>
                  <p className=" text-sm leading-7 text-gray-700 dark:text-gray-400">
                    Your Purchase is successful
                  </p>
                  <p className=" text-sm leading-7 text-[#48628b] ">
                    {/* <p className=" text-sm leading-7 text-[#c61a1a] dark:text-gray-400"> */}
                    10/10/2024
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%" }}
            className="w-full flex flex-col items-center"
          >
            <div className="mx-auto max-w-7xl w-[100%] hover:bg-gray-50">
              <div
                style={{ width: "100%", border: "none", outline: "none", }}
                className=" h-[6.5rem] flex flex-wrap xl:flex-nowrap items-center bg-white dark:bg-gray-900/80 backdrop-blur-md mx-auto max-w-2xl  xl:mx-0 xl:flex xl:max-w-none w-[100%]  "
              >
                <div className="p-4  xl:flex-auto  w-[100%]">
                  <h3 className="text-black dark:text-white text-lg font-bold tracking-tight">
                    Purchase success
                  </h3>
                  <p className=" text-sm leading-7 text-gray-700 dark:text-gray-400">
                    Your Purchase is successful
                  </p>
                  <p className=" text-sm leading-7 text-[#48628b] ">
                    {/* <p className=" text-sm leading-7 text-[#c61a1a] dark:text-gray-400"> */}
                    10/10/2024
                  </p>
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
