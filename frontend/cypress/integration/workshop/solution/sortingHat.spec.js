/// <reference types="cypress" />


describe("Feature: Spelleology", () => {
    beforeEach('open page', () => {
        cy.visit("http://localhost:8080/#/sortingHat");
    })
    it("Sorting button should change text after first click", () => {
        cy.get('[data-test=sort-button]').click();
        cy.get('[data-test=sort-button]').should('have.text', 'Sort me again!')
    });

    it("Sorting hat should return one of the houses", () => {
        const expectedHouses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff']
        cy.get('[data-test=sort-button]').click();
        cy.get('[data-test=house-result]')
            .then(element => expect(element.text()).to.be.oneOf(expectedHouses));
    });
    it('Sorting button should have correct color', () => {
        cy.get('[data-test=sort-button]')
            .should('have.css', 'background-color', 'rgb(63, 63, 140)')
    })
    it('Display replaced response', () => {
        cy.server();
        const fakeResponse = {
            sortingHatSays: 'This is a fake response and you are not a wizard but a hobbit from different fairy',
            house: 'Hobbiton'
        }
        cy.route('http://localhost:3000/sortingHat', fakeResponse).as('sortingHat');
        cy.get('[data-test=sort-button]').click();
        cy.wait('@sortingHat')
        cy.get('[data-test=result-message]').should('have.text', fakeResponse.sortingHatSays)
        cy.get('[data-test=house-result]').should('have.text', fakeResponse.house);
    })
})