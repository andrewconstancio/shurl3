import './App.css'

interface ShortURLResultsProps {
    url: string;
    copySuccess: boolean;
    shortURL: string;
    copyToClipboard(): void;
    shortenAnotherURL(): void;
}

function ShortURLResults(props: ShortURLResultsProps) {
    const { 
        url, 
        copySuccess, 
        shortURL, 
        copyToClipboard, 
        shortenAnotherURL 
    } = props;

    return (
        <>
            <div className={`fade ${shortURL ? 'visible' : 'hidden'}`}>
                <h6 className="ml-2 font-bold">Long Url</h6>
                <div className={`p-6 text-black rounded-md bg-slate-100`}>
                    <span>{url}</span>
                </div>
                <h6 className="mt-10 ml-2 font-bold">Short Url</h6>
                <div className={`p-6 
                    text-black rounded-md
                    ${copySuccess ? "bg-green-100" : "bg-slate-100"}
                        transition-opacity duration-1000
                `}>
                    <div className="flex">
                        <h2 className="grow"
                        >{shortURL}</h2>
                        <div>
                            <span className={`mr-3 font-bold 
                                ${copySuccess ? "opacity-100" : "opacity-0"}
                                transition-opacity duration-1000 ease-out
                            `}>Copied</span>
                            <i className="fa-solid fa-copy fa-lg flex-none 
                                cursor-pointer mt-3 icon-copy-to-clipboard hover:fill-blue-500" 
                                onClick={copyToClipboard}>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="flex mt-5">
                    <button className="btn btn-active btn-success text-white flex-grow " onClick={shortenAnotherURL}>Shorten another</button>
                </div>
            </div>
        </>
    )
}

export default ShortURLResults