import { useState } from 'react';
import type { SwaggerInput } from '../types/swagger';

interface Props {
    onGenerate: (input: SwaggerInput) => void;
}

export default function InputForm({ onGenerate }: Props) {
    const [form, setForm] = useState<SwaggerInput>({
        path: '/api/example',
        method: 'post',
        tags: ['example'],
        summary: 'Example summary',
        description: 'Example description',
        requestBody: {
            name: { type: 'string', description: 'Name of user', example: 'John' },
        },
        responses: {
            '200': { description: 'Success response' },
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="space-y-4">
            <input name="path" value={form.path} onChange={handleChange} className="input" placeholder="Path" />
            <input name="summary" value={form.summary} onChange={handleChange} className="input" placeholder="Summary" />
            <input name="description" value={form.description} onChange={handleChange} className="input" placeholder="Description" />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => onGenerate(form)}
            >
                Generate
            </button>
        </div>
    );
}
