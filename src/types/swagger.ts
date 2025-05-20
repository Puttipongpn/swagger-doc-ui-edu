export interface SwaggerSchemaProperty {
    type: string;
    description: string;
    example?: string | number | boolean;
  }
  
  export interface SwaggerResponse {
    description: string;
  }
  
  export interface SwaggerInput {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    tags: string[];
    summary: string;
    description: string;
    requestBody?: Record<string, SwaggerSchemaProperty>;
    responses?: Record<string, SwaggerResponse>;
  }

  export interface QueryParam {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }
  