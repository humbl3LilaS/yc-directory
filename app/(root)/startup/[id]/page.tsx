import {STARTUP_BY_ID_QUERY} from "@/lib/quries";
import {client} from "@/sanity/lib/client";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import {notFound} from "next/navigation";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

export const experimental_ppr = true;

const StartupDetailPage = async ({params}: { params: Promise<{ id: string }> }) => {
    const id = (
        await params
    )?.id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id})

    if (!post) return notFound();

    const parsedPitch = md.render(post?.pitch || "");
    return (
        <>
            <section className={"pink_container !min-h-[230px]"}>
                <p className={"tag"}>{formatDate(post?._createdAt)}</p>
                <h1 className={"heading"}>
                    {post?.title}
                </h1>
                <p className={"sub-heading !max-w-5xl"}>
                    {post?.description}
                </p>
            </section>
            <section className={"section_container"}>
                <img src={post?.image} alt={"thumbnail"} className={"w-full h-auto rounded-xl"}/>
                <div className={"max-w-4xl space-y-5 mt-10 mx-auto"}>
                    <div className={"flex-between gap-x-5"}>
                        <Link href={`/user/${post?.author?._id}`} className={"mb-3 flex items-center gap-x-2"}>
                            <Image src={post?.author?.image} alt={"avatar"} width={64} height={64}
                                   className={"rounded-full drop-shadow-lg"}/>
                            <span className={"block"}>
                                <span className={"text-20-medium block"}>{post?.author?.name}</span>
                                <span
                                    className={"text-16-medium !text-black-300 block"}>@{post?.author?.username}</span>
                            </span>
                        </Link>
                        <p className={"category-tag"}>{post?.category}</p>
                    </div>

                    <h3 className={"text-30-bold"}>Pitch Details</h3>
                    {
                        parsedPitch ? <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{__html: parsedPitch}}
                        /> : <p
                            className={"no-result"}>No Details Provided</p>
                    }
                </div>
                <hr className={"divider"}/>

                <Suspense fallback={<Skeleton className={"view_skeleton"}/>}>
                    <View id={post?._id}/>
                </Suspense>
            </section>
        </>
    );
};

export default StartupDetailPage;