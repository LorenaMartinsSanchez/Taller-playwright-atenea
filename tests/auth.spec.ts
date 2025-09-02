import { test, expect } from "@playwright/test";
import { PaginaLogin } from "../pages/paginaLogin";
import { PaginaDashboard } from "../pages/paginaDashboard";

let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;

test("T1.1 Login Exitoso y Redirección al Dashboard", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.login("lorena.m@example.com", "12345678");
  await expect(page.getByText(paginaLogin.inicioSesionExitosa)).toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/dashboard");
  await expect(
    page.getByText(paginaDashboard.mensajeLogInExitoso)
  ).toBeVisible();
  await expect(page.getByText("Tablero Principal")).toBeVisible();
});

test("T2.1 Intento de Login con Credenciales Inválidas", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.login("lorena.m@example.com", "1234");
  await expect(
    page.getByText(paginaLogin.mensajeCredencialesInvalidas)
  ).toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/login");
});

test("T2.2 Intento de Login con Email Vacío", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.login("", "12345678");
  const mensaje = await paginaLogin.obtenerMensajeEmailVacio();
  expect(mensaje).toBe("Please fill out this field.");
  await expect(page).toHaveURL("http://localhost:3000/login");
});

test("T2.3 Intento de Login con Email sin Contraseña", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.login("lorena.m@example.com", "");
  const mensaje = await paginaLogin.obtenerMensajeContrasenaVacia();
  expect(mensaje).toBe("Please fill out this field.");
  //await expect(paginaLogin.contrasena).toHaveAttribute("aria-invalid", "false");
});

test("T2.4 Intento de Login con Formato de Email Incorrecto", async ({
  page,
}) => {
  paginaLogin = new PaginaLogin(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.login("lorena.mexample.com", "12345678");
  const mensaje = await paginaLogin.mensajeEmailFormatoIncorrecto();
  expect(mensaje).toBe(
    "Please include an '@' in the email address. 'lorena.mexample.com' is missing an '@'."
  );
});

test("T3.1 Vericación del Enlace de Registro", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.crearCuentaButton.click();
  await expect(page).toHaveURL("http://localhost:3000/signup");
});

test("T3.2 Cierre de Sesión y Protección de Rutas", async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.login("lorena.m@example.com", "12345678");
  await expect(page.getByText(paginaLogin.inicioSesionExitosa)).toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/dashboard");
  await expect(page.getByText("Tablero Principal")).toBeVisible();
  await expect(
    page.getByText(paginaDashboard.mensajeLogInExitoso)
  ).toBeVisible();
  await paginaDashboard.cerrarSesion();
  await expect(page).toHaveURL("http://localhost:3000/login");
  await expect(page.getByText(paginaLogin.mensajeLogOutExitoso)).toBeVisible();
  await paginaDashboard.visitarPaginaDashboard();
  await expect(page).toHaveURL("http://localhost:3000/login");
});
