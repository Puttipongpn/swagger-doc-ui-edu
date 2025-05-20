import { useEffect, useState } from 'react';
import type { SwaggerSchemaProperty } from '../types/swagger';

interface RequestField {
  key: string;
  type: string;
  description: string;
  example: string;
}

interface Props {
  method: string;
  onUpdate: (body: Record<string, SwaggerSchemaProperty>) => void;
}

export default function RequestBodyEditor({ method, onUpdate }: Props) {
  const [requestFields, setRequestFields] = useState<RequestField[]>([
    { key: 'name', type: 'string', description: 'Name of user', example: 'John' },
  ]);

  useEffect(() => {
    const requestBody: Record<string, SwaggerSchemaProperty> = {};
    requestFields.forEach((field) => {
      if (field.key.trim()) {
        requestBody[field.key] = {
          type: field.type,
          description: field.description,
          example: field.example,
        };
      }
    });
    onUpdate(requestBody);
  }, [onUpdate, requestFields]);

  const addField = () => {
    setRequestFields([...requestFields, { key: '', type: '', description: '', example: '' }]);
  };

  const updateField = (index: number, name: keyof RequestField, value: string) => {
    const updated = [...requestFields];
    updated[index][name] = value;
    setRequestFields(updated);
  };

  const removeField = (index: number) => {
    const updated = [...requestFields];
    updated.splice(index, 1);
    setRequestFields(updated);
  };

  if (method === 'get') return null;

  return (
    <div className="space-y-2">
      <label className="font-bold block">Request Body</label>
      {requestFields.map((field, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 items-center">
          <input className="input" placeholder="Key" value={field.key} onChange={(e) => updateField(index, 'key', e.target.value)} />
          <input className="input" placeholder="Type" value={field.type} onChange={(e) => updateField(index, 'type', e.target.value)} />
          <input className="input" placeholder="Description" value={field.description} onChange={(e) => updateField(index, 'description', e.target.value)} />
          <input className="input" placeholder="Example" value={field.example} onChange={(e) => updateField(index, 'example', e.target.value)} />
          <button onClick={() => removeField(index)} className="text-red-600">Remove</button>
        </div>
      ))}
      <button onClick={addField} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Field</button>
    </div>
  );
} 
