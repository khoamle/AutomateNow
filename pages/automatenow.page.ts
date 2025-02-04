import { type Locator, type Page } from '@playwright/test';
import { expect,Dialog} from '@playwright/test';

export class Automatenow  {
  page: Page

  readonly javaScriptDelaysButton: Locator;
  readonly formFieldsButton: Locator;
  readonly popupsButton: Locator;
  readonly confirmPopupButton: Locator;
  readonly promptPopupButton: Locator;
  readonly sliderButton: Locator;
  readonly calenderButton: Locator;

  readonly startButton: Locator;
  readonly liftoffTextbox: Locator;
  readonly countdown: Locator;
  readonly nameTextField: Locator;
  readonly passwordTextField: Locator;
  readonly checkboxes: Locator;
  readonly radios: Locator;
  readonly selector: Locator;
  readonly dropDownSelector: Locator;
  readonly emailField: Locator;
  readonly messageBox: Locator;
  readonly submitButton: Locator;
  readonly alertPopup: Locator;
  readonly confirmPopupText: Locator;
  readonly promptResult: Locator;
  readonly toolTip: Locator;
  readonly toolTipText: Locator;
  readonly slider: Locator;
  readonly openCalendar: Locator;
  readonly submitCalenderButton: Locator;
  readonly calendarDate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.javaScriptDelaysButton = page.getByRole('link', { name: 'JavaScript Delays' });
    this.formFieldsButton = page.getByRole('link', { name: 'Form Fields' });
    this.popupsButton = page.getByRole('link', { name: 'Popups' });
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.sliderButton = page.getByRole('link', { name: 'Sliders' });
    this.calenderButton = page.getByRole('link', { name: 'Calendars' });

    this.liftoffTextbox = page.locator('#delay');
    this.nameTextField = page.getByTestId('name-input');
    this.passwordTextField = page.getByLabel('Password');
    this.checkboxes = page.locator('input[type="checkbox"]');
    this.radios = page.locator('input[type="radio"]');
    this.dropDownSelector = page.getByTestId('automation')
    this.emailField = page.getByTestId('email');
    this.messageBox = page.getByTestId('message');
    this.submitButton = page.getByTestId('submit-btn');
    this.alertPopup = page.locator('#alert');
    this.confirmPopupButton =page.getByRole('button', {name: 'Confirm Popup'});
    this.confirmPopupText = page.locator('#confirmResult');
    this.promptPopupButton =page.getByRole('button', {name: 'Prompt Popup'});
    this.promptResult = page.locator('#promptResult');
    this.toolTip = page.locator('.tooltip_1');
    this.toolTipText = page.locator("#myTooltip");
    this.slider = page.locator('input[type="range"]');

    this.openCalendar = page.getByLabel('Select or enter a date (YYYY-');
    this.submitCalenderButton = page.getByRole('button', { name: 'Submit' });
    this.calendarDate = page.locator(".field-value");
  }

  async FillUserInfo(name: string, password: string){
    await this.nameTextField.click();
    await this.nameTextField.clear();
    await this.nameTextField.fill(name);
    await this.passwordTextField.click();
    await this.passwordTextField.clear();
    await this.passwordTextField.fill(password);
  }

  async SelectSingleFavoriteDrink(choice: string, page: Page){
    const checkbox = await page.$(`input[type="checkbox"][value="${choice}"]`);
    if(checkbox){
      const isChecked = await checkbox.isChecked()
      if(!isChecked){
        await checkbox.check()
      }
    }
  }

  async SelectAllFavoriteDrinks(){
    const checkboxCount = await this.checkboxes.count();
    for(let i = 0; i < checkboxCount; i++){
      const checkbox = this.checkboxes.nth(i);
      await checkbox.check()
    }
  }

  async RandomCheckFunction(selector: Locator){
    const selectorCount = await selector.count()
    if(selectorCount > 0){
      const randomIndex = Math.floor(Math.random() * selectorCount);
      const randomSelector = selector.nth(randomIndex);
      const isChecked = await randomSelector.isChecked();
      if (isChecked) {
        await randomSelector.uncheck();
      } else {
        await randomSelector.check();
      }
    }
  }
  
  async AutomationDropdownSelection(choice: string, page: Page){
    const dropDownSelector = 'select#automation';
    await page.selectOption(dropDownSelector, { value: choice})
  }

  async AutomationDropdownRandomSelection(){
    const options = await this.dropDownSelector.locator('option').allTextContents();
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];
    await this.dropDownSelector.selectOption({ value: randomOption.toLowerCase() });
    const selectValue = await this.dropDownSelector.inputValue()
    expect(selectValue).toEqual(randomOption.toLowerCase())
  }

  async handleDialog(dialog: Dialog){
    if (dialog.type() === 'alert') {
      expect(dialog.message()).toContain('Hi there, pal!');
      await dialog.accept();
    } else if (dialog.type() === 'confirm') {
      await dialog.accept()
    } else if (dialog.type() === 'prompt'){
      await dialog.accept('Joe Smith');
    }
  }

  async handleCalendar(){
    const randomDay = Math.floor(Math.random()* 31) + 1;
    await this.page.locator(`a[data-date="${randomDay}"]`).click();
    await this.submitCalenderButton.click();
  }

}