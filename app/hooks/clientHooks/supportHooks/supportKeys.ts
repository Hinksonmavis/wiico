export const supportKeys = {

    all: ["support"] as const,

    conversation: () => [
        "support",
        "conversation",
    ] as const,

    messages: () => [
        "support",
        "messages",
    ] as const,
};