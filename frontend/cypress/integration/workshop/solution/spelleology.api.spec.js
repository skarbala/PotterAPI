/// <reference types="cypress" />


describe("Feature: Spelleology API", () => {
    beforeEach('reset spells', () => {
        cy.request('http://localhost:3000/spells/actions/reset')
    })

    it('Should delete all spells', () => {
        cy.request('DELETE', 'http://localhost:3000/spells/actions/deleteAll')
        cy.visit("http://localhost:8080/#/spelleology")
        cy.get('.subtitle').contains('Mischief managed')
    });


    it("Should add spell via API", () => {
        const newSpell = {
            spell: "Corona",
            effect: "sneezing forever",
            type: "Curse",
            isUnforgivable: true
        };

        cy.request('DELETE', 'http://localhost:3000/spells/actions/deleteAll')
        cy.visit("http://localhost:8080/#/spelleology")
        cy.contains("sneezing forever").should("not.be.visible")
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/spells',
            body: newSpell
        }).then(response => {
            expect(response.body.message).to.equal('Spell created')
            expect(response.status).to.equal(201)
        })
        cy.reload()
        cy.contains(newSpell.effect).should("be.visible").click()
        cy.get(".modal-header").contains(newSpell.spell)
        cy.get(".modal-body").contains(newSpell.type).contains(newSpell.type)
    });

})