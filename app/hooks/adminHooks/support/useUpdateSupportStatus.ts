"use client"; 

import { useMutation, useQueryClient, } from "@tanstack/react-query"; 
import { SupportConversationStatus, } from "@/app/types/sharedTypes/support.types"; 
import { adminSupportKeys, } from "./adminSupportKeys"; 
import { adminSupportService } from "@/app/services/adminServices/adminSupport.service";

interface UpdateSupportStatusVariables { 
    conversationId: string; 
    status: SupportConversationStatus; 
} 

export function useUpdateSupportStatus() { 
    const queryClient = useQueryClient(); 
    
    return useMutation({ 
        mutationFn: ({ 
            conversationId, 
            status, 
        }: UpdateSupportStatusVariables) => 
            adminSupportService.updateStatus(
                conversationId, 
                status, 
            ), 
            
            onSuccess: (_, variables) => { 
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