/// <reference types="cypress" />

describe("Testing API Alta", () => {
  it("test api hello", () => {
    cy.request("GET", "https://altashop-api.fly.dev/api/hello").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data", "hello");
    });
  });
});