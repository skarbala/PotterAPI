it('display list of spells', () => {
    cy.visit('http://localhost:8080/#/spelleology')
    cy.get('.spells')
        .should('be.visible')
        .find('li')
        .should('have.length', 151)
});