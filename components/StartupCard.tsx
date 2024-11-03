import {formatDate} from "@/lib/utils";
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";

type StartupCardProps = {
    post: any
}


const StartupCard = ({post}: StartupCardProps) => {
    return (
        <li className={"startup-card group"}>
            <div className={"flex-between"}>
                <p className={"startup-card_date"}>
                    {formatDate(post?._createdAt)}
                </p>
                <div className={"flex gap-x-1.5"}>
                    <EyeIcon className={"size-6 text-primary"}/>
                    <span className={"text-16-medium"}>
                        {post?.views}
                    </span>
                </div>
            </div>
            <div className={"mt-5 flex-between gap-x-5"}>
                <div className={"flex-1"}>
                    <p className={"text-16-medium line-clamp-1"}>
                        <Link href={`/user/${post?.author?._id}`}>
                            {post?.author?.name}
                        </Link>
                    </p>

                    <h3 className={"text-26-semibold"}>
                        <Link href={`/startup/${post?._id}`}>
                            {post?.title}
                        </Link>
                    </h3>
                </div>
                <Link href={`/user/${post?.author?._id}`}>
                    <Image src={"https://placehold.co/48x48"} alt={"logo"} width={48} height={48}
                           className={"rounded-full"}/>
                </Link>
            </div>
            <p className={"startup-card_desc"}>
                <Link href={`/startup/${post?._id}}`}>
                    {post?.description}
                </Link>
                <Link href={`/startup/${post?._id}}`} className={"block mt-3"}>
                    <img src={post?.image} alt={"placeholder"} className={"startup-card_img"}/>
                </Link>
            </p>

            <div className={"mt-5 flex-between gap-x-3"}>
                <p className={"text-16-medium"}>
                    <Link href={`/?query=${post?.category?.toLowerCase()}`}>
                        {post?.category}
                    </Link>
                </p>
                <Button className={"startup-card_btn"}>
                    <Link href={`/startup/${post?._id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    );
};
export default StartupCard;