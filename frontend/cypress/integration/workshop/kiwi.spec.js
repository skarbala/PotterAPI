
const sizes = [
  [1024, 768], // Most popular
  [1920, 1080], // FullHD
  [375, 667], // iPhone 6/7/8
  [375, 812], // iPhone X
  [768, 1024], // iPad
]

describe("Kiwi", () => {

  sizes.forEach(size => {
    it(`Display page on ${size} screen, search and book flight`, done => {
      cy.viewport(...size)
      cy.visit("https://www.kiwi.com/")

      cy.log("accept cookies")
      cy.get("[data-test=acceptCookies]").first().click({force: true})

      cy.log("search for flight from Prague to London")
      cy.get("[data-test=PlacePickerInputPlace-close]").click()
      cy.get("[data-test=SearchField-input]").first().type("Prague").wait(1000).type("{enter}{esc}")
      cy.get("[data-test=SearchField-input]").last().type("London").wait(1000).type("{enter}{esc}")
      cy.get("[data-test=LandingSearchButton]").click()

      cy.log("book first flight")
      cy.get("[data-test=BookingButton]").first().click()
      cy.get("[data-test=ReservationHead]").should("be.visible")

      cy.log("fill contact details")
      cy.get("[name=email]").type("test@test.com")
      cy.get("[name=phone]").type("123456789")
      cy.get("[name=firstname]").type("Oliver")
      cy.get("[name=lastname]").type("Wood")
      cy.get("[name=nationality]").select("gb")
      cy.get("[name=title]").select("mr")
      cy.get("[name=birthMonth]").select("01")
      cy.get("[name=birthDay]").type("1")
      cy.get("[name=birthYear]").type("2000")
      cy.get("[data-test=StepControls-passengers-next]").click()



    })
  })
})
