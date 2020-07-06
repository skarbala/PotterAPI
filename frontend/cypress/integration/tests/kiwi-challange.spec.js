/// <reference types="cypress" />

//open kiwi.com
//click on agree button by consent cookies
it('should open page', function () {
    cy.visit('https://www.kiwi.com/en');
    cy.get("button[data-test='acceptCookies']").eq(1).click();
    cy.get('[data-test=LandingSearchButton]').click();
    cy.get(':nth-child(1) > [data-test=PictureCard] > [data-test=PictureCardContent]').click();
    cy.wait(2000);
    cy.get('[data-test=ResultCardPrice]').first().then(element => cy.log(element.text()))
});