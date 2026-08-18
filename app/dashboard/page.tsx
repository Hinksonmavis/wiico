"use client";

import { useAuthStore } from "@/app/store/auth.store";
import UserGuard from "../guards/UserGuard";
import { getReferralLink } from "@/app/utils/referral";
import Hero from "../components/dashboard/Hero";
import PositionsBanner from "../components/dashboard/PositionsBanner";
import ActiveCenterBanner from "../components/dashboard/ActiveCenterBanner";
import MenuGrid from "../components/dashboard/MenuGrid";
import PromotedNotice from "../components/dashboard/PromotedNotice";
import PromoCarousel from "../components/dashboard/PromoCarousel";
import AboutCompany from "../components/dashboard/AboutCompany";
import { useCurrentUser } from "../hooks/clientHooks/userHooks/useCurrentUser";


export default function DashboardPage(){

    const { data: user } = useCurrentUser();


    const referralLink =
        user
        ? getReferralLink(
            user.referralCode
        )
        : "";


    const copyCode = async()=>{
        await navigator.clipboard.writeText(
            user?.referralCode ?? ""
        );
    };


    const copyLink = async()=>{
        await navigator.clipboard.writeText(
            referralLink
        );
    };


    return (

        <UserGuard>

            <main className="pb-10">
                <Hero />

                <div className="px-4 pt-6">
                    <MenuGrid />
                </div>

                <div className="px-4 pt-6">
                    <PromotedNotice />
                </div>

                <div className="px-4 pt-6">
                    <PromoCarousel />
                </div>

                <div className="px-4 pt-6">
                    <AboutCompany />
                </div>


                {/* <h1 className="text-3xl font-bold">
                    User Dashboard
                </h1>


                <div className="mt-8 rounded-lg border p-6 space-y-5">


                    <div>

                        <p className="text-sm text-gray-500">
                            Referral Code
                        </p>


                        <p className="text-2xl font-bold">
                            {user?.referralCode}
                        </p>


                        <button
                            onClick={copyCode}
                            className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            Copy Code
                        </button>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Referral Link
                        </p>


                        <p className="break-all">
                            {referralLink}
                        </p>


                        <button
                            onClick={copyLink}
                            className="mt-3 rounded bg-green-600 px-4 py-2 text-white"
                        >
                            Copy Link
                        </button>

                    </div>


                </div> */}


            </main>

        </UserGuard>

    );
}