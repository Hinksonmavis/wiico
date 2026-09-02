"use client"; 

import { useMutation, useQueryClient, } from "@tanstack/react-query"; 
import { adminSupportKeys, } from "./adminSupportKeys"; 
import { adminSupportService } from "@/app/services/adminServices/adminSupport.service";

interface SendAdminSupportMessageVariables { 
    conversationId: string; 
    message: string; 
} 

export function useAdminSendSupportMessage() { 
    const queryClient = useQueryClient(); 
    
    return useMutation({ 
        mutationFn: ({ 
            conversationId, 
            message, 
        }: SendAdminSupportMessageVariables) => 
            adminSupportService.sendMessage(
                conversationId, 
                message, 
            ), 
            
            onSuccess: (_, variables) => { 
                queryClient.invalidateQueries({
                    queryKey: adminSupportKeys.messages( 
                        variables.conversationId, 
                    ), 
                }); 
                
                queryClient.invalidateQueries({
                    queryKey: adminSupportKeys.conversation( 
                        variables.conversationId, 
                    ), 
                }); 
                
                queryClient.invalidateQueries({
                    queryKey: adminSupportKeys.conversations(), 
                }); 
            }, 
        }); 
}