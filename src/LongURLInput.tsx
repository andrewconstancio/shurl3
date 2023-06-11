import './App.css'

interface LongURLInputProps {
    errorMessage: string;
    networkErrorIsVisible: boolean;
    shortURL: string;
    url: string;
    setUrl(url: string): void;
    handleKeyDown(event: any): void;
    createShortURL(): void;
}

function LongURLInput(props: LongURLInputProps) {
    const { 
        errorMessage,  
        networkErrorIsVisible, 
        shortURL, 
        url, 
        setUrl, 
        handleKeyDown, 
        createShortURL 
    } = props;

    return (
        <>
            <div className={`p-2 ${networkErrorIsVisible ? "bg-red-500" : "bg-orange-500"} mb-4 
                    rounded-md text-white
                    ${errorMessage != "" ? "visiable ease-in duration-500" : "invisible"}
                `}>
                <span>{errorMessage}</span>
            </div>
            <div className={`flex ${shortURL ? "opacity-0" : "opacity-100"}`}>
                <input 
                    type="text" 
                    placeholder="Enter a long url..." 
                    className="input text-black border-2 border-slate-500/50 w-full mr-3 bg-white"  
                    onChange={((e) => setUrl(e.target.value))}
                    value={url}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn bg-blue-500 text-white cursor-pointer" 
                    onClick={createShortURL}>Create</button>
            </div>
        </>
    )
}

export default LongURLInput