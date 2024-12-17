import { test, expect, Page} from '@playwright/test';
import { Automatenow } from '../pages/automatenow.page';
import { faker } from '@faker-js/faker';

const fakeName = faker.person.firstName('male');
const fakePassword = faker.internet.password({length: 20});
const fakeEmail = faker.internet.email({firstName: 'JohnDoe'})
const fakeMessage = faker.lorem.sentences()

test.beforeEach(async({page})=>{
    await page.goto('/');
});

test('has title', async({page})=>{
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Learn and Practice Automation | automateNow/)
});

test('Javascript Delays', async ({ page }) => {
  const automateNow = new Automatenow(page);
  await automateNow.javaScriptDelaysButton.click();
  await automateNow.startButton.click();
  await expect(automateNow.liftoffTextbox).toHaveValue('Liftoff!', {timeout: 11000});
});

test('Form Fields', async ({ page }) => {
  const automateNow = new Automatenow(page);
  await automateNow.formFieldsButton.click();
  await automateNow.FillUserInfo(fakeName, fakePassword);
  await automateNow.SelectSingleFavoriteDrink("Milk", page);
  await expect(automateNow.checkboxes.filter({hasText: 'Milk'})).toBeChecked;
  await automateNow.SelectAllFavoriteDrinks();
  await automateNow.SelectRandomFavoriteDrinks();
  await automateNow.SelectRandomColor()
  await automateNow.AutomationDropdownSelection('undecided', page)
  await automateNow.AutomationDropdownRandomSelection()
  await automateNow.FillEmail(fakeEmail)
}); 

