import { AllowedEvents } from "@/models";
import { z } from "zod";

export const CreatePOAPSchema = z.object({
    attendeesCount: z
        .string()
        .min(1, { message: "Attendance count must be greater than 0"}),
    title: z
        .string()
        .min(1, { message: "Title is required" })
        .max(150, { message: "Title must be less than 150 characters" }),
    description: z.string().min(1, { message: "Description is required" }),
    website: z.string().url({ message: "Website must be a valid URL" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    startDate: z.string().min(1, { message: "Start date is required" }),
    eventType: z
        .enum([AllowedEvents.InPerson, AllowedEvents.Virtual, 'null'])
        .refine((selected) => !!selected && selected !== 'null', { message: "Event type is required" }),
})