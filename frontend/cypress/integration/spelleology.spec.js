describe('Spelleology tests', function () {

    beforeEach('Open the page', function () {
        //all the code here is executed before each test
        cy.visit('/#/spelleology');
    })

    it('should display title', function () {
        // 2. find the element & check its text
        cy.get('.title').should('have.text','Spelleology')
    });

    it('should display the delete button', function () {
        //find the element using the ID
        cy.get('#deleteAll').should('have.text', 'Delete all');
        //find the element using the CSS class
        cy.get('.spell-button').eq(0).should('have.text', 'Delete all');
        //check the text of reset button
        cy.get('.spell-button').eq(1).should('have.text', 'Reset');
        //find the element using custom attribute
        cy.get('button[data-test="delete-all"]').should('have.text', 'Delete all')
        //find the element using text
        cy.contains('Delete all').should('have.text', 'Delete all')
    });

    it('should filter spell by effect', function () {
        //1. enter the text to the search input
        cy.get('input[data-test="search-input"]').type('murders opponent')
        //2. check that spell is filtered out
        cy.get('ul.spells li').should('have.text','murders opponent');
        cy.get('ul.spells li').should('have.length.greaterThan',0);
    });

    it('should display correct number of spells', function () {
        cy.get('ul.spells li').should('have.length',151);
    });

    it('should display the spell detial', function () {
        // search for a spell
        cy.get('input[data-test="search-input"]').type('murders opponent')
        // open the detail
        cy.get('ul.spells li').click();
        // check the values of the modal
        cy.get('div.modal-container h2').should('have.text','Avada Kedavra');
        cy.get('div.modal-container h3').should('have.text','murders opponent');
        cy.get('div.modal-container h4').should('have.text','Curse');
    });

    it.only('should display mischief managed', function () {
        cy.contains('Mischief managed').should('be.visible')
    });
})


