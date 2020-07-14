/// <reference types="cypress" />


describe("Feature: Spelleology", () => {
    beforeEach('open page', () => {
        cy.visit("http://localhost:8080/#/quotes");
    })
    it("Sorting button should change text after first click", () => {
        cy.get(':nth-child(1) > p').should('have.text', 'wisdom points +0');
    });
})