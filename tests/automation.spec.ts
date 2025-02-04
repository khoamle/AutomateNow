import { test, expect, Page} from '@playwright/test';
import { Automatenow } from '../pages/automatenow.page';
import { faker } from '@faker-js/faker';

const fakeName = faker.person.firstName('male');
const fakePassword = faker.internet.password({length: 20});
const fakeEmail = faker.internet.email({firstName: 'JohnDoe'})
const fakeMessage = faker.lorem.sentences()



test.beforeEach(async({page})=>{
    await page.goto('https://practice-automation.com/');
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
  await automateNow.RandomCheckFunction(automateNow.checkboxes)
  await automateNow.RandomCheckFunction(automateNow.radios)
  await automateNow.AutomationDropdownSelection('undecided', page);
  await automateNow.AutomationDropdownRandomSelection();
  await automateNow.emailField.fill(fakeEmail)
  await automateNow.messageBox.fill(fakeMessage)
  await automateNow.submitButton.click();
}); 

test('Popups', async({page})=> {
  const automateNow = new Automatenow(page);
  await automateNow.popupsButton.click();
  page.on('dialog', async dialog => {
    await automateNow.handleDialog(dialog)
  })
  await automateNow.alertPopup.click();
  await automateNow.confirmPopupButton.click();
  await expect(automateNow.confirmPopupText).toContainText("OK it is!");
  await automateNow.promptPopupButton.click();
  await expect(automateNow.promptResult).toContainText("Nice to meet you, Joe Smith!")
  await automateNow.toolTip.hover();
  await automateNow.toolTip.click();
  await expect(automateNow.toolTipText).toBeVisible();
  await expect(automateNow.toolTipText).toHaveText('Cool text')
});

test('Slider form', async({page})=>{
  const automateNow = new Automatenow(page);
  await automateNow.sliderButton.click()
  expect(await automateNow.slider.inputValue()).toBe('25')
  await automateNow.slider.fill('50');
  expect(await automateNow.slider.inputValue()).toBe('50')
  await automateNow.slider.fill('60');
  expect(await automateNow.slider.inputValue()).toBe('60')
});

test('Calendar', async({page})=>{
  const automateNow = new Automatenow(page);
  await automateNow.calenderButton.click()
  await automateNow.openCalendar.click()
  await automateNow.handleCalendar();
});

