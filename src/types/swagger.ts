export interface SwaggerInput {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    tags: string[];
    summary: string;
    description: string;
    requestBody?: Record<string, unknown>;
    responses?: Record<string, unknown>;
}