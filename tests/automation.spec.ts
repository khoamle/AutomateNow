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
  expect(automateNow.checkboxes.filter({hasText: 'Milk'})).toBeChecked;
  await automateNow.SelectAllFavoriteDrinks();
  await automateNow.SelectRandomFavoriteDrinks();
  await automateNow.SelectRandomColor();
  await automateNow.AutomationDropdownSelection('undecided', page);
  await automateNow.AutomationDropdownRandomSelection();
  await automateNow.FillEmail(fakeEmail);
  await automateNow.FillMessage(fakeMessage);
  await automateNow.submitButton.click();
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Hello World')
    await dialog.accept();
  })
}); 

test('Popups', async({page})=> {
  const automateNow = new Automatenow(page);
  await automateNow.popupsButton.click();
  // page.on('dialog', async dialog => {
  //   if (dialog.type() === 'alert') {
  //     expect(dialog.message()).toContain('Hi there, pal!');
  //     await dialog.accept();
  //   } else if (dialog.type() === 'confirm') {
  //     await dialog.accept()
  //   }
  // });
  page.on('dialog', async dialog => {
    await automateNow.handleDialog(dialog)
  })
  await automateNow.alertPopup.click();
  await automateNow.confirmPopupButton.click();
  await expect(automateNow.confirmPopupText).toContainText("OK it is!");
  await automateNow.promptPopupButton.click();
  await expect(automateNow.promptResult).toContainText(`Nice to meet you, J`) 
});

