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
     cy.get('input[type="text"]').eq(0)
   }

   getPassword() {
     cy.get('input[type="text"]').eq(1)
   }
}
  
export default new altaPage();
  