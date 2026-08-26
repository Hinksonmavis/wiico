"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Wallet,
    ArrowLeft,
    ReceiptText,
} from "lucide-react";
import { toast } from "sonner";

import ContinueButton from "@/app/components/deposit/ContinueButton";
import DepositStepper from "@/app/components/deposit/DepositStepper";

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 1_000_000;
const PRESET_AMOUNTS = [15000, 50000, 75000, 150000, 250000, 350000, 500000, 1000000];

export default function DepositPage() {
    const router = useRouter();

    const [amount, setAmount] = useState("");
    const [pendingPreset, setPendingPreset] =
        useState<number | null>(null);

    const value = Number(amount);

    const isValid =
        amount !== "" &&
        !Number.isNaN(value) &&
        value >= MIN_AMOUNT &&
        value <= MAX_AMOUNT;

    function goToPayment(rechargeAmount: number) {
        if (!rechargeAmount || Number.isNaN(rechargeAmount)) {
            toast.error("Please enter a valid amount.");
            return;
        }

        if (rechargeAmount < MIN_AMOUNT) {
            toast.error(
                `Minimum deposit amount is ₦${MIN_AMOUNT.toLocaleString()}.`,
            );
            return;
        }

        if (rechargeAmount > MAX_AMOUNT) {
            toast.error(
                `Maximum deposit amount is ₦${MAX_AMOUNT.toLocaleString()}.`,
            );
            return;
        }

        router.push(
            `/dashboard/wallet/deposit/payment?amount=${rechargeAmount}`,
        );
    }

    function handleContinue() {
        goToPayment(Number(amount));
    }

    function handlePresetClick(preset: number) {
        setAmount(String(preset));
        setPendingPreset(preset);
        // goToPayment(preset);
    }

    return (
        <div className="mx-auto min-h-screen max-w-xl bg-slate-50 p-5">

            {/* Top Navigation */}

            <div className="mb-6 flex items-center justify-between">

                <button
                    onClick={() => router.back()}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-slate-700
                        shadow-sm
                        transition
                        hover:border-blue-500
                        hover:bg-blue-50
                        hover:text-blue-600
                        active:scale-95
                    "
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <button
                    onClick={() =>
                        router.push(
                            "/dashboard/wallet/deposit/history"
                        )
                    }
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                        transition
                        hover:bg-blue-700
                        active:scale-95
                    "
                >
                    <ReceiptText size={18} />
                    History
                </button>

            </div>

            <DepositStepper currentStep={1} />

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                {/* Header */}

                <div className="border-b border-slate-100 p-8">

                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

                        <Wallet size={30} />

                    </div>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Wallet Deposit
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Enter the amount you want to recharge into your
                        wallet.
                    </p>

                </div>

                {/* Body */}

                <div className="space-y-6 p-8">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Recharge Amount
                        </label>

                        <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setPendingPreset(null);
                            }}
                            onKeyDown={(e) => {
                                if (
                                    ["e", "E", "+", "-"].includes(
                                        e.key,
                                    )
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Enter amount"
                            min={MIN_AMOUNT}
                            max={MAX_AMOUNT}
                            className="
                                h-14
                                w-full
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                px-4
                                text-lg
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-100
                            "
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Minimum: ₦1,000 • Maximum: ₦1,000,000
                        </p>

                        {/* Preset amount tabs */}
                        <div className="mt-6">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-slate-800">
                                    Quick select amount
                                </p>

                                <p className="text-xs text-slate-500">
                                    Choose an option
                                </p>
                            </div>

                            <div
                                role="group"
                                aria-label="Quick deposit amounts"
                                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                            >
                                {PRESET_AMOUNTS.map((preset) => {
                                    const isActive =
                                        pendingPreset === preset;

                                    return (
                                        <button
                                            key={preset}
                                            type="button"
                                            aria-pressed={isActive}
                                            onClick={() =>
                                                handlePresetClick(preset)
                                            }
                                            className={`
                                                relative flex min-h-[68px] flex-col
                                                items-start justify-center rounded-2xl
                                                border px-4 text-left transition
                                                focus:outline-none focus:ring-4
                                                focus:ring-blue-100 active:scale-[0.98]
                                                ${
                                                    isActive
                                                        ? `
                                                            border-blue-600 bg-blue-600
                                                            text-white shadow-md
                                                            shadow-blue-600/20
                                                        `
                                                        : `
                                                            border-slate-200 bg-white
                                                            text-slate-800 shadow-sm
                                                            hover:border-blue-300
                                                            hover:bg-blue-50
                                                        `
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    text-[11px] font-medium
                                                    ${
                                                        isActive
                                                            ? "text-blue-100"
                                                            : "text-slate-500"
                                                    }
                                                `}
                                            >
                                                Deposit
                                            </span>

                                            <span className="mt-1 text-base font-bold tracking-tight">
                                                ₦{preset.toLocaleString()}
                                            </span>

                                            {isActive && (
                                                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600">
                                                    ✓
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    <ContinueButton
                        onClick={handleContinue}
                        disabled={!isValid}
                    />

                </div>

            </div>

        </div>
    );
}