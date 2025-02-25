import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface WithdrawRequestBody {
    amount: number;
    walletAddress: string;
    currency: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { amount, walletAddress, currency } = req.body as WithdrawRequestBody;

    if (!amount || !walletAddress || !currency) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const nowPaymentsResponse = await axios.post(
            "https://api.nowpayments.io/v1/payout",
            {
                amount,
                currency,
                address: walletAddress,
            },
            {
                headers: {
                    "x-api-key": process.env.NOWPAYMENTS_API_KEY || "", // Add your API key to .env
                },
            }
        );

        if (nowPaymentsResponse.data) {
            return res.status(200).json({ success: true, data: nowPaymentsResponse.data });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to process the withdrawal request.",
            });
        }
    } catch (error: any) {
        console.error("NowPayments Error:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: error.response?.data?.message || "Server error",
        });
    }
}
