import fs from 'fs';
import { parse } from 'csv-parse/sync';

export type TestDataRow = Record<string, string>;

export class DataProvider {
    static getTestDataFromJson(filePath: string): TestDataRow[] {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent) as TestDataRow[];
        return data;
    }

    static getTestDataFromCsv(filePath: string): TestDataRow[] {
        const data = parse(fs.readFileSync(filePath), {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        }) as TestDataRow[];
        return data;
    }
}