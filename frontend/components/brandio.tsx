import { useState } from "react";
import Form from "./form";
import Results from "./results";

const Brandio: React.FC = () => {
    const ENDPOINT: string = "https://r0uq6dymo4.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keyword"
    const CHARACTER_LIMIT: number = 32


    const [prompt, setPrompt] = useState("")
    const [snippet, setSnippet] = useState("")
    const [keywords, setKeywords] = useState([])
    const [hasResult, setHasResult] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = () => {
        console.log("Submitting: " + prompt)
        setIsLoading(true)
        fetch(`${ENDPOINT}?prompt=${prompt}`)
            .then((res) => res.json())
            .then(onResult)
    }

    const onResult = (data: any) => {
        setSnippet(data.snippet)
        setKeywords(data.keywords)
        setHasResult(true)
        setIsLoading(false)

    }

    const onReset = (data: any) => {
        setPrompt("")
        setHasResult(false)
        setIsLoading(false)

    }

    let displayedElement = null;

    if (hasResult) {
        displayedElement = <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt} />
    } else {
        displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT} />

    }
    const gradientTextStyle =
        "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";


    return (
        <div className="h-screen flex">
            <div className="max-w-md m-auto p-2">
                <div className="bg-slate-100 p-6 rounded-md text-black">
                    <div className="text-center my-6">
                        <h1 className={gradientTextStyle + " text-4xl font-normal"}>
                            Brand.io
                        </h1>
                        <div className={gradientTextStyle + " font-normal"}>Your AI branding assistant</div>
                    </div>
                    {displayedElement}
                </div>
            </div>
        </ div>

    )
}

export default Brandio;