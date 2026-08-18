import { ShieldCheck } from "lucide-react";

export default function ProfileSecurityNotice() {
    return (
        <div
            className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-blue-100
                bg-blue-50
                px-4
                py-3.5
            "
        >
            <div className="mt-0.5 text-blue-600">
                <ShieldCheck
                    className="h-4 w-4"
                    strokeWidth={1.8}
                />
            </div>

            <p className="text-[11px] leading-5 text-blue-700">
                Your phone number and referral code
                are protected and cannot be changed
                from this page.
            </p>
        </div>
    );
}