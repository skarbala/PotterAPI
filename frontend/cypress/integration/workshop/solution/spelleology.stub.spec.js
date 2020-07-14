/// <reference types="cypress" />


describe("Feature: Spelleology STUB", () => {

    it('Display empty message when server doesnt provide any data', () => {
        cy.server();
        cy.route('http://localhost:3000/spells', [])
        cy.visit("http://localhost:8080/#/spelleology")
        cy.get('.subtitle').contains('Mischief managed')
    });

    it('Display custom spell', () => {
        const newSpell = {
            spell: "Corona",
            effect: "sneezing forever",
            type: "Curse",
            isUnforgivable: true
        };
        cy.server();
        cy.route('http://localhost:3000/spells', [newSpell])
        cy.visit("http://localhost:8080/#/spelleology")
        cy.contains("sneezing forever").should("be.visible").click()
        cy.get(".modal-header").contains(newSpell.spell)
        cy.get(".modal-body").contains(newSpell.type).contains(newSpell.type)
    });

})