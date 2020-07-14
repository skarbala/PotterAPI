/// <reference types="cypress" />


describe("Feature: Spelleology", () => {
    beforeEach('open page', () => {
        cy.visit("http://localhost:8080/#/spelleology");
    })
    it("Filter unforgivable spells only", () => {
        cy.get('#unforgivableOnly').check();
        cy.get('.spells li')
            .should('have.length', 3)
            .should('contain.text', 'murders opponent')
            .should('contain.text', 'tortures a person')
            .should('contain.text', 'controls a person')
    });

    it("Filter spells by name", () => {
        cy.get('[data-test=search-input]').type('water');
        cy.get('.spells li')
            .should('have.length', 3)
    });

    it("Checkboxes for spell type are selected by default", () => {
        const spellTypes = ['spell', 'charm', 'curse', 'enchantment', 'hex', 'jinx']
        spellTypes.forEach(spellType => {
            cy.get('#' + spellType).should('be.checked');
        })
    });

    it("Modal should display spell details", () => {
        const expectedSpell = {
            spell: 'Avada Kedavra',
            effect: 'murders opponent',
            type: 'Curse'
        }
        cy.contains(expectedSpell.effect).click();
        cy.get('.modal-header').find('h2').should('have.text', expectedSpell.spell);
        cy.get('.modal-body').find('h3').should('have.text', expectedSpell.effect);
        cy.get('.modal-body').find('.body').should('have.text', expectedSpell.type)
    });

    it("Modal should be hidden by default", () => {
        cy.get(".modal-header").should("not.be.visible")
    });

    it("modal should be closed when user clicks on close", () => {
        cy.contains("makes an object repel water").click()
        cy.get(".modal-header").should("be.visible")
        cy.get(".btn-block").contains("Close").click()
    });

    it('All spells should be shown when user clears the search input', () => {
        cy.get('[data-test=search-input]').type('controls');
        cy.get('[data-test=search-input]').clear();
        cy.get('.spells li')
            .should('have.length', 151)
    })

})