import React, { useState } from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import { User } from "@prisma/client";
import { PostWithComments } from './Post';
import { handlePaymentAction } from './actions';
import { useToast } from "@/components/ui/use-toast";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

const modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyles: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    color: '#000',
    width: '80%',
    maxWidth: '400px'
};

type SubscriptionProps = {
    admin: User | null | undefined;
    post: PostWithComments;
    setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
}

function SubscriptionModal({ admin, post, setIsSubscribed }: SubscriptionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (!admin) {
        return <div>No user information available.</div>;
    }

    const handlePayment = () => {
        if (post.price && admin?.credits >= post.price) {
            handlePaymentAction(admin.id, post.userId, post.id, post.price)
                .then(() => {
                    toast({
                        title: "Payment Succeed",
                        description: "Subscribed Successfully.",
                        variant: "default",
                    });
                    handleCloseModal();
                    setIsSubscribed(true);
                })
                .catch(error => {
                    toast({
                        title: "Error",
                        description: error.message || "Something went wrong. Please try again later.",
                        variant: "destructive",
                    });
                })
        }
    }

    return (
        <div>
            <Button
                className={buttonVariants({
                    className: "!rounded-full w-full font-bold text-white",
                })}
                onClick={handleButtonClick}
            >
                Pay ${post.price} to unlock
            </Button>

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <div className="flex justify-between items-center pb-3 mb-4">
                        <h2 className="text-lg font-bold text-gray-800"></h2>
                        <button
                            onClick={handleCloseModal}
                            aria-label="Close"
                            className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                            style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-700">Credit Balance: <span className="font-semibold">${admin?.credits}</span></p>
                        <p className="text-gray-700">Price: <span className="font-semibold">${post?.price ?? 0}</span></p>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="mt-4 w-full bg-gray-700 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        Pay Now
                    </button>
                </Modal>

            )}
        </div>
    );
}

function Modal({ children, onClose }: ModalProps) {
    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                {children}
            </div>
        </div>
    );
}

export default SubscriptionModal;
