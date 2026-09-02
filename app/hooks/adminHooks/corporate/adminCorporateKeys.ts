export const adminCorporateKeys = {

    all:
        ["admin-corporate"] as const,

    announcements:
        () =>
            [
                "admin-corporate",
                "announcements",
            ] as const,

    announcement:
        (id: string) =>
            [
                "admin-corporate",
                "announcement",
                id,
            ] as const,
};