"use client"; 

import { useMutation, useQueryClient, } from "@tanstack/react-query"; 
import { supportKeys, } from "./supportKeys"; 
import { supportService } from "@/app/services/clientServices/support.service";

export function useMarkSupportAsRead() { 
    const queryClient = useQueryClient(); 
    
    return useMutation({ 
        mutationFn: supportService.markAsRead, 
        
        onSuccess: () => { 
            queryClient.invalidateQueries({ 
                queryKey: supportKeys.conversation(), 
            }); 
        }, 
    }); 
}