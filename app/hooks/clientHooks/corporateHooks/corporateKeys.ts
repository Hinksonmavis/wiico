export const corporateKeys = {

    all:
        ["corporate"] as const,

    announcements:
        () =>
            [
                "corporate",
                "announcements",
            ] as const,
};