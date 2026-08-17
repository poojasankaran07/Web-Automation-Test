import { test as base } from "@playwright/test";
import MenusPage from "../../pages/qa-automation-labs/menus-page";
import CheckBoxPage from "../../pages/qa-automation-labs/checkbox-page";
import RadioButtonPage from "../../pages/qa-automation-labs/radio-button-page";
import DropdownPage from "../../pages/qa-automation-labs/dropdown-page";
import FormsPage from "../../pages/qa-automation-labs/forms-page";
import WebtablePage from "../../pages/qa-automation-labs/webtable-page";
import IframePage from "../../pages/qa-automation-labs/iframe-page";
import ShadowDomPage from "../../pages/qa-automation-labs/shadow-dom-page";
import DragDropPage from "../../pages/qa-automation-labs/dragdrop-page";
import NotificationPage from "../../pages/qa-automation-labs/notification-page";
import JsAlertPage from "../../pages/qa-automation-labs/js-alert-page";
import DownloadPage from "../../pages/qa-automation-labs/file-download-page";
import FileUploadPage from "../../pages/qa-automation-labs/file-upload-page";

type Pages = {
  menusPage: MenusPage;
  checkBoxPage: CheckBoxPage;
  radioButtonPage: RadioButtonPage;
  dropdownPage: DropdownPage;
  formsPage: FormsPage;
  webtablePage: WebtablePage;
  iframePage: IframePage;
  shadowDomPage: ShadowDomPage;
  dragDropPage: DragDropPage;
  notificationPage: NotificationPage;
  jsAlertPage: JsAlertPage;
  downloadPage: DownloadPage;
  fileUploadPage: FileUploadPage;
};

export const test = base.extend<Pages>({
  menusPage: async ({ page }, use) => {
    await use(new MenusPage(page));
  },

  checkBoxPage: async ({ page }, use) => {
    await use(new CheckBoxPage(page));
  },

  radioButtonPage: async ({ page }, use) => {
    await use(new RadioButtonPage(page));
  },

  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },

  formsPage: async ({ page }, use) => {
    await use(new FormsPage(page));
  },

  webtablePage: async ({ page }, use) => {
    await use(new WebtablePage(page));
  },

  iframePage: async ({ page }, use) => {
    await use(new IframePage(page));
  },

  shadowDomPage: async ({ page }, use) => {
    await use(new ShadowDomPage(page));
  },

  dragDropPage: async ({ page }, use) => {
    await use(new DragDropPage(page));
  },

  notificationPage: async ({ page }, use) => {
    await use(new NotificationPage(page));
  },

  jsAlertPage: async ({ page }, use) => {
    await use(new JsAlertPage(page));
  },

  downloadPage: async ({ page }, use) => {
    await use(new DownloadPage(page));
  },

  fileUploadPage: async ({ page }, use) => {
    await use(new FileUploadPage(page));
  },
});

export { expect } from "@playwright/test";
