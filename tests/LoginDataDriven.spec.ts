import path from 'path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

//Load JSON test data logindata.json
const jsonPath = path.resolve(__dirname, '../data/logindata.json');
const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);


for(const data of jsonTestData)
{
   test(`Login Test with JSON Data: ${data.testName} @datadriven`, async({page})=>{

        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }
        else{
            const errorMessage=await loginPage.getloginErrorMessage();
            expect(errorMessage).toMatch(/Warning: No match|exceeded allowed number of login attempts/i);
        }
    })

}



//Load CSV test data logindata.csv
const csvPath = path.resolve(__dirname, '../data/logindata.csv');
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);


for(const data of csvTestData)
{
   test(`Login Test with CSV Data: ${data.testName} @datadriven`, async({page})=>{

        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }
        else{
            const errorMessage=await loginPage.getloginErrorMessage();
            expect(errorMessage).toMatch(/Warning: No match|exceeded allowed number of login attempts/i);
        }
    })

}