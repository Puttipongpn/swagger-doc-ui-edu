// utils/generateSwaggerJSDoc.ts
import type { SwaggerInput } from "../types/swagger";

interface QueryParam {
    name: string;
    type: string;
    description: string;
    required: boolean;
}

export function generateSwaggerJSDoc(input: SwaggerInput & { queryParams?: QueryParam[] }): string {
    const { path, method, tags, summary, description, requestBody, responses, queryParams = [] } = input;
    const indent = (lines: string[], level = 2) => lines.map(l => ' '.repeat(level) + l).join('\n');

    const hasBodyMethod = ['post', 'put', 'patch'].includes(method.toLowerCase());

    const paramStr = method === 'get' && queryParams.length > 0
        ? `    parameters:\n${indent(queryParams.flatMap(param => ([
            `  - name: ${param.name}`,
            `    in: query`,
            `    description: ${param.description}`,
            `    required: ${param.required}`,
            `    schema:`,
            `      type: ${param.type}`
        ])), 4)}`
        : '';

    const reqBodyStr = hasBodyMethod && requestBody && Object.keys(requestBody).length > 0
        ? `    requestBody:\n${indent([
            `    required: true`,
            `    content:`,
            `      application/json:`,
            `        schema:`,
            `          type: object`,
            `          properties:`,
            ...Object.entries(requestBody).flatMap(
                ([key, val]) => [
                    `            ${key}:`,
                    `              type: ${val.type}`,
                    `              description: ${val.description}`,
                    `              example: ${JSON.stringify(val.example)}`
                ]
            ),
        ])}`
        : '';

    const responseStr = responses
        ? `    responses:\n${indent(
            Object.entries(responses).flatMap(([code, res]) => ([
                `    ${code}:`,
                `      description: ${res.description}`,
                `      content:`,
                `        application/json:`,
                `          schema:`,
                `            type: object`
            ])),
            2
        )}`
        : '';

    return wrapCommentBlock([
        '@swagger',
        `${path}:`,
        `  ${method}:`,
        `    tags:`,
        ...tags.map(tag => `      - ${tag}`),
        `    summary: ${summary}`,
        `    description: ${description}`,
        ...(paramStr ? paramStr.split('\n') : []),
        ...(reqBodyStr ? reqBodyStr.split('\n') : []),
        ...(responseStr ? responseStr.split('\n') : []),
    ]);
}

function wrapCommentBlock(lines: string[]): string {
    return ['/**', ...lines.map(line => ` * ${line}`), ' */'].join('\n');
}
