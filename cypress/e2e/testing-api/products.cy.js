/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("Testing API Alta", () => {
  let token = "";
  let productId = "";
  let productName = "";
  let productDesc = "";
  let productPrice = "";
  let productRating = "";
  let productComment = "";
  let commentId = "";

  before(() => {
    cy.request("POST", "https://altashop-api.fly.dev/api/auth/login", {
      email: "diananggun@gmail.com",
      password: "test1234",
    }).then((response) => {
      token = response.body.data;
    });
  });

  it("should be able to get all products", () => {
    cy.request({
      method: "GET",
      url: "https://altashop-api.fly.dev/api/products",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      response.body.data.forEach((product) => {
        expect(product).to.have.all.keys("ID", "Name", "Description", "Price", "Ratings", "Categories");
      });
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

  it("should be able to get product by id", () => {
    cy.request({
      method: "GET",
      url: `https://altashop-api.fly.dev/api/products/${productId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("ID");
      expect(response.body.data.ID).to.be.a("number");
      expect(response.body.data).to.deep.contains({
        ID: productId,
        Name: productName,
        Description: productDesc,
        Price: productPrice
      });
    });
  });

  // it("should be able to delete product", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: `https://altashop-api.fly.dev/api/products/${productId}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body.data).to.be.null;
  //   });
  // });

  it("should be able to assign a product rating", () => {
    const rating = {
      count: faker.number.int({ min:1, max: 5 })
    };

    cy.request({
      method: "POST",
      url: `https://altashop-api.fly.dev/api/products/${productId}/ratings`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: rating,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("Ratings");
      expect(response.body.data.Ratings).to.be.a("number");
      expect(response.body.data).to.deep.contains({
        ID: productId,
        Name: productName,
        Description: productDesc,
        Price: productPrice,
        Ratings:rating.count
      });
      productRating = response.body.data.Ratings;
    });
  });

  it("should be able to get product rating", () => {
    cy.request({
      method: "GET",
      url: `https://altashop-api.fly.dev/api/products/${productId}/ratings`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.contains({
        data: productRating
      });
    });
  });

  it("should be able to create a comment for product", () => {
    const comment = {
      content: faker.company.catchPhraseDescriptor()
    };

    cy.request({
      method: "POST",
      url: `https://altashop-api.fly.dev/api/products/${productId}/comments`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: comment,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("ID");
      expect(response.body.data.ID).to.be.a("number");
      expect(response.body.data).to.have.property("Content");
      expect(response.body.data.Content).to.be.a("string");
      expect(response.body.data).to.have.property("User");
      expect(response.body.data.User).to.be.null;
      expect(response.body.data).to.have.property("Product");
      expect(response.body.data.Product).to.be.null;
      expect(response.body.data).to.have.property("Comment");
      expect(response.body.data.Comment).to.be.null;
      expect(response.body.data).to.deep.contains({
        Content:comment.content,
      });
      commentId = response.body.data.ID;
      productComment = response.body.data.Content;
    });
  });

  it("should be able to get product comments", () => {
    cy.request({
      method: "GET",
      url: `https://altashop-api.fly.dev/api/products/${productId}/comments`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      response.body.data.forEach((comment) => {
        expect(comment).to.have.all.keys("ID", "Content", "User", "Product", "Comment");
      });
    });
  });

});