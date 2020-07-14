/// <reference types="cypress" />

describe("Feature: Quote generator", () => {
    beforeEach('open page', () => {
        cy.visit("http://localhost:8080/#/quotes");
    })
    it("Sorting button should change text after first click", () => {
        cy.get('[data-test=wisdom-points]').should('have.text', 'wisdom points +0');
        cy.get('[data-test=wisdom-level]').should('have.text', 'current level NOOB');
    });

    it('Display exact number of quotes', () => {
        for (let index = 0; index < 5; index++) {
            cy.get('[data-test=get-quote]').click();
        }
        cy.get('[data-test=wisdom-points]').should('have.text', 'wisdom points +5');
    })

    it('display current level Part-Time DEATHEATER', () => {
        for (let index = 0; index < 36; index++) {
            cy.get('[data-test=get-quote]').click();
        }
        cy.get('[data-test=wisdom-level]').should('have.text', 'current level Part-Time DEATHEATER')
    })

    it('Display author for each quote', () => {
        for (let index = 0; index < 10; index++) {
            cy.get('[data-test=get-quote]').click();
        }
        cy.get('ul.quote-list li').then(element => {
            cy.wrap(element).find('.author').should('not.be.empty');
        })
    })

})