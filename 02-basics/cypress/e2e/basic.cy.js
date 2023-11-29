/// <reference types="cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173');
    cy.get('.main-header img');
    cy.get('.main-header').find('img'); // this also works, but do not do .get().get() because it starts searching from the beginning
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('My Cypress Course Tasks');
    // cy.contains('My Cypress Course Tasks');
  });
});
