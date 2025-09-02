import { Page, Locator } from "@playwright/test";

export class PaginaRegistro {
  readonly page: Page;
  readonly nombreInput: Locator;
  readonly apellidoInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly botonRegistrarse: Locator;
  readonly mensajeCreacionExitosa: string;
  readonly mensajeEmailUtilizado: string;

  constructor(page: Page) {
    this.page = page;
    this.nombreInput = page.getByRole("textbox", { name: "Nombre" });
    this.apellidoInput = page.getByRole("textbox", { name: "Apellido" });
    this.emailInput = page.getByRole("textbox", { name: "Correo electrónico" });
    this.passwordInput = page.getByRole("textbox", { name: "Contraseña" });
    this.botonRegistrarse = page.getByTestId("boton-registrarse");

    this.mensajeCreacionExitosa = "Registro exitoso!";
    this.mensajeEmailUtilizado = "Email already in use";
  }

  async visitarPaginaRegistro() {
    await this.page.goto("http://localhost:3000/signup");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async completarFormularioRegistro(
    nombre: string,
    apellido: string,
    email: string,
    password: string
  ) {
    await this.nombreInput.fill(nombre);
    await this.apellidoInput.fill(apellido);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
  async enviarFormularioRegistro() {
    await this.botonRegistrarse.click();
  }

  async registrarUsuario(
    nombre: string,
    apellido: string,
    email: string,
    password: string
  ) {
    await this.completarFormularioRegistro(nombre, apellido, email, password);
    await this.enviarFormularioRegistro();
  }
}
