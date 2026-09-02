"use client"; 

import { useMutation, useQueryClient, } from "@tanstack/react-query"; 
import { adminSupportKeys, } from "./adminSupportKeys"; 
import { adminSupportService } from "@/app/services/adminServices/adminSupport.service";

export function useMarkAdminSupportAsRead() { 
    const queryClient = useQueryClient(); 
    
    return useMutation({ 
        mutationFn: adminSupportService.markAsRead,
        
        onSuccess: (_, conversationId) => {
            queryClient.invalidateQueries({ 
                queryKey: adminSupportKeys.messages( 
                    conversationId, 
                ), 
            }); 
            
            queryClient.invalidateQueries({ 
                queryKey: adminSupportKeys.conversation( 
                    conversationId, 
                ), 
            }); 
            
            queryClient.invalidateQueries({ 
                queryKey: adminSupportKeys.conversations(), 
            }); 
        }, 
    }); 
}