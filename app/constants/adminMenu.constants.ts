import { BadgeDollarSign, ClipboardList, Coins, CreditCard, FileBarChart2, Film, LayoutDashboard, Package, Settings, Users, Wallet } from "lucide-react";
import { MenuItem } from "../types/adminTypes/adminMenu.types";

export const MANAGEMENT: MenuItem[] = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Upgrade Requests",
        href: "/admin/upgrade-requests",
        icon: BadgeDollarSign,
    },
    {
        title:"Wallet",
        href:"/admin/wallet",
        icon:Wallet,
    },
    {
        title: "Withdrawal Requests",
        href: "/admin/withdrawals",
        icon: CreditCard,
    },
];

export const BUSINESS: MenuItem[] = [
    {
        title: "Deposit Requests",
        href: "/admin/deposits",
        icon: Coins,
    },
    {
        title: "Membership Plans",
        href: "/admin/membership-plans",
        icon: Package,
    },
    {
        title: "Daily Order Config",
        href: "/admin/daily-order-configs",
        icon: ClipboardList,
    },
    {
        title: "Transactions",
        href: "/admin/transactions",
        icon: Wallet,
    },
    {
        title: "Reports",
        href: "/admin/reports",
        icon: FileBarChart2,
    },
    {
        title: "Advertisements",
        href: "/admin/advertisements",
        icon: Film,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];