import Form from "next/form";
import FormResetButton from "@/components/FormResetButton";
import {SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

type SearchFormProps = {
    query?: string;
}

const SearchForm = ({query}: SearchFormProps) => {


    return (
        <Form action={"/"} scroll={false} className={"search-form"}>
            <input name={"query"} defaultValue={""} className={"search-input"} placeholder={"Search Startups..."}/>
            <div className={"flex gap-x-2"}>
                {query && <FormResetButton/>}
                <Button type={"submit"} className={"search-btn text-white"}>
                    <SearchIcon/>
                </Button>
            </div>
        </Form>
    );
};

export default SearchForm;