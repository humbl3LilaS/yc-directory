"use client"

import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import {Send} from "lucide-react";
import {Button} from "@/components/ui/button";
import {StartupFromSchema, StartupFromSchemaType} from "@/lib/validation";
import {createPitch} from "@/lib/action";

import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast"


const StartupForm = () => {
    const {
        control,
        formState: {errors, isValid, isSubmitting},
        register,
        handleSubmit
    } = useForm<StartupFromSchemaType>(
        {
            resolver: zodResolver(StartupFromSchema),
            defaultValues: {
                title: "",
                description: "",
                category: "",
                image: "",
                pitch: ""
            },
            mode: "onBlur",
        }
    );

    const router = useRouter();
    const {toast} = useToast()


    const onSubmit: SubmitHandler<StartupFromSchemaType> = async (value) => {
        console.log(value)
        try {
            const response = await createPitch(value);

            if (response.status === "SUCCESS") {
                toast({
                          title: "Success",
                          description: "Your startup pitch has been created successfully",
                      });

                router.push(`/startup/${response._id}`);
            } else {
                toast({title: "Failed to create Pitch", description: response.error, variant: "destructive",});
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({title: "Failed to create Pitch", description: error?.message, variant: "destructive",});
            } else {
                toast({title: "Failed to create Pitch", variant: "destructive",});
            }
        }
    }

    return (
        <form className="startup-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label className={"startup-form_label"} htmlFor={"title"}>Title</Label>
                <Input
                    id={"title"}
                    className={"startup-form_input"}
                    required={true}
                    placeholder={"Startup Title"} {...register("title")}
                />
                {errors.title && <p className={"startup-form_error"}>{errors.title.message}</p>}
            </div>

            <div>
                <Label htmlFor="description" className="startup-form_label">
                    Description
                </Label>
                <Textarea
                    id="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup Description"
                    {...register("description")}
                />

                {errors.description && <p className="startup-form_error">{errors.description.message}</p>}
            </div>
            <div>
                <Label htmlFor="category" className="startup-form_label">
                    Category
                </Label>
                <Input
                    id="category"
                    className="startup-form_input"
                    placeholder="Startup Category (Tech, Health, Education...)"
                    {...register("category")}
                />

                {errors.category && <p className="startup-form_error">{errors.category.message}</p>}
            </div>

            <div>
                <Label htmlFor="image" className="startup-form_label">
                    Image URL
                </Label>
                <Input
                    id="image"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                    {...register("image")}
                />

                {errors.image && <p className="startup-form_error">{errors.image.message}</p>}
            </div>
            <div data-color-mode={"light"}>
                <Label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </Label>
                <Controller name={"pitch"} control={control} render={({field}) => <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{borderRadius: 20, overflow: "hidden", marginTop: "10px"}}
                    textareaProps={{
                        placeholder:
                            "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />}
                />
                {errors.pitch && <p className="startup-form_error">{errors.pitch.message}</p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white !disabled:cursor-not-allowed"
                disabled={!isValid && isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2"/>
            </Button>
        </form>
    );
};

export default StartupForm;
