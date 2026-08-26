import { z } from "zod";

export const createShareSchema = z.object({
    name: z
        .string()
        .trim()
        .min(
            2,
            "Share name must be at least 2 characters.",
        )
        .max(
            100,
            "Share name cannot exceed 100 characters.",
        ),

    logo: z
        .string()
        .optional()
        .or(z.literal("")),

    logoPublicId: z
        .string()
        .optional()
        .or(z.literal("")),

    description: z
        .string()
        .trim()
        .max(
            1000,
            "Description cannot exceed 1000 characters.",
        )
        .optional()
        .or(
            z.literal(""),
        ),

    dailyReturnPercentage: z
        .number({
            message:
                "Daily return percentage is required.",
        })
        .positive(
            "Daily return percentage must be greater than 0.",
        ),

    cycleDays: z
        .number({
            message:
                "Cycle days is required.",
        })
        .int(
            "Cycle days must be a whole number.",
        )
        .positive(
            "Cycle days must be greater than 0.",
        ),
});

export type CreateShareFormValues =
    z.infer<typeof createShareSchema>;