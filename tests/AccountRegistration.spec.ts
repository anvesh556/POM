/*testcase:AccountRegistration
Step1: Navigate to Application URL
Step2: go to my account and click register button
Step3: fill the registration details with the random Data
step4: Agree to privacy policy and submit the format
step5: validate the confirmation button*/


import{test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
test('UserRegistration test', async({page})=>
{
const config= new TestConfig();    
await page.goto(config.appUrl); //navigate the url
//goto my account and click register

const homepage= new HomePage(page);
await homepage.clickMyAccount();
await homepage.clickRegister();
//fill in the registration detail in random data

const registrationpage = new RegistrationPage(page);
//await registrationpage.setFirstName(RandomDataUtil.getFirstName);
//await registrationpage.setLastName(RandomDataUtil.getLastName);

await registrationpage.setFirstName(RandomDataUtil.getFirstName());
await registrationpage.setLastName(RandomDataUtil.getlastName());
await registrationpage.setEmail(RandomDataUtil.getEmail());
await registrationpage.setTelephone(RandomDataUtil.getPhoneNumber());
const password = RandomDataUtil.getPassword();
await registrationpage.setPassword(password);
await registrationpage.setConfirmPassword(password);
await registrationpage.setPrivacyPolicy();
await registrationpage.clickContinue();
//validate the confirmation message
const confirmationMsg = await registrationpage.getConfirmationMsg();
expect(confirmationMsg).toContain('Your Account Has Been Created!');


}
);
