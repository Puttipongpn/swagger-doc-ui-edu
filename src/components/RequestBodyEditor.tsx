import { useEffect, useState } from 'react';
import type { SwaggerSchemaProperty } from '../types/swagger';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaDeleteLeft } from "react-icons/fa6";

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
  }, [requestFields]);

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
    <div className="space-y-2 border p-4 rounded ">
      <label className="font-bold block">Request Body</label>
      <div className="grid grid-cols-5 gap-2 font-medium text-sm">
        <span>Key</span>
        <span>Type</span>
        <span>Description</span>
        <span>Example</span>
      </div>
      {requestFields.map((field, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 items-center ">
          <input className="input" placeholder="Key" value={field.key} onChange={(e) => updateField(index, 'key', e.target.value)} />
          <input className="input" placeholder="Type" value={field.type} onChange={(e) => updateField(index, 'type', e.target.value)} />
          <input className="input" placeholder="Description" value={field.description} onChange={(e) => updateField(index, 'description', e.target.value)} />
          <input className="input" placeholder="Example" value={field.example} onChange={(e) => updateField(index, 'example', e.target.value)} />
          <button
            type="button"
            onClick={() => removeField(index)}
            className="btn-remove "
            title="Remove field"
          >
            <FaDeleteLeft size={20} />
            <span >
              Remove
            </span>
          </button>
        </div>
      ))}
      <button onClick={addField} className="btn">
        <IoMdAddCircleOutline size={20} />
        <span>
          Add Field
        </span>
      </button>
    </div >
  );
} 
