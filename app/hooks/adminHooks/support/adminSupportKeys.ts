export const adminSupportKeys = {

    all: ["admin-support"] as const, 
    
    conversations: () => [ 
        "admin-support", 
        "conversations", 
    ] as const, 
    
    conversation: (id: string) => [ 
        "admin-support", 
        "conversation", 
        id, 
    ] as const, 
        
    messages: (id: string) => [ 
        "admin-support", 
        "messages", 
        id, 
    ] as const, 
};