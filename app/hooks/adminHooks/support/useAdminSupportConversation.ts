"use client"; 

import { useQuery, } from "@tanstack/react-query"; 
import { adminSupportKeys, } from "./adminSupportKeys"; 
import { adminSupportService } from "@/app/services/adminServices/adminSupport.service";

export function useAdminSupportConversation( 
    conversationId: string, 
) { 
    
    return useQuery({ 
        
        queryKey: adminSupportKeys.conversation( 
            conversationId, 
        ), 
        
        queryFn: () => adminSupportService.getConversation( 
            conversationId, 
        ), 
        
        enabled: Boolean(
            conversationId
        ), 
        
        staleTime: 5_000, 
        
        refetchInterval: 5_000, 
    }); 
}