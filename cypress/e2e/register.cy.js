/// <reference types="cypress" />

import altaPage from "../pages/alta";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Testing website shopping", () => {
  beforeEach(() => {
    cy.visit("https://alta-shop.vercel.app/");
    cy.viewport(1600, 900);
  });

  it("Should be able to register with valid data",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    altaPage.getRegister().click()
    cy.url().should("include", "/register");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("NAMA")).should("have.value", Cypress.env("NAMA"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(2).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    cy.url().should("include", "/login");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
  })

  it("Should not be able to register with duplicate email" ,() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    altaPage.getRegister().click()
    cy.url().should("include", "/register");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("NAMA")).should("have.value", Cypress.env("NAMA"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(2).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('ERROR: duplicate key value violates unique constraint "users_email_key" (SQLSTATE 23505)').should("be.visible")
  })

  it("Should not be able to register with empty name" ,() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    altaPage.getRegister().click()
    cy.url().should("include", "/register");
    cy.get('input[type="text"]').eq(1).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(2).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('fullname is required').should("be.visible")
  })

  it("Should not be able to register with empty email",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    altaPage.getRegister().click()
    cy.url().should("include", "/register");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("NAMA")).should("have.value", Cypress.env("NAMA"))
    cy.get('input[type="text"]').eq(2).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('email is required').should("be.visible")
  })


  it("Should not be able to register with empty password",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    altaPage.getRegister().click()
    cy.url().should("include", "/register");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("NAMA")).should("have.value", Cypress.env("NAMA"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('password is required').should("be.visible")
  })

  it("Should be able to login with valid data",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getProductCard().should("be.visible")
  })

  it("Should not be able to login with invalid email",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("INVALID_EMAIL")).should("have.value", Cypress.env("INVALID_EMAIL"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('record not found').should("be.visible")
  })

  it("Should not be able to login with invalid password",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("INVALID_PASSWORD")).should("have.value", Cypress.env("INVALID_PASSWORD"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('email or password is invalid').should("be.visible")
  })

  it("Should not be able to login with empty password",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('password is required').should("be.visible")
  })

  it("Should not be able to login with empty email",() =>{
    altaPage.getAccount().click()
    cy.url().should("include", "/login");
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD")).should("have.value", Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('email is required').should("be.visible")
  })
});
