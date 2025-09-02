import { Page, Locator } from "@playwright/test";

export class PaginaDashboard {
  readonly page: Page;
  readonly logOutButton: Locator;
  readonly mensajeLogInExitoso: string;

  constructor(page: Page) {
    this.page = page;
    this.logOutButton = page.getByTestId("boton-logout");
    this.mensajeLogInExitoso = "Inicio de sesión exitoso";
  }

  async visitarPaginaDashboard() {
    await this.page.goto("http://localhost:3000/dashboard");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async cerrarSesion() {
    await this.logOutButton.click();
  }
}
