import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUP_VIEWS_QUERY} from "@/lib/quries";

type ViewProps = {
    id: string
}
const View = async ({id}: ViewProps) => {
    const {views} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});
    return (
        <div className={"view-container"}>
            <div className={"absolute -top-2 -right-2"}>
                <Ping/>
            </div>
            <p className={"view-text"}>
                <span className={"font-black"}>{views} Views</span>
            </p>
        </div>
    );
};

export default View;