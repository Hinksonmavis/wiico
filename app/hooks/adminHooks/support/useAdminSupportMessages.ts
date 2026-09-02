"use client"; 

import { useQuery, } from "@tanstack/react-query"; 
import { adminSupportKeys, } from "./adminSupportKeys"; 
import { adminSupportService } from "@/app/services/adminServices/adminSupport.service";

export function useAdminSupportMessages(        
    conversationId: string, 
) { 
    
    return useQuery({ 
        
        queryKey: adminSupportKeys.messages( 
            conversationId, 
        ), 
        
        queryFn: () => adminSupportService
            .getMessages( 
                conversationId, 
            ), 
            
        enabled: Boolean(
            conversationId
        ), 
        
        staleTime: 2_000, 
        
        refetchInterval: 3_000, 
    }); 
}