import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";


export default async function Home({searchParams}: { searchParams: Promise<{ query?: string }> }) {
    const params = await searchParams;

    const posts = [
        {
            _createdAt: new Date(),
            views: 55,
            author: {
                _id: "1",
                name: "Super Edelweiss"
            },
            _id: "1",
            description: "This is a demo description",
            image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
            category: "Travel",
            title: "We Roll We Go"
        }
    ]

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
                        posts.map((post) => (
                            <StartupCard post={post} key={post?._id}/>
                        ))
                    )}
                </ul>
            </section>
        </>
    );
}

