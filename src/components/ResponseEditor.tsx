import React from 'react';
import type { Response } from '../types/swagger';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaDeleteLeft } from 'react-icons/fa6';

interface props {
    responses: Response[]
    setResponses: React.Dispatch<React.SetStateAction<Response[]>>
}

export default function ResponseEditor({ responses, setResponses }: props) {

    return (
        <div className="space-y-2 border p-4 rounded">
            <label className="font-bold">Responses</label>
            <div className="flex grid-cols-2 gap-2 items-center font-medium text-sm">
                <span className="w-[80px]">Code</span>
                <span>Description</span>
            </div>
            {responses.map((res, index) => (
                <div key={index} className="flex grid-cols-2 gap-2 items-center">
                    <input
                        className="input w-[80px]"
                        value={res.code}
                        onChange={(e) => {
                            const newList = [...responses];
                            newList[index].code = e.target.value;
                            setResponses(newList);
                        }}
                        placeholder="Code"
                    />
                    <input
                        className="input flex-1"
                        value={res.description}
                        onChange={(e) => {
                            const newList = [...responses];
                            newList[index].description = e.target.value;
                            setResponses(newList);
                        }}
                        placeholder="Description"
                    />
                    <button
                        onClick={() => {
                            const newList = responses.filter((_, i) => i !== index);
                            setResponses(newList);
                        }}
                        className="btn-remove"
                    >
                        <FaDeleteLeft size={20} />
                        <span >
                            Remove
                        </span>
                    </button>
                </div>
            ))}
            <button
                className="btn"
                onClick={() => setResponses([...responses, { code: '', description: '' }])}
                type="button"
            >
                <IoMdAddCircleOutline size={20} />
                <span>Add Response</span>
            </button>
        </div>
    )
}


