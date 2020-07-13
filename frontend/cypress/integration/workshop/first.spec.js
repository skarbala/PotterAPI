
describe("first examples", () => {
  // beforeEach('open page', () => {
  //   cy.visit("http://localhost:8080/")
  // })

  it("Open the page and check welcome message", () => {
    cy.visit("http://localhost:8080/")
    cy.get(".welcome").contains("Welcome Wizard")
    // different style of class
    cy.get("[class='welcome']").should("be.visible")
    cy.get("[src='/img/hogwartslogo.9b80e4a6.png']")
  })

  it("open Spellology tab and search for water spells", () => {
    cy.visit("http://localhost:8080/") //repetitive - show hooks // show why to have visit in every .it
    cy.get("[href='#/spelleology']").click()
    cy.get("button").contains("Reset").click()
    cy.get("input.search").type("water") //idea: input field with keyboar <enter> confirmation
    cy.get(".spells").within(() => {
      cy.contains("shoots water from wand")
      cy.contains("makes an object repel water")
    })
  })

  it("open spell and check modal visibility", () => {
    // how to use visibility
    cy.get(".modal-header").should("not.be.visible")
    cy.contains("makes an object repel water").click()
    cy.get(".modal-header").should("be.visible")
    cy.get(".btn-block").contains("Close").click()
  })

  it("checkboxes", () => {
    // work with checkboxes
    // why to have independent its
    cy.get("#unforgivableOnly").should('not.be.checked')
    cy.get("#charm").should('be.checked')
    cy.get("#spell").should('be.checked')
    cy.get(".spells.row li").should('have.length', 3) // selector with/without space between attributes

    cy.get("#charm").uncheck().should('not.be.checked')
    cy.get("#spell").check().should('be.checked')
    cy.get(".spells.row li").should('have.length', 1)
  })


  it("count of elements", () => {
    cy.visit("http://localhost:8080/#/quotes")
    cy.get(".quote-container ul li").should("not.be.visible")

    cy.contains("Get Quote").click()
    cy.get(".quote-container ul li").should("have.length", 1)

    cy.contains("Get Quote").dblclick()
    cy.get(".quote-container ul li").should("have.length", 3)

  })

  it("should display one of the houses", () => {
    cy.visit('http://localhost:8080/#/sortingHat');
    cy.get('div.main > .main').click();
    cy.get('.col-md-4 > h1')
      .then(element => expect(element.text()).to.be.oneOf(['Hufflepuff', 'Gryffindor', 'Ravenclaw', 'Slytherin']))
  })
})

