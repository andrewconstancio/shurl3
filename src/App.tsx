import React, { useState, useRef } from "react";
import copy from "copy-to-clipboard";
import validator from 'validator'
import axios from "axios";
import './App.css'
import LongURLInput from "./LongURLInput";
import ShortURLResults from "./ShortURLResults";

function App() {
	const baseURLShortnerAPI = "https://www.shurl3.xyz/createshorturl/";
	const [url, setUrl] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [networkErrorIsVisible, setNetworkErrorIsVisible] = useState<boolean>(false);
	const [shortURL, setShortURL] = useState<string>("");
	const [copySuccess, setCopySuccess] = useState<boolean>(false);

	const createShortURL = () => {
		if (!validator.isURL(url)) {
			setErrorMessage("The URL is not valid!");
			return;
		}

		setErrorMessage("");
		
		let apiReqPath = `${baseURLShortnerAPI}?long_url=${url}`

		axios.post(apiReqPath)
		.then(function(response) {
			setShortURL(response.data.short_url);
		})
		.catch(function() {
			setErrorMessage("There was an error when making the short URL!");
			setNetworkErrorIsVisible(true);
		})
	}

	const copyToClipboard = () => {
		copy(shortURL);
		setCopySuccess(true);
		setTimeout(() => {
			setCopySuccess(false);
		}, 2000)
	}

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			createShortURL();
		}
	}

	const shortenAnotherURL = () => {
		setUrl("");
		setShortURL("");
	}

	return (
		<div className="w-screen flex flex-col items-center justify-center">
			<div className="bg-slate-50 
				pt-10 pl-10 pr-10 pb-20 rounded-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]
				w-1/2
				">
				<div className="mb-10">
					<h1 className="inline">shurl3</h1>
					<span className="ml-3">[url shortner]</span>
				</div>
				{shortURL == "" ?
					(
						<LongURLInput 
							errorMessage={errorMessage}
							networkErrorIsVisible={networkErrorIsVisible}
							shortURL={shortURL}
							url={url}
							setUrl={setUrl}
							handleKeyDown={handleKeyDown}
							createShortURL={createShortURL}
						/>
					)
				:	(
					<ShortURLResults
						url={url}
						shortURL={shortURL}
						copySuccess={copySuccess}
						copyToClipboard={copyToClipboard}
						shortenAnotherURL={shortenAnotherURL}
					/>	
					)
				}
			</div>
		</div>
	)
}

export default App