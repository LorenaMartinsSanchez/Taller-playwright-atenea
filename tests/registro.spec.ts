import { test, expect } from "@playwright/test";
import { PaginaRegistro } from "../pages/paginaRegistro";

let paginaRegistro: PaginaRegistro;

test("Registro exitoso", async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  const randomEmail = `lorena-${Math.random()
    .toString(36)
    .substring(2, 15)}@example.com`;
  await page.goto("http://localhost:3000/signup");
  await paginaRegistro.nombreInput.fill("Lorena");
  await page.getByRole("textbox", { name: "Apellido" }).fill("Martins");
  await page
    .getByRole("textbox", { name: "Correo electrónico" })
    .fill(randomEmail);
  await page.getByRole("textbox", { name: "Contraseña" }).fill("12345678");
  await page.getByTestId("boton-registrarse").click();
  await expect(page.getByText("Registro exitoso!")).toBeVisible();
});

test("Registro no exitoso", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");
  await page.getByRole("textbox", { name: "Nombre" }).fill("Lorena");
  await page.getByRole("textbox", { name: "Apellido" }).fill("Martins");
  await page
    .getByRole("textbox", { name: "Correo electrónico" })
    .fill("juan.torres@example.com");
  await page.getByRole("textbox", { name: "Contraseña" }).fill("12345678");
  await page.getByTestId("boton-registrarse").click();
  await expect(page.getByText("Email already in use")).toBeVisible();
});
