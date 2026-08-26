"use client";

import {
    MoreHorizontal,
    Play,
    Lock,
    Trash2,
} from "lucide-react";

import { useState } from "react";

import { ShareStatus } from "@/app/types/sharedTypes/shareStatus.types";
import StartShareDialog from "./dialogs/StartShareDialog";
import CloseShareDialog from "./dialogs/CloseShareDialog";
import DeleteShareDialog from "./dialogs/DeleteShareDialog";

interface ShareActionsProps {
    shareId: string;
    shareName: string;
    status: ShareStatus;
}

export default function ShareActions({
    shareId,
    shareName,
    status,
}: ShareActionsProps) {

    const [
        menuOpen,
        setMenuOpen,
    ] = useState(false);

    const [
        dialog,
        setDialog,
    ] = useState<
        "start" |
        "close" |
        "delete" |
        null
    >(null);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const openDialog = (
        type:
            "start" |
            "close" |
            "delete",
    ) => {
        setMenuOpen(false);
        setDialog(type);
    };

    return (
        <>
            <div className="relative">

                <button
                    type="button"
                    onClick={() =>
                        setMenuOpen(
                            (current) =>
                                !current,
                        )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Share actions"
                    aria-expanded={menuOpen}
                >
                    <MoreHorizontal size={18} />
                </button>

                {menuOpen && (
                    <>

                        {/* Backdrop */}
                        <button
                            type="button"
                            aria-label="Close actions"
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={closeMenu}
                        />

                        <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">

                            {status === "STARTED" && (
                                <>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openDialog(
                                                "start",
                                            )
                                        }
                                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                                    >
                                        <Play
                                            size={16}
                                            className="text-emerald-600"
                                        />

                                        Start Share
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openDialog(
                                                "delete",
                                            )
                                        }
                                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                                    >
                                        <Trash2 size={16} />

                                        Delete Share
                                    </button>

                                </>
                            )}

                            {status === "IN_PROGRESS" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        openDialog(
                                            "close",
                                        )
                                    }
                                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                                >
                                    <Lock
                                        size={16}
                                        className="text-red-500"
                                    />

                                    Close Share
                                </button>
                            )}

                            {status === "CLOSED" && (
                                <div className="px-3 py-2.5 text-xs text-slate-400">
                                    No actions available
                                </div>
                            )}

                        </div>

                    </>
                )}

            </div>

            <StartShareDialog
                open={dialog === "start"}
                shareId={shareId}
                shareName={shareName}
                onClose={() =>
                    setDialog(null)
                }
            />

            <CloseShareDialog
                open={dialog === "close"}
                shareId={shareId}
                shareName={shareName}
                onClose={() =>
                    setDialog(null)
                }
            />

            <DeleteShareDialog
                open={dialog === "delete"}
                shareId={shareId}
                shareName={shareName}
                status={status}
                onClose={() =>
                    setDialog(null)
                }
            />
        </>
    );
}