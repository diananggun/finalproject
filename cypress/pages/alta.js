/// <reference types="cypress" />

class altaPage {
   getProductCard() {
        return cy.get('.v-card.v-sheet.theme--light')
   }

   getDetail() {
        return cy.get('.v-card > .v-card__actions > .mt-3 > :nth-child(1)')
   }

   getDetailProduct () {
    return cy.get('.v-card__text').should("be.visible");
   }

   getBeli() {
    return cy.get('.v-card > .v-card__actions > .mt-3 > .ml-3 > .v-btn__content')
   }

   getBadge() {
    return cy.get('.v-badge__badge')
   }

   getCart() {
    return cy.get('.v-badge > .v-icon')
   }

   getAlert() {
    return cy.get('.v-alert')
   }

   getQuantity() {
    return cy.get('#label-total-quantity')
   }

   getBayar() {
    return cy.get('#button-bayar')
   }

   getRegister() {
    return cy.get("a").contains("Register")
   }

   getButton() {
    return cy.get('.text-center > .v-btn')
   }

   getAccount() {
     return cy.get('.v-btn__content > .v-icon')
   }

   getEmail() {
     return cy.get('input[type="text"]').eq(0)
   }

   getPassword() {
     return cy.get('input[type="text"]').eq(1)
   }

   getProductName() {
    return cy.get('.v-card > .v-card__title')
   }

   getProductDesc() {
    return cy.get('.v-card > .v-card__subtitle')
   }

   getProductDesc() {
    return cy.get('.v-card > .v-card__subtitle')
   }

   getPrice() {
    return cy.get('.v-card > .v-card__actions > .row > .product-price')
   }

   getProductRating () {
    return cy.get('.v-card > .v-card__actions > .row > :nth-child(1)')
   }

   getRating() {
    return cy.get('.v-rating.v-rating--dense')
   }

   getStarRating() {
    return cy.get('.v-icon.notranslate.v-icon--link.fas.fa-star.theme--light.primary--text')
   }

   getTambah() {
    return cy.get('.v-list-item__icon > :nth-child(3)')
   }

   getKurang() {
    return cy.get('#order-85490 > .v-list-item__icon > :nth-child(1)')
   }

   getJumlah() {
    return cy.get('.mx-3')
   }

  

}
  
export default new altaPage();
  