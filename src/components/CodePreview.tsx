import { useState } from 'react';
import { TbCopy, TbCopyCheck } from "react-icons/tb";

interface Props {
    code: string;
}

export default function CodePreview({ code }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

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
            <pre className="bg-gray-800 text-green-200 p-4 min-h-10 rounded overflow-auto whitespace-pre-wrap">
                {code}
            </pre>
        </div>
    );
}
