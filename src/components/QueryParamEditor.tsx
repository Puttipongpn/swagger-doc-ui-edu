import { useState, useEffect } from 'react';
import type { QueryParam } from "../types/swagger";
import { FaDeleteLeft } from 'react-icons/fa6';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface Props {
  method: string;
  onUpdate: (params: QueryParam[]) => void;
}

export default function QueryParamEditor({ method, onUpdate }: Props) {
  const [params, setParams] = useState<QueryParam[]>([]);

  useEffect(() => {
    onUpdate(params);
  }, [onUpdate, params]);

  if (method !== 'get') return null;

  const updateParam = (index: number, name: keyof QueryParam, value: string | boolean) => {
    const newParams = [...params];
    newParams[index][name] = value as never;
    setParams(newParams);
  };

  const addParam = () => {
    setParams([...params, { name: '', type: 'string', description: '', required: false }]);
  };

  const removeParam = (index: number) => {
    const newParams = [...params];
    newParams.splice(index, 1);
    setParams(newParams);
  };

  return (
    <div className="space-y-2 border p-4 rounded">
      <label className="font-bold block">Query Parameters</label>
      {params.map((param, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 items-center">
          <input className="input" placeholder="Name" value={param.name} onChange={(e) => updateParam(index, 'name', e.target.value)} />
          <input className="input" placeholder="Type" value={param.type} onChange={(e) => updateParam(index, 'type', e.target.value)} />
          <input className="input" placeholder="Description" value={param.description} onChange={(e) => updateParam(index, 'description', e.target.value)} />
          <label className="flex items-center">
            <input type="checkbox" className='mx-1.5' checked={param.required} onChange={(e) => updateParam(index, 'required', e.target.checked)} /> Required
          </label>
          <button onClick={() => removeParam(index)} className="btn-remove">
            <FaDeleteLeft size={20} />
            <span >
              Remove
            </span>
          </button>
        </div>
      ))}
      <button onClick={addParam} className="btn" type="button">
        <IoMdAddCircleOutline size={20} />
        <span>Add Response</span>
      </button>
    </div>
  );
}