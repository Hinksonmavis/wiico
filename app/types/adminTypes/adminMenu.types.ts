export interface AdminMenuSheetProps {
    open: boolean;
    onClose: () => void;
}

export interface MenuItem {
    title: string;
    href: string;
    icon: React.ElementType;
}