describe('New table', () => {
  it('A user visits login should see errors if password and username is empty', () => {
    cy.visit('/');
    // default view 3 x 3
    cy.findAllByTestId(/row-/).should('have.length', 3);
    // counting number column and add column
    cy.findAllByTestId(/column-/).should('have.length', 5);
    // Adding rows and columns to the end
    cy.findByTestId('add-row').click();
    cy.findAllByTestId(/row-/).should('have.length', 4);
    cy.findByTestId('add-column').click();
    cy.findAllByTestId(/column-/).should('have.length', 6);
    // edit cell
    cy.findByTestId('input-x-1-y-1').type('First').type('{enter}');
    cy.findByTestId('input-x-1-y-1').should('have.value', 'First');
    // move cursor and edit
    cy.findByTestId('input-x-1-y-1').clear().type('Second').type('{downarrow}Third{enter}');
    cy.findByTestId('input-x-1-y-1').should('have.value', 'Second');
    cy.findByTestId('input-x-1-y-2').should('have.value', 'Third');
  });
});
