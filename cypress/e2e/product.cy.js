/// <reference types="cypress" />

import altaPage from "../pages/alta";

let productName
let productTitle
let productRating
let Rating
let numberRating
let totalProduct
let Quantity
let Jumlah
let Tambah
let Hitung
let Kurang
let Price
let Total
let TotalBayar

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Testing website shopping", () => {
  beforeEach(() => {
    cy.visit("https://alta-shop.vercel.app/");
    cy.viewport(1600, 900)
  });

  it("Should be able to show product card", () => {
    altaPage.getProductCard().should("be.visible")
    altaPage.getProductCard().each(($el, index, $list) => {
      cy.wrap($el).then( ()=> {
        altaPage.getProductName().should("be.exist")
        altaPage.getProductDesc().should("be.exist")
        altaPage.getPrice().should("be.exist")
      })
    })
  } )

  it("Should be able to show detail of every product", () => {
    cy.wait(1000)
    altaPage.getProductName().eq(0)
    .then((element) => {
      productName = element.text().trim()
    })
    altaPage.getDetail().eq(0).click()
    cy.url().should('match', /https:\/\/alta-shop\.vercel\.app\/products\/\d+/)
    .then((url) => {
      const productId = url.match(/\d+/)[0]
      cy.wrap(productId).as('productId')
    })
    altaPage.getDetailProduct().should("be.visible")
    cy.get('.text-h4').should("be.visible")
    cy.get('.text-h4').then((element) => {
      productTitle = element.text().trim()
    })
    expect(productName).to.equal(productTitle)
    cy.go("back")
  } )

  it("Should be able to displays the rating according to the rating number", () => {
    cy.wait(1000)
    altaPage.getProductRating().eq(2)
    .then((element) => {
      productRating = element.text().trim()
    })
    altaPage.getDetail().eq(2).click()
    cy.url().should('match', /https:\/\/alta-shop\.vercel\.app\/products\/\d+/)
    .then((url) => {
      const productId = url.match(/\d+/)[0]
      cy.wrap(productId).as('productId')
    })
    altaPage.getDetailProduct().should("be.visible")
    cy.get('.black--text').then((element) => {
      Rating = element.text().trim()
      numberRating = parseInt(Rating.trim().replace(/\(|\)/g, ''), 10);
    })
    expect(productRating).to.equal(numberRating)
    altaPage.getStarRating()
    .its('length')
    .then((count) => {
      expect(count).to.equal(numberRating); 
    });

  } )

  it("Should cart is empty at the beginning" ,() =>{
    altaPage.getBadge().should("not.be.visible")
    altaPage.getCart().click()
    cy.url().should("include", "/order");
    altaPage.getAlert().should("contain" , "Order is empty!")
  })

  it("should be able to display a cart badge according to the number of products purchased" ,() =>{
    altaPage.getBeli().eq(0).click()
    altaPage.getBeli().eq(1).click()
    altaPage.getBadge().then((element) => {
      totalProduct = element.text().trim()
    })
    altaPage.getCart().click()
    cy.url().should("include", "/order");
    altaPage.getQuantity().then((element) => {
      Quantity = element.text().trim()
    })
    expect(totalProduct).to.equal(Quantity)
  })

  it("Should be able to buy products and make payments",() =>{
    altaPage.getAccount().click()
    cy.get('input[type="text"]').eq(0).type(Cypress.env("EMAIL"))
    cy.get('input[type="text"]').eq(1).type(Cypress.env("PASSWORD"))
    altaPage.getButton().click()
    altaPage.getProductCard().should("be.visible")
    cy.wait(1000)
    altaPage.getBeli().eq(0).click()
    altaPage.getBeli().eq(1).click()
    altaPage.getCart().click()
    cy.url().should("include", "/order");
    cy.wait(1000)
    altaPage.getBayar().click()
    cy.url().should("include", "/transaction")
  })

  it("should be able to increase the number of products if the + button is clicked",() =>{
    cy.wait(1000)
    altaPage.getBeli().eq(0).click()
    altaPage.getCart().click()
    cy.url().should("include", "/order");
    altaPage.getJumlah().then((element) => {
      Jumlah = parseInt(element.text().trim()); 
      Hitung = Jumlah + 1;
      cy.log(Hitung)
    })
    altaPage.getTambah().click()
    altaPage.getJumlah().then((element) => {
      Tambah = parseInt(element.text().trim()); 
      cy.log(Tambah)
      expect(Tambah).to.equal(Hitung)
    })
  })

  it("should be able to decrease the number of products if the - button is clicked",() =>{
    cy.wait(1000)
    altaPage.getBeli().eq(0).click()
    altaPage.getBeli().eq(0).click()
    altaPage.getBeli().eq(0).click()
    altaPage.getCart().click()
    cy.url().should("include", "/order");
    altaPage.getJumlah().then((element) => {
      Kurang = parseInt(element.text().trim()); 
      cy.log(Kurang)
      Hitung = Kurang - 1;
      cy.log(Hitung)
    })
    altaPage.getKurang().click()
    altaPage.getJumlah().then((element) => {
      Kurang = parseInt(element.text().trim()); 
      cy.log(Kurang)
      expect(Kurang).to.equal(Hitung)
    })
  })

  it("should be able to displays the total payment according to the price of the product multiplied by the number of products",() =>{
    cy.wait(1000)
    altaPage.getBeli().eq(0).click()
    altaPage.getBeli().eq(0).click()
    altaPage.getCart().click()
    cy.url().should("include", "/order");
    altaPage.getJumlah().then((element) => {
      Jumlah = parseInt(element.text().trim()); 
    })
    cy.get('.label-price').then((element) => {
      Price = parseInt(element.text().trim()); 
      TotalBayar = Jumlah*Price
    })
    cy.get('#label-total-bayar').then((element) => {
      Total = parseInt(element.text().trim()); 
      expect(TotalBayar).to.equal(Total)
    })
  })
 
});
