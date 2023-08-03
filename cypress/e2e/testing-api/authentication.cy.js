/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Testing API Alta", () => {
  let token = "";

  it("should be able to register", () => {
    const person = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    cy.request("POST", "https://altashop-api.fly.dev/api/auth/register", person).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("ID");
      expect(response.body.data.ID).to.be.a("number");
      // expect(response.body.data.password).to.be.undefined;
      expect(response.body.data).to.deep.contains({
        Fullname: person.fullname,
        Email: person.email,
        Password: person.password,
      });
    });
  });

  it("should be able to login", () => {
    cy.request("POST", "https://altashop-api.fly.dev/api/auth/login", {
      email: "diananggun@gmail.com",
      password: "test1234",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.a("string");
      token = response.body.data;
    });
  });

  it("should get auth information", () => {
    cy.request({
      method: "GET",
      url: "https://altashop-api.fly.dev/api/auth/info",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("ID");
      expect(response.body.data).to.deep.contains({
        Fullname: "Dian",
        Email: "diananggun@gmail.com",
      });
    });
  });

  it("should not be able to get auth information without token", () => {
    cy.request({
      method: "GET",
      url: "https://altashop-api.fly.dev/api/auth/info",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property("error", "unauthorized");
    });
  });
});