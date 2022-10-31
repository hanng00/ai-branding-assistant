interface ResultProps {
    prompt: string;
    snippet: string;
    keywords: string[];
    onBack: any;
}

const Results: React.FC<ResultProps> = (props) => {
    const keywordsElements = [];
    for (let i = 0; i < props.keywords.length; i++) {
        const element = <div key={i}>#{props.keywords[i]}</div >
        keywordsElements.push(element)
    }

    return (
        <>
            <div>
                <div>
                    <div>
                        <b> Prompt:</b>
                    </div>
                    <div>{props.prompt}</div>
                    <div>
                        <b> Snippet:</b>
                    </div>
                    <div>{props.snippet}</div>
                    <div>
                        <b> Keywords: </b>
                    </div>
                    <div>{keywordsElements} </div>
                </div>
            </div>
            <button onClick={props.onBack}>Back</button>

        </>
    )
}

export default Results;