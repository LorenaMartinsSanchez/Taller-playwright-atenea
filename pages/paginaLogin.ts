import { Page, Locator } from "@playwright/test";

export class PaginaLogin {
  readonly page: Page;
  readonly usuario: Locator;
  readonly contrasena: Locator;
  readonly botonIniciarSesion: Locator;
  readonly inicioSesionExitosa: string;
  readonly mensajeCredencialesInvalidas: string;
  readonly crearCuentaButton: Locator;
  readonly mensajeLogOutExitoso: string;

  constructor(page: Page) {
    this.page = page;
    this.usuario = page.getByRole("textbox", { name: "Correo electrónico" });
    this.contrasena = page.getByRole("textbox", { name: "Contraseña" });
    this.botonIniciarSesion = page.getByTestId("boton-login");
    this.inicioSesionExitosa = "Inicio de sesión exitoso";
    this.mensajeCredencialesInvalidas = "Invalid credentials";
    this.crearCuentaButton = page.getByTestId("boton-signup-header");
    this.mensajeLogOutExitoso = "Sesión cerrada correctamente";
  }
  async visitarPaginaLogin() {
    await this.page.goto("http://localhost:3000/login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async completarFormularioLogin(usuario: string, contrasena: string) {
    await this.usuario.fill(usuario);
    await this.contrasena.fill(contrasena);
  }
  async enviarFormularioLogin() {
    await this.botonIniciarSesion.click();
  }
  async login(usuario: string, contrasena: string) {
    await this.completarFormularioLogin(usuario, contrasena);
    await this.enviarFormularioLogin();
  }

  async obtenerMensajeEmailVacio(): Promise<string> {
    return await this.usuario.evaluate(
      (input: HTMLInputElement) => input.validationMessage
    );
  }
  async obtenerMensajeContrasenaVacia(): Promise<string> {
    return await this.contrasena.evaluate(
      (input: HTMLInputElement) => input.validationMessage
    );
  }
  async mensajeEmailFormatoIncorrecto(): Promise<string> {
    return await this.usuario.evaluate(
      (input: HTMLInputElement) => input.validationMessage
    );
  }
}
