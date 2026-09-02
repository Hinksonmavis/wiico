"use client"; 

import { useMutation, useQueryClient, } from "@tanstack/react-query"; 
import { supportKeys, } from "./supportKeys"; 
import { supportService } from "@/app/services/clientServices/support.service";

export function useSendSupportMessage() { 
    const queryClient = useQueryClient(); 
    
    return useMutation({ 
        mutationFn: supportService.sendMessage,
        
        onSuccess: async () => { 
            await Promise.all([ 
                queryClient.invalidateQueries({ 
                    queryKey: 
                        supportKeys.messages(), 
                }), 
                    
                queryClient.invalidateQueries({ 
                    queryKey: 
                        supportKeys.conversation(), 
                }), 
            ]); 
        }, 
    }); 
        
}