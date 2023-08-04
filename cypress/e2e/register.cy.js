/// <reference types="cypress" />

import altaPage from "../pages/alta";
import { faker } from "@faker-js/faker";

const name = faker.name.firstName()
const email = faker.internet.email()
const password = faker.internet.password() 


Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Testing website shopping", () => {
  beforeEach(() => {
    cy.visit("https://alta-shop.vercel.app/auth/register");
    cy.viewport(1600, 900);
  });


  it("Should be able to register with valid data",() =>{
    cy.get('input[type="text"]').eq(0).type(name).should("have.value", name)
    cy.get('input[type="text"]').eq(1).type(email).should("have.value", email)
    cy.get('input[type="text"]').eq(2).type(password).should("have.value", password)
    altaPage.getButton().click()
    cy.url().should("include", "/login");
  })

  it("Should not be able to register with register email" ,() =>{
    cy.get('input[type="text"]').eq(0).type(name).should("have.value", name)
    cy.get('input[type="text"]').eq(1).type(Cypress.env("EMAIL")).should("have.value", Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(2).type(password).should("have.value", password)
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('ERROR: duplicate key value violates unique constraint "users_email_key" (SQLSTATE 23505)').should("be.visible")
  })

  it("Should not be able to register with empty name" ,() =>{
    cy.get('input[type="text"]').eq(1).type(email).should("have.value", email)
    cy.get('input[type="text"]').eq(2).type(password).should("have.value", password)
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('fullname is required').should("be.visible")
  })

  it("Should not be able to register with empty email",() =>{
    cy.get('input[type="text"]').eq(0).type(name).should("have.value", name)
    cy.get('input[type="text"]').eq(2).type(password).should("have.value", password)
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('email is required').should("be.visible")
  })


  it("Should not be able to register with empty password",() =>{
    cy.get('input[type="text"]').eq(0).type(name).should("have.value", name)
    cy.get('input[type="text"]').eq(1).type(email).should("have.value", email)
    altaPage.getButton().click()
    altaPage.getButton().click()
    altaPage.getAlert().contains('password is required').should("be.visible")
  })

});
