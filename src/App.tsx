import { useState } from 'react';
import InputForm from './components/InputForm';
import CodePreview from './components/CodePreview';
import { generateSwaggerJSDoc } from './utils/generator';
import type { SwaggerInput } from './types/swagger';

function App() {
  const [doc, setDoc] = useState('');

  const handleGenerate = (input: SwaggerInput) => {
    const code = generateSwaggerJSDoc(input);
    setDoc(code);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-xl font-bold mb-4">Swagger Doc Input</h1>
        <InputForm onGenerate={handleGenerate} />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4">Generated JSDoc</h1>
        <CodePreview code={doc} />
      </div>
    </div>
  );
}

export default App;
