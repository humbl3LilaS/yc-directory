import {client} from "@/sanity/lib/client";
import {STARTUPS_BY_AUTHOR_QUERY} from "@/sanity/lib/quries";
import StartupCard, {StartupCardType} from "@/components/StartupCard";

const UserStartups = async ({id}: { id: string }) => {
    const startups: StartupCardType[] = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})

    return (
        <>
            {
                startups.length > 0
                ? startups.map(item => <StartupCard post={item} key={item._id}/>)
                : <p className={"no-result"}>No post yet</p>
            }
        </>
    );
};

export default UserStartups;