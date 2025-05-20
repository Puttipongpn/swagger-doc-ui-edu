import type { SwaggerInput } from "../types/swagger";

export function generateSwaggerJSDoc(input: SwaggerInput): string {
    const { path, method, tags, summary, description, requestBody, responses } = input;
    const indent = (lines: string[], level = 2) => lines.map(l => ' '.repeat(level) + l).join('\n');

    const reqBodyStr = requestBody
        ? `requestBody:\n${indent([
            `required: true`,
            `content:`,
            `  application/json:`,
            `    schema:`,
            `      type: object`,
            `      properties:`,
            ...Object.entries(requestBody).map(
                ([key, val]) => `        ${key}:\n          type: ${val.type}\n          description: ${val.description}\n          example: ${JSON.stringify(val.example)}`
            ),
        ])}`
        : '';

    const responseStr = responses
        ? `responses:\n${indent(
            Object.entries(responses).map(([code, res]) => {
                return `${code}:\n  description: ${res.description}\n  content:\n    application/json:\n      schema:\n        type: object`;
            }),
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
        ...(reqBodyStr ? reqBodyStr.split('\n') : []),
        ...(responseStr ? responseStr.split('\n') : []),
    ]);

}

function wrapCommentBlock(lines: string[]): string {
    return ['/**', ...lines.map(line => ` * ${line}`), ' */'].join('\n');
}