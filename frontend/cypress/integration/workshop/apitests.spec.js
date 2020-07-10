
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
})

