
describe("api test example", () => {

  it("add a spell", () => {
    const newSpell = {
    "spell": "Corona",
    "effect": "sneezing forever",
    "type": "Curse",
    "isUnforgivable": true
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
    cy.contains("sneezing forever").should("be.visible").click()
    cy.get(".modal-header").contains("Corona")
    cy.get(".modal-body").contains("Curse")
    cy.get(".modal-footer").contains("Close").click()

    cy.request('DELETE', 'http://localhost:3000/spells/actions/deleteAll')
    cy.reload()
    cy.contains("sneezing forever").should("not.be.visible")
  })


  it('should fetch all spells via api', () => {
    cy.server();
    cy.request(Cypress.env('apiUrl') + '/sortingHat')
      .then(response => {
        expect(response.status).to.eql(200)
        cy.log(response.body.house)
      });
  });

  it.only('should catch response and extract body and check value on page', () => {
    cy.server();
    cy.route(Cypress.env('apiUrl') + '/sortingHat').as('sortingHat');

    cy.visit("http://localhost:8080/#/sortingHat")
    cy.get('button.main').click();
    cy.wait('@sortingHat').then(
      response => cy.get('.col-md-4 > h1').should('have.text', response.responseBody.house)
    )
  })

})

