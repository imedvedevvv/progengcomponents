import { strict as assert } from 'assert';
import { Builder, By, until } from 'selenium-webdriver';
import { XPathLocatorForInput, generateUser } from './utils';

const driver = new Builder().forBrowser('chrome').build();

(async () => {
  // open login modal
  await driver.get('https://kubanutyi.herokuapp.com/');
  assert.equal(
    await driver.getCurrentUrl(),
    'https://kubanutyi.herokuapp.com/',
  );
  assert.equal(await driver.getTitle(), 'Кубанутый');
  const signInButton = await driver.findElement(By.linkText('Войти'));
  await signInButton.click();
  // open sign up modal
  const modal = await driver.findElement(By.className('modal-dialog'));
  const signUpRedirectButton = await modal.findElement(
    By.className('btn btn-link'),
  );
  await signUpRedirectButton.click();
  // check items on this modal
  const heading = driver.findElement(By.className('modal-title'));
  assert.equal((await heading.getText()).trim(), 'Регистрация');

  const modalCardBody = await driver.findElement(By.className('card-body'));
  const firstNameInput = modalCardBody.findElement(
    XPathLocatorForInput('first_name'),
  );

  const lastNameInput = modalCardBody.findElement(
    XPathLocatorForInput('last_name'),
  );

  const loginInput = modalCardBody.findElement(XPathLocatorForInput('login'));

  const passwordInput = modalCardBody.findElement(
    XPathLocatorForInput('password'),
  );

  const passwordRepeatInput = modalCardBody.findElement(
    XPathLocatorForInput('passwordRepeat'),
  );

  const user = generateUser();
  // left here to login later to validate the registration
  console.log('user:', user);

  firstNameInput.sendKeys(user.firstName);
  lastNameInput.sendKeys(user.lastName);
  loginInput.sendKeys(user.login);
  passwordInput.sendKeys(user.password);
  // test blur 
  passwordRepeatInput.sendKeys(`${user.password} equality error`);
  driver.executeScript(
    "arguments[0].dispatchEvent(new Event('blur'))",
    passwordRepeatInput,
  );
  assert.match(await passwordRepeatInput.getAttribute('class'), /ng-invalid/);
  const submitButton = modalCardBody.findElement(By.id('submit'));
  assert.equal(await submitButton.getAttribute('disabled'), 'true');
  //
  passwordRepeatInput.clear();
  passwordRepeatInput.sendKeys(user.password);
  //
  assert.equal(await submitButton.getText(), 'Зарегестрироватся');
  assert.equal(await submitButton.getAttribute('disabled'), null);

  submitButton.click();
  
  await driver.wait(() => until.elementIsNotVisible(modalCardBody), 2000);
  // i know that's it's not he best solution
  await driver.sleep(500);

  const successAlert = driver.findElement(By.className('alert alert-success alert-dismissable'));

  driver.wait(() => until.elementIsNotVisible(successAlert), 2000);
})();
