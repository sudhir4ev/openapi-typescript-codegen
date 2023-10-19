import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { join, resolve } from 'path';
import { execSync } from 'child_process';
import handlebars from 'handlebars';

const { precompile } = handlebars;

export function resolveTemplate(templatePath: string) {
    const source = readFileSync(templatePath).toString();
    const compiled = precompile(source);

    const tempDir = mkdtempSync('template-');
    const tempFilePath = join(tempDir, 'template.js');
    writeFileSync(tempFilePath, `module.exports = ${compiled};`);

    const module = require(resolve(tempFilePath));
    execSync(`rm -rf ${tempDir}`);
    return module;
}
