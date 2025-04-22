import {device, expect, element, by, waitFor} from 'detox';
import fs from 'fs';
import path from 'path';

export async function capture(screenName: string) {
  // 1) take the screenshot (saved to a tmp path)
  const tmpPath = await device.takeScreenshot(screenName);

  // 2) figure out platform (e.g. 'ios' or 'android')
  const platform = device.getPlatform();

  // 3) build a platform‑specific folder under `files/`
  const projectRoot = path.resolve(__dirname, '..');
  const outDir = path.join(projectRoot, 'files', platform);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, {recursive: true});
  }

  // 4) copy the temp file into place
  const destPath = path.join(outDir, `${screenName}.png`);
  fs.copyFileSync(tmpPath, destPath);
}

describe('AuthApp: Signup → Login → Logout flows', () => {
  beforeAll(async () => {
    await device.launchApp({delete: true});
  });

  it('1. Signup: empty → invalid → short pw → success → home', async () => {
    // Go to Signup
    await element(by.id('gotoSignup')).tap();
    await waitFor(element(by.id('signupName')))
      .toBeVisible()
      .withTimeout(5000);
    await capture('01_SignupScreen');

    // empty submit
    await element(by.id('signupButton')).tap();
    await expect(element(by.id('signupError'))).toHaveText(
      'All fields are required',
    );
    await capture('02_Signup_Error_Required');

    // invalid email
    await element(by.id('signupName')).typeText('Test User');
    await element(by.id('signupEmail')).typeText('invalid-email');
    await element(by.id('signupPassword')).typeText('password');
    await element(by.id('signupButton')).tap();
    await expect(element(by.id('signupError'))).toHaveText(
      'Invalid email format',
    );
    await capture('03_Signup_Error_InvalidEmail');

    // short password
    await element(by.id('signupEmail')).clearText();
    await element(by.id('signupEmail')).typeText('test@example.com');
    await element(by.id('signupPassword')).clearText();
    await element(by.id('signupPassword')).typeText('123');
    await element(by.id('signupButton')).tap();
    await expect(element(by.id('signupError'))).toHaveText(
      'Password must be greater than or equal to 6 characters',
    );
    await capture('04_Signup_Error_ShortPassword');

    // successful signup
    await element(by.id('signupPassword')).clearText();
    await element(by.id('signupPassword')).typeText('password');
    await element(by.id('signupButton')).tap();

    // wait for Home
    await waitFor(element(by.id('welcomeText')))
      .toBeVisible()
      .withTimeout(5000);
    await capture('05_Home_After_Signup');
  });

  it('2. Logout → Login: invalid email → bad creds → success', async () => {
    // tap Logout
    await element(by.id('logoutButton')).tap();
    await waitFor(element(by.id('loginButton')))
      .toBeVisible()
      .withTimeout(5000);
    await capture('06_Login_After_Logout');

    // invalid email
    await element(by.id('loginEmail')).typeText('bad-email');
    await element(by.id('loginPassword')).typeText('password');
    await element(by.id('loginButton')).tap();
    await expect(element(by.id('loginError'))).toHaveText(
      'Invalid email format',
    );
    await capture('07_Login_Error_InvalidEmail');

    // wrong creds
    await element(by.id('loginEmail')).clearText();
    await element(by.id('loginEmail')).typeText('test@example.com');
    await element(by.id('loginPassword')).clearText();
    await element(by.id('loginPassword')).typeText('wrongpassword');
    await element(by.id('loginButton')).tap();
    await expect(element(by.id('loginError'))).toHaveText(
      'Incorrect credentials',
    );
    await capture('08_Login_Error_WrongCreds');

    // successful login
    await element(by.id('loginPassword')).clearText();
    await element(by.id('loginPassword')).typeText('password');
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.id('welcomeText')))
      .toBeVisible()
      .withTimeout(5000);
    await capture('09_Home_After_Login');
  });

  it('3. Final logout → back to Login', async () => {
    await element(by.id('logoutButton')).tap();
    await waitFor(element(by.id('loginButton')))
      .toBeVisible()
      .withTimeout(5000);
    await capture('10_Login_Final');
  });
});
