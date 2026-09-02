"use client"; 

import { useQuery, } from "@tanstack/react-query";
import { adminSupportKeys, } from "./adminSupportKeys"; 
import { adminSupportService } from "@/app/services/adminServices/adminSupport.service";

export function useAdminSupportConversations() { 
    return useQuery({ 
        queryKey: adminSupportKeys.conversations(),
        
        queryFn: adminSupportService
            .getConversations, 
        
        staleTime: 5_000, 
        
        refetchInterval: 5_000, 
    }); 
}