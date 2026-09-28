import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchPageHeader = page.locator('#content h1');
        this.searchProducts = page.locator('h4 a, .product-item h4 a, .product-thumb h4 a');
    }

    private normalizeText(value: string | null): string {
        return (value ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    /**
     * Verify if the search results page exists by checking the header text
     * @returns Promise<boolean> - true if the search results page exists
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            const headerText = await this.searchPageHeader.textContent();
            return this.normalizeText(headerText).includes('search');
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a product exists in the search results by its name
     * @param productName - The name of the product to search for
     * @returns Promise<boolean> - true if the product exists
     */
    async isProductExist(productName: string): Promise<boolean> {
        try {
            const normalizedSearchText = this.normalizeText(productName);
            const count = await this.searchProducts.count();

            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                const title = this.normalizeText(await product.textContent());

                if (title === normalizedSearchText || title.includes(normalizedSearchText)) {
                    return true;
                }
            }
        } catch (error) {
            console.log(`Error checking product existence: ${error}`);
        }
        return false;
    }

    /**
     * Select a product from the search results by its name
     * @param productName - The name of the product to select
     * @returns Promise<ProductPage> - ProductPage instance after selecting the product
     */
    async selectProduct(productName: string): Promise<ProductPage | null> {
        try {
            const normalizedSearchText = this.normalizeText(productName);
            const count = await this.searchProducts.count();

            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                const title = this.normalizeText(await product.textContent());

                if (title === normalizedSearchText || title.includes(normalizedSearchText)) {
                    await product.click();
                    return new ProductPage(this.page);
                }
            }

            console.log(`Product not found: ${productName}`);
        } catch (error) {
            console.log(`Error selecting product: ${error}`);
        }
        return null;
    }

    /**
     * Get count of products in search results
     * @returns Promise<number> - Number of products found
     */
    async getProductCount(): Promise<number> {
        return await this.searchProducts.count();
    }
}