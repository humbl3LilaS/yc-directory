import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/lib/quries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";


export default async function Home({searchParams}: { searchParams: Promise<{ query?: string }> }) {
    const params = await searchParams;

    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params: {search: params.query || null}});


    return (
        <>
            <section className={"pink_container"}>
                <h1 className={"heading"}>Pitch Your Startup, <br/> Connect with Entrepreneurs</h1>
                <p className={"sub-heading !max-w-3xl"}>
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>
                <SearchForm query={params.query}/>
            </section>
            <section className={"section_container"}>
                <p className={"text-30-semibold"}>
                    {
                        params.query ? `Search results for: (${params.query})` : "All Startups"
                    }
                </p>
                <ul className={"mt-7 card_grid"}>
                    {posts?.length > 0 && (
                        posts.map((post: StartupTypeCard) => (
                            <StartupCard post={post} key={post?._id}/>
                        ))
                    )}
                </ul>
            </section>
            <SanityLive/>
        </>
    );
}

