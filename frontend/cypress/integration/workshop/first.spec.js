
describe("first examples", () => {
    it("Open the page and check welcome message", () => {
      cy.visit("http://localhost:8080/")
      cy.get(".welcome-title").contains("Welcome Wizard")
      // different style of class
      cy.get("[class='welcome-title']").should("be.visible")
      cy.get("[src=\"/img/hogwartslogo.9b80e4a6.png\"]")
      // different style of quotes
      cy.get("[src='/img/hogwartslogo.9b80e4a6.png']")
    })

  it("open Spellology tab and search for water spells", () => {
    cy.visit("http://localhost:8080/") //repetitive - show hooks // show why to have visit in every .it
    cy.get("[href=\"#/spelleology\"]").click()
    cy.get("input[placeholder=\"search for spell effect\"]").type("water") //idea: input field with keyboar <enter> confirmation
    cy.get(".spells").within(() => {
      cy.contains("shoots water from wand")
      cy.contains("makes an object repel water")
      // TODO: check text height
    })
  })

  it("open spell and check modal visibility", () => {
    // how to use visibility
    cy.get(".modal-header").should("not.be.visible")
    cy.contains("makes an object repel water").click()
    cy.get(".modal-header").should("be.visible")
  })

  it("checkboxes", () => {
    // work with checkboxes
    cy.get("#unforgivableOnly").should('not.be.checked')
    cy.get("#spell").check().should('be.checked')
    cy.get("#charm").should('not.be.checked')
    cy.get(".spells").should('have.length', 15)
  })


  it("Quote Generator", () => {
    //TODO: number increasing check
    //TODO: doubleclick

  })
})

