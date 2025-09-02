import { test, expect } from "@playwright/test";
import { PaginaRegistro } from "../pages/paginaRegistro";

let paginaRegistro: PaginaRegistro;

test("Registro exitoso", async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  const randomEmail = `lorena-${Math.random()
    .toString(36)
    .substring(2, 15)}@example.com`;

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario(
    "Lorena",
    "Martins",
    randomEmail,
    "12345678"
  );
  await expect(
    page.getByText(paginaRegistro.mensajeCreacionExitosa)
  ).toBeVisible();
});

test("Registro no exitoso", async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  const randomEmail = `lorena-${Math.random()
    .toString(36)
    .substring(2, 15)}@example.com`;

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario(
    "Lorena",
    "Martins",
    "lorena.m@example.com",
    "12345678"
  );
  await expect(
    page.getByText(paginaRegistro.mensajeEmailUtilizado)
  ).toBeVisible();
});

test("Registro usuario fijo", async ({ page }) => {
  paginaRegistro = new PaginaRegistro(page);
  const randomEmail = `lorena-${Math.random()
    .toString(36)
    .substring(2, 15)}@example.com`;

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario(
    "Lorena",
    "Martins",
    "lorena.m@example.com",
    "12345678"
  );
  await expect(
    page.getByText(paginaRegistro.mensajeCreacionExitosa)
  ).toBeVisible();
});
