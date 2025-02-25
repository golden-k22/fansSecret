import { useState } from "react";
import axios from "axios";

interface WithdrawMoneyProps {
    currentCredit: number;
}

const WithdrawMoney: React.FC<WithdrawMoneyProps> = ({ currentCredit }) => {
    const [walletAddress, setWalletAddress] = useState<string>("");

    const handleWithdraw = async () => {
        if (!walletAddress) {
            alert("Please enter your wallet address!");
            return;
        }

        try {
            const response = await axios.post<{ success: boolean; message?: string }>(
                "/api/withdraw",
                {
                    amount: currentCredit, // Amount to withdraw
                    walletAddress,         // User's USDT wallet address
                    currency: "USDT",      // Currency for withdrawal
                }
            );

            if (response.data.success) {
                alert("Withdrawal request submitted successfully!");
            } else {
                alert(`Failed to process withdrawal: ${response.data.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error during withdrawal:", error);
            alert("An error occurred while processing the withdrawal.");
        }
    };

    return (
        <div className="relative w-50" style={{ margin: "30px auto 30px auto", marginBottom: "20px" }}>
            <label style={{ marginRight: "5px", marginBottom: "0.5rem" }}>
                Earnings: ${currentCredit}
            </label>
            <input
                type="text"
                placeholder="Enter your USDT wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />
            <button
                onClick={handleWithdraw}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                style={{ marginTop: "20px", marginLeft: "50px" }}
            >
                Request Withdrawal
            </button>
        </div>
    );
};

export default WithdrawMoney;
