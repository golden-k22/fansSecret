"use client";
import React, { useState } from 'react';
import Head from 'next/head';

const Page = () => {

    interface AccordionItem {
        title: string;
        content: React.ReactNode; // Content can be any React node
    }

    const items: AccordionItem[] = [
        {
            title: "What can I do on FansSecret?",
            content: "FansSecret users fall into two main categories: creators and fans. Creators post videos, images, and other information about their life, while fans spend money on the platform to interact with the creators. The categories are not distinct, however so creators can view content and fans can post content. The platform has basic social media features, such as a profile, posts, feed, followers, likes, comments, messaging, hashtagging, and search. There is also a vault to easily access content without re-uploading. When users post or message, they can assign a price to view the content. Users can also assign a price to become a follower and subscribe to their profile, although free accounts are also possible. Users can pay to subscribe or access content using “credit” which is purchased on the platform. Users who receive payments can pay out their earnings. Users can post text, images, and video. We do not allow any non-FansSecret-Users to appear in images and videos on FansSecret. Every image and video will be checked to ensure that only verified users appear in the content."
        },
        {
            title: "What is financial vetting?",
            content: "In order to view content, a user must pass “financial vetting”. The purpose of financial vetting is related to the issue of content leaking. We cannot allow users with no financial capacity to view content, because if they leak the content and cause harm to the creator and platform, the user will be forced to pay for the harm caused. In other words, only people with some baseline financial capacity in a jurisdiction that enables the enforcement of our terms of service will be allowed to view content; if they leak the content, then they will pay for the harm. In order to pass financial vetting, users must upload some documentation showing their name on a bank statement, tax record, W-2, property record, financial account, or some other document. Anyone with several years of steady employment or a net worth greater than $50,000 should pass financial vetting. A team will do brief research about the data to confirm it’s veracity. Then the user will be able to view content."
        },
        {
            title: "How do credits and payments work?",
            content: "At this time FansSecret uses only ethereum based USDT tokens facilitated by NOWpayments.io. We hope to add card and bank processing through traditional payment methods, but we encountered volume based pricing discrimination from the few payment processors who would work with FansSecret’s merchant category. Users buy credits on the Credit Purchase page. Credits are sold at $10 increments at diminishing discounted rate that ranges from 30% for a $10 purchase to 10% for a $1000 purchase. In other words, if someone spends $10 then they will receive $7 in credit, but if they spend $1000 then they will receive $900 in credit. There is a sliding scale for the user to select the amount to spend before the user is redirected to the NOWpayments interface. On NOWpayments users can make the payment using almost any cryptocurrency, but not yet direct USD payments. Users will need to own or buy some cryptocurrency and then send it into the NOWpayments system to complete their credit purchase. For example a user who does not currently own any cryptocurrency will need to purchase some cryptocurrency on another platform that might require identity verification or other checks, and then send that cryptocurrency to make the NOWpayments payment. Users who receive earnings through interactions on the platform can click to payout their earnings in USDT to an ethereum wallet. Unfortunately we do not yet have bank processing, although we hope to implement such a system soon."
        },
        {
            title: "Do I have to pay taxes on my earnings?",
            content: "FansSecret does not pay taxes or withhold earnings for creators. Almost all creators will have some tax obligation on earnings from FansSecret, but the precise obligation will vary from city to city, state to state, and country to country. FansSecret will issue 1099s to USA creators who have sufficient earnings. For creators in non-USA jurisdictions that might face discrimination or punishment in their home country on account of interacting with FansSecret, FansSecret will work to maintain the privacy of such individuals in its interaction with tax authorities. In order to prevent tax authorities from requesting user data, FansSecret terms of service requires creators to pay their tax obligations independently of any action from FansSecret. FansSecret may or may not comply with data requests from tax authorities at its sole discretion."
        },
        {
            title: "What is required to sign up for FansSecret?",
            content: "New users must provide an email, name, and government ID. We require government ID for age verification of all users—both creators and fans. ID verification is also necessary for compliance with §2557 record keeping requirements for secondary producers in the United States. Additionally, identity verification is necessary for enforcement of our content leaking terms of service. All users will need to consent to FansSecret retention of user identification document data. Users in states like Texas in the United States, where identification data that is used for age verification is not retainable by platforms will need to specifically consent to the data retention notwithstanding state laws, for purposes of §2557 compliance and anti-leak terms of service enforcement. Users who want to view content on FansSecret will also need to pass financial vetting as described in the section above."
        },
        {
            title: "What is unauthorized content sharing?",
            content: "Users may not share anything from FansSecret on other platforms, in private messaging, or on their own machines. Screenshots, downloads, data scraping, screen photography and any other method to replicate or reproduce platform content is unauthorized sharing. If any content is found on any other platform, in private messaging, or stored on a machine, it will constitute unauthorized sharing. Users may only view content within the FansSecret platform. "
        },
        {
            title: "How much do leakers pay and whom do they pay?",
            content: "Leakers, also known as pirates or unauthorized sharers, will pay for the harm caused by their breach of our terms of service. We will terminate their account and begin judicial procedures against them for actual damages caused to the creator and to the platform. The actual amounts paid to the creator will vary by the content which was leaked and how it relates to the creator. For example, a creator who frequently shares one kind of content on many platforms will suffer less harm if that same kind of content leaks from FansSecret than a creator who maintains a certain persona in other platforms and has contrary and reputationally damaging content leak from FansSecret. Damages will also vary by the dollar amount other viewers were willing to pay for the content and the number of people who viewed it via the unauthorized sharing. Even if no actual damages are found, the leaker will be forced to pay the attorney’s fees of the litigation."
        },
        {
            title: "How does the referral system work?",
            content: "Users can create referral links and then share those referral links to new creators. If new creators sign up with the referral link, then the user who made the referral link will earn 5% of the earnings of that new creator during the new creator’s first year. The referral earnings are capped at $100,000 for each new creator."
        },
        {
            title: "Can I create collaborative content?",
            content: "Yes. When posting new content, creators can click the @ button to tag the other creators who appear in the content. The tagged creator will receive a notification that they were tagged in a new post and they will be able to check the content and approve or deny it. We do not allow any non-Fanssecret-users to appear in any images or videos on FansSecret."
        },

    ];

    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClick = (index: number) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <h1 className='font-semibold tracking-tight text-2xl' style={{ textAlign: "center", marginTop: "30px", marginBottom: "20px" }}>FansSecret Frequently Asked Questions</h1>
            <p className='font-semibold tracking-tight text-2xl' style={{ textAlign: 'center', fontSize: '18px', fontWeight: "normal" }}>
                FansSecret is a fansite that uses cutting-edge forensic watermarking technology to embed viewer data into images and videos. Users can exchange dollar value for subscriptions, images, videos, and messages, but unlike the other fansites, FansSecret will enforce its terms of service against leakers. When an image or video is shared on the other fanssites, a user can screenshot, download, or take a photo of the screen and then share the content on other social media platforms or on “leak-sharing” subscription sites. Even though such unauthorized sharing is against the terms of service on the other sites, enforcement is impossible. FansSecret is different. We have implemented the technology and policies to catch users who leak content and make them pay for the harm they cause. FansSecret is the private fanssite.
                FansSecret is owned and operated by Web3 Services, LLC. Please direct inquiries to admin@whiteshoe.ai.
            </p>

            <div className="accordion">
                {items.map((item, index) => (
                    <div className="accordion-item" key={index}>
                        <div
                            className="accordion-title"
                            onClick={() => handleClick(index)}
                            style={{
                                cursor: 'pointer',
                                padding: '10px',
                                borderBottom: '1px solid #ccc',
                                fontWeight: activeIndex === index ? 'bold' : 'normal'
                            }}
                        >
                            <h1 className='font-semibold tracking-tight text-2xl' style={{ marginTop: "30px", marginBottom: "20px" }}>&gt; {item.title}</h1>
                        </div>
                        {activeIndex === index && (
                            <div className="accordion-content" style={{ padding: '10px' }}>
                                <p className='font-semibold tracking-tight text-2xl' style={{ fontSize: '18px', fontWeight: "normal" }}>
                                    {item.content}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
