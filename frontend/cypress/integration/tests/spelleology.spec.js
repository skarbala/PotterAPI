/// <reference types="cypress" />


const spell = {
    spell: 'Imperio',
    effect: 'controls a person'
}

describe("Spelleology basic tests", () => {
    beforeEach('open page', () => {
        cy.visit("/#/spelleology");
    });

    it("Should display title", () => {
        cy.get('.title')
            .should('be.visible')
            .should('have.text', 'Spelleology');
    });

    it('should count spells', function () {
        cy.get('ul.spells li').should('have.length', 151)
    });

    it('should filter one spell', () => {
        cy.get('.search').type(spell.effect);
        cy.get('ul.spells li').click();
        cy.get('.modal-header').find('h2').should('have.text', spell.spell);
        cy.get('.modal-body').find('h3').should('have.text', spell.effect)
    });

    it('should filter spells by unforgivable only', () => {
        cy.get('#unforgivableOnly').check();
        cy.get('ul.spells')
            .find('li')
            .should('contain.text', 'murders opponent')
            .should('contain.text', 'tortures a person')
            .should('not.contain', 'opens object')
    });

    it.only('should filter spells by type', () => {
        const types = ['spell', 'charm', 'jinx', 'enchantment', 'hex']
        types.forEach(type => cy.get("#" + type).click());
        cy.fixture('spells.json').then(spell => cy.log(spell.effect))
    })
})


