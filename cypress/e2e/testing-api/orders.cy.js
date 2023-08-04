/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Testing API Alta", () => {
  let token = "";
  let productId = "";
  let productName = "";
  let productDesc = "";
  let productPrice = "";
  let orderId = "";
  let orderQuantity = ""

  before(() => {
    cy.request("POST", "https://altashop-api.fly.dev/api/auth/login", {
      email: "diananggun@gmail.com",
      password: "test1234",
    }).then((response) => {
      token = response.body.data;
    });
  });

  it("should be able to create new product", () => {
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 400,
      categories: [1],
    };

    cy.request({
      method: "POST",
      url: "https://altashop-api.fly.dev/api/products",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: product,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("ID");
      expect(response.body.data.ID).to.be.a("number");
      expect(response.body.data).to.deep.contains({
        Name: product.name,
        Description: product.description,
        Price: product.price,
      });
      productId = response.body.data.ID;
      productName = response.body.data.Name;
      productDesc = response.body.data.Description;
      productPrice = response.body.data.Price;
    });
  });


  it("should be able to create new order", () => {
    const order = [{
        product_id: productId,
        quantity: faker.number.int({ min:1, max: 10 }),
    }];

    cy.request({
      method: "POST",
      url: "https://altashop-api.fly.dev/api/orders",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: order,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      response.body.data.forEach((order) => {
      expect(order).to.have.all.keys("ID", "Product", "User", "Quantity");
      expect(order).to.deep.contains({
        Quantity: order.Quantity,
      });
      orderId = order.ID;
      orderQuantity = order.Quantity;

    });
    cy.log(orderId)
    cy.log(orderQuantity)
    });
  });

  it("should be able to get all orders", () => {
    cy.request({
      method: "GET",
      url: "https://altashop-api.fly.dev/api/orders",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      response.body.data.forEach((order) => {
        expect(order).to.have.all.keys("Product", "Price", "Quantity", "Subtotal");
      });
    });
  });

  it("should be able to get order by ID", () => {
    cy.request({
      method: "GET",
      url: `https://altashop-api.fly.dev/api/orders/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.all.keys("ID", "Product", "User", "Quantity");
      expect(response.body.data).to.deep.contains({
        ID: orderId,
        Quantity: orderQuantity,
      });
    });
  });


});