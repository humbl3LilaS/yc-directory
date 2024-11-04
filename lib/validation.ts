import {z} from "zod";

export const StartupFromSchema = z.object(
    {
        title: z.string().min(1, {message: "Title is required"}),
        description: z.string().min(1, {message: "Description is required"}),
        category: z.string().min(1, {message: "Category is required"}),
        image: z.string()
                .url({message: "Invalid Image url"})
                .min(1, {message: "Image is required"})
                .refine(
                    async (url) => {
                        try {
                            const res = await fetch(url, {method: "HEAD"});
                            const contentType = res.headers.get("content-type");

                            return contentType?.startsWith("image/");
                        } catch {
                            return false;
                        }
                    }),
        pitch: z.string().min(150, {message: "Pitch must be at least 150 characters long"}),
    }
)

export type StartupFromSchemaType = Zod.infer<typeof StartupFromSchema>;
