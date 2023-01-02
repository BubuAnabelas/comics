import React, { useState, useEffect } from "react";
import { useApiUrl } from "@pankod/refine-core";
import {
    useParams,
    useSearchParams
} from "react-router-dom";
import 'villain-react/dist/style.css'
const Villain = require('villain-react')

let comicFile: any = undefined
export const ViewComic: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('Watchmen');
    const [comicDownloaded, setComicDownloaded] = useState(false)

    const apiUrl = useApiUrl();
    const params = useParams() as Record<string, string>;
    let [searchParams, setSearchParams] = useSearchParams();
    console.log({searchParams})
    const url = `${apiUrl}/getComic?${searchParams}`
    useEffect(() => {
        const comic = fetch(url).then(async res => {
            comicFile = await res.blob()
            console.log({comicFile})
            setComicDownloaded(true)
        })
    }, [url])

    const [options, setOptions] = React.useState({
        theme: 'Light',
        maxPages: 500,
        forceSort: true,
        mangaMode: false,
        allowFullScreen: true,
        allowGlobalShortcuts: true,
    })


    return (
        <div className="container mx-auto">
            {comicDownloaded && <Villain className={'min-h-full h-screen w-full'} options={options} source={comicFile} workerUrl={'/libarchive.js/dist/worker-bundle.js'} />}
        </div>
    );
};