interface ResultProps {
    prompt: string;
    snippet: string;
    keywords: string[];
    onBack: any;
}


const Results: React.FC<ResultProps> = (props) => {
    const keywordsElements = [];
    for (let i = 0; i < props.keywords.length; i++) {
        const element = <div key={i} className="bg-teal-100 p-1 px-2 text-slate-700 text-sm rounded-md">#{props.keywords[i]}</div >
        keywordsElements.push(element)
    }

    const keywordElementsHolder = <div className="flex flex-wrap gap-2">{keywordsElements}</div>

    const resultSection = (label: string, body: any) => {
        return (
            <div className="bg-white p-4 my-3 rounded-md">
                <div className="text-slate-500 font-bold mb-1">{label}:</div>
                <div>{body}</div>
            </div>)
    }


    return (
        <>
            <div className="mb-4">
                {resultSection("Prompt", <div className="text-lg font-bold"> {props.prompt}</div>)}
                {resultSection("Branding Snippet", props.snippet)}
                {resultSection("Keywords", keywordElementsHolder)}

            </div>
            <button
                className="bg-gradient-to-r from-teal-400 
            to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg text-white"
                onClick={props.onBack}
            >
                Back
            </button>

        </>
    )
}

export default Results;