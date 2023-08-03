/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Testing API Alta", () => {
  let token = "";
  let categoryId = "";
  let categoryName = "";
  let categoryDesc = "";

  before(() => {
    cy.request("POST", "https://altashop-api.fly.dev/api/auth/login", {
      email: "diananggun@gmail.com",
      password: "test1234",
    }).then((response) => {
      token = response.body.data;
    });
  });

  it("should be able to create a category", () => {
    const category = {
      name: faker.vehicle.model(),
      description: faker.commerce.productDescription(),
    };

    cy.request({
      method: "POST",
      url: "https://altashop-api.fly.dev/api/categories",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: category,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("ID");
      expect(response.body.data.ID).to.be.a("number");
      expect(response.body.data).to.deep.contains({
        Name: category.name,
        Description: category.description,
      });
      categoryId = response.body.data.ID;
      categoryName = response.body.data.Name;
      categoryDesc = response.body.data.Description;
    });
  });

  it("should be able to get category by id", () => {
    cy.request({
      method: "GET",
      url: `https://altashop-api.fly.dev/api/categories/${categoryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.deep.contains({
        ID: categoryId,
        Name: categoryName,
        Description: categoryDesc,
      });
    });
  });

    it("should be able to get all categories", () => {
    cy.request({
      method: "GET",
      url: "https://altashop-api.fly.dev/api/categories",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      response.body.data.forEach((category) => {
        expect(category).to.have.all.keys("ID", "Name", "Description");
      });
    });
  });

  it("should be able to delete category", () => {
    cy.request({
      method: "DELETE",
      url: `https://altashop-api.fly.dev/api/categories/${categoryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.null;
    });
  });

});