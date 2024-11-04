"use server"
import {StartupFromSchemaType} from "@/lib/validation";
import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";


type IResponse = {
    error: string;
    status: "ERROR" | "SUCCESS";
    [key: string]: string;
}

export const createPitch = async (value: StartupFromSchemaType): Promise<IResponse> => {
    const {title, description, category, image, pitch} = value;

    const session = await auth();

    if (!session) {
        return parseServerActionResponse({error: "Not sign in", status: "ERROR"});
    }
    const slug = slugify(title, {lower: true, strict: true});

    try {
        const startup = {
            title,
            description,
            category,
            image,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch
        }
        const result = await writeClient.create({_type: "startup", ...startup})
        return parseServerActionResponse({error: null, status: "SUCCESS", ...result})
    } catch (error) {
        return parseServerActionResponse({error: JSON.stringify(error), status: "ERROR"});
    }
}