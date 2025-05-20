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

  return `/**\n * @swagger\n * ${path}:\n *   ${method}:\n *     tags:\n${indent(tags.map(tag => `- ${tag}`), 6)}\n *     summary: ${summary}\n *     description: ${description}\n${reqBodyStr ? ' *     ' + reqBodyStr.replace(/\n/g, '\n *     ') : ''}\n${responseStr ? ' *     ' + responseStr.replace(/\n/g, '\n *     ') : ''}\n */`;
}