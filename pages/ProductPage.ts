import { Page } from '@playwright/test';

export class ProductPage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}