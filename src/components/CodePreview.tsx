import { useState } from 'react';
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineFileDownloadDone } from "react-icons/md";

interface Props {
    code: string;
}

export default function CodePreview({ code }: Props) {
    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const handelDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'swagger-code.txt';
        link.click();
        URL.revokeObjectURL(url);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
    }

    return (
        <div className="relative">
            {copied ? (
                <TbCopyCheck
                    className="absolute top-2 right-2 text-green-400"
                    size={25}
                />
            ) : (
                <TbCopy
                    className="absolute top-2 right-2 text-slate-200 hover:text-white"
                    onClick={handleCopy}
                    size={25}
                />
            )}
            {downloaded ? (
                <MdOutlineFileDownloadDone
                    className="absolute top-2 right-10 text-green-400"
                    size={27}
                />
            ) :
                <button
                    className="absolute top-2 right-10 text-slate-200 hover:text-white"
                    onClick={handelDownload}
                >
                    <MdOutlineFileDownload
                        size={27}
                    />
                </button>}

            <pre className="bg-gray-800 text-green-200 p-4 min-h-10 rounded overflow-auto whitespace-pre-wrap">
                {code}
            </pre>
        </div>
    );
}
