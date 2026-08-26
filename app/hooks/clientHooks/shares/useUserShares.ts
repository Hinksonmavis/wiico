import { userShareService } from "@/app/services/clientServices/share.service";
import { PurchaseShareDto } from "@/app/types/clientTypes/share.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const userShareKeys = {
    all: ["user-shares"] as const,
    lists: () => [...userShareKeys.all, "list"] as const,
    list: (params?: { page?: number; limit?: number }) => [...userShareKeys.lists(), params] as const,
    details: () => [...userShareKeys.all, "detail"] as const,
    detail: (shareId: string) => [...userShareKeys.details(), shareId] as const,
    purchases: () => [...userShareKeys.all, "purchases"] as const,
    purchase: (purchaseId: string) => [...userShareKeys.purchases(), purchaseId] as const,
};

export function useUserShares(params?: { page?: number; limit?: number }) {
    return useQuery({ queryKey: userShareKeys.list(params), queryFn: () => userShareService.getShares(params) });
}

export function useUserShare(shareId: string) {
    return useQuery({ queryKey: userShareKeys.detail(shareId), queryFn: () => userShareService.getShare(shareId), enabled: Boolean(shareId) });
}

export function usePurchaseShare() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ shareId, dto }: { shareId: string; dto: PurchaseShareDto }) => userShareService.purchaseShare(shareId, dto),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: userShareKeys.detail(variables.shareId) });
            queryClient.invalidateQueries({ queryKey: userShareKeys.purchases() });
            // Connect this to the existing wallet query key in your application.
            queryClient.invalidateQueries({ queryKey: ["wallet"] });
        },
    });
}

export function useUserSharePurchases(params?: { page?: number; limit?: number }) {
    return useQuery({ queryKey: [...userShareKeys.purchases(), params], queryFn: () => userShareService.getPurchases(params) });
}

export function useUserSharePurchase(purchaseId: string) {
    return useQuery({ queryKey: userShareKeys.purchase(purchaseId), queryFn: () => userShareService.getPurchase(purchaseId), enabled: Boolean(purchaseId) });
}
