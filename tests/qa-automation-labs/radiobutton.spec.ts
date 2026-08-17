import { test, expect } from "../../fixtures/qa-automation-labs/fixtures"

test.describe("Radio Button Flow", () => {
    test("Radio Button Flow", async ({ page, menusPage, radioButtonPage }) => {
        await page.goto('https://testing.qaautomationlabs.com/');
        await menusPage.testingMenu.click();
        await expect(menusPage.dashboardBanner).toBeVisible();
        await radioButtonPage.radioButtonMenu.click();

        await test.step("Gender Radio button section", async () => {
            await expect(radioButtonPage.genderRadioButtonSingle('male')).not.toBeChecked();
            await expect(radioButtonPage.genderRadioButtonSingle('female')).not.toBeChecked();
            await radioButtonPage.genderRadioButtonSingle('female').check();
            await expect(radioButtonPage.genderRadioButtonSingle('female')).toBeChecked();
            await expect(radioButtonPage.genderRadioButtonSingle('male')).not.toBeChecked();
            await radioButtonPage.showGenderButton.click();
            await expect(radioButtonPage.selectedGender).toHaveText(/You selected: Female/);

            await radioButtonPage.genderRadioButtonSingle('male').check();
            await expect(radioButtonPage.genderRadioButtonSingle('male')).toBeChecked();
            await expect(radioButtonPage.genderRadioButtonSingle('female')).not.toBeChecked();
            await radioButtonPage.showGenderButton.click();
            await expect(radioButtonPage.selectedGender).toHaveText(/You selected: Male/);
        })

        await test.step("Disabled Radio Button section", async () => {
            await expect(radioButtonPage.radioButtons(1)).toBeEnabled();
            await expect(radioButtonPage.radioButtons(2)).toBeEnabled();

            await radioButtonPage.radioButtons(1).check();
            await expect(radioButtonPage.radioButtons(1)).toBeChecked();
            await expect(radioButtonPage.radioButtons(2)).not.toBeChecked();

            await radioButtonPage.radioButtons(2).check();
            await expect(radioButtonPage.radioButtons(2)).toBeChecked();
            await expect(radioButtonPage.radioButtons(1)).not.toBeChecked();

            await expect(radioButtonPage.disabledRadioButton).toBeDisabled();
        })

        await test.step("Gender and Age section", async () => {
            await radioButtonPage.genderInComboSection('female').check();
            await expect(radioButtonPage.genderInComboSection('female')).toBeChecked();
            await expect(radioButtonPage.genderInComboSection('male')).not.toBeChecked();

            await radioButtonPage.ageInComboSection('radio-age-18-35').check();
            await expect(radioButtonPage.ageInComboSection('radio-age-18-35')).toBeChecked();
            await expect(radioButtonPage.ageInComboSection('radio-age-35-plus')).not.toBeChecked();
            await expect(radioButtonPage.ageInComboSection('radio-age-under-18')).not.toBeChecked();

            await radioButtonPage.showSelectedValues.click();
            await expect(radioButtonPage.comboResultMessage).toBeVisible();

        })

    });
});
