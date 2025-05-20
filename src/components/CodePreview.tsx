interface Props {
    code: string;
}

export default function CodePreview({ code }: Props) {
    return (
        <pre className="bg-gray-800 text-green-200 p-4 rounded overflow-auto whitespace-pre-wrap">
            {code}
        </pre>
    );
}