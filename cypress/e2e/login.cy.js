/// <reference types="cypress" />

import altaPage from "../pages/alta";
import { faker } from "@faker-js/faker";

const email = faker.internet.email()
const password = faker.internet.password() 


Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Testing website shopping", () => {
  beforeEach(() => {
    cy.visit("https://alta-shop.vercel.app/auth/login");
    cy.viewport(1600, 900);
  });

  it("Should be able to login with valid data",() =>{
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getProductCard().should("be.visible")
  })

  it("Should not be able to login with invalid email",() =>{
    cy.get('input[type="text"]').eq(0).type(email).should("have.value", email)
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getAlert().contains('record not found').should("be.visible")
  })

  it("Should not be able to login with invalid password",() =>{
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(1).type(password).should("have.value", password)
    altaPage.getButton().click()
    altaPage.getAlert().contains('email or password is invalid').should("be.visible")
  })

  it("Should not be able to login with empty password",() =>{
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    altaPage.getButton().click()
    altaPage.getAlert().contains('password is required').should("be.visible")
  })

  it("Should not be able to login with empty email",() =>{
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('email is required').should("be.visible")
  })
});
