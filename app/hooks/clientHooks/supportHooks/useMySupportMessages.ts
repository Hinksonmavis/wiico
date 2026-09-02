"use client"; 

import { useQuery, } from "@tanstack/react-query"; 
import { supportKeys, } from "./supportKeys"; 
import { supportService } from "@/app/services/clientServices/support.service";

export function useMySupportMessages() {
    return useQuery({ 
        queryKey: supportKeys.messages(),
        
        queryFn: supportService.getMyMessages,

        staleTime: 5_000, 
        refetchInterval: 5_000, 
    }); 
}