/// <reference types="cypress" />

import altaPage from "../pages/alta";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Testing website shopping", () => {
  beforeEach(() => {
    cy.visit("https://alta-shop.vercel.app/");
    cy.viewport(1600, 900)
  });

  it("Should have 22 product card", () => {
    altaPage.getProductCard().should("have.length" ,22)
  } )

  it("Should be able to show each detail product", () => {
    cy.wait(1000)
    altaPage.getDetail().eq(0).click()
    cy.url().should("include", "/products");
    altaPage.getDetailProduct().should("be.visible")
  } )

  it.only("Should be able to show each detail product", () => {
    cy.wait(1000)
    altaPage.getDetail().each(($el, index, $list) => {
      cy.wrap($el).click().then(() => {
        cy.url().should("include", "/products");
        cy.get('.v-card__text').should("be.visible");
        cy.go('back');
      });
    });
  } )

 
});
