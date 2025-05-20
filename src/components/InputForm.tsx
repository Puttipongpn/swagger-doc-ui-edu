import { useState } from 'react';
import type { SwaggerInput } from '../types/swagger';
import RequestBodyEditor from './RequestBodyEditor';
import type { QueryParam } from '../types/swagger';
import QueryParamEditor from './QueryParamEditor';
import ResponseEditor from './ResponseEditor';

interface Props {
    onGenerate: (input: SwaggerInput & { queryParams?: QueryParam[] }) => void;
}

export default function InputForm({ onGenerate }: Props) {
    const [form, setForm] = useState<SwaggerInput>({
        path: '/api/example',
        method: 'post',
        tags: ['example'],
        summary: 'Example summary',
        description: 'Example description',
        requestBody: {},
        responses: {
            '200': { description: 'Success response' },
        },
    });
    const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
    const [responses, setResponses] = useState([{ code: '200', description: 'Success response' }]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setForm({ ...form, tags: value.split(',').map((tag) => tag.trim()) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleGenerate = () => {
        const responseObj = responses.reduce((acc, res) => {
            if (res.code) acc[res.code] = { description: res.description };
            return acc;
        }, {} as Record<string, { description: string }>);

        onGenerate({
            ...form,
            responses: responseObj,
            queryParams,
        });
    };

    return (
        <div className="space-y-4 border p-4 rounded">
            <div className="grid grid-cols-5 gap-4">
                <label className="font-bold">Path</label>
                <input name="path" value={form.path} onChange={handleChange} className="input col-span-4" placeholder="Path" />

                <label className="font-bold">Method</label>
                <select name="method" value={form.method} onChange={handleChange} className="input col-span-4">
                    {['get', 'post', 'put', 'delete'].map((method) => (
                        <option key={method} value={method.toLowerCase()}>
                            {method.toUpperCase()}
                        </option>
                    ))}
                </select>

                <label className="font-bold">Tags</label>
                <input
                    name="tags"
                    value={form.tags.join(', ')}
                    onChange={handleChange}
                    className="input col-span-4"
                    placeholder="Tags (comma separated)"
                />

                <label className="font-bold">Summary</label>
                <input name="summary" value={form.summary} onChange={handleChange} className="input col-span-4" placeholder="Summary" />

                <label className="font-bold">Description</label>
                <input name="description" value={form.description} onChange={handleChange} className="input col-span-4" placeholder="Description" />
            </div>

            <RequestBodyEditor
                method={form.method}
                onUpdate={(requestBody) => setForm((prev) => ({ ...prev, requestBody }))}
            />
            <QueryParamEditor
                method={form.method}
                onUpdate={(params) => setQueryParams(params)}
            />
            <ResponseEditor
                responses={responses}
                setResponses={setResponses}
            />

            <div className="grid grid-cols-1">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleGenerate}
                >
                    Generate
                </button>
            </div>
        </div>
    );
}
