/// <reference types="cypress" />

describe('contact form', () => {
  before(() => {
    // Runs once before all tests in the block
  });
  beforeEach(() => {
    // Runs before each test in the block
    cy.visit('/about');
    // e.g. Seeding the database
    // should also include the clean up. Recommended by cypress. Here not "after"
  });
  afterEach(() => {
    // Runs after each test in the block
  });
  after(() => {
    // Runs once after all tests in the block
  });

  it('should submit the form', () => {
    cy.task('seedDatabase', 'filename.csv').then((returnValue) => {
      // ... use returnValue
    }); // task is a node event listener
    cy.getById('contact-input-message').type('Hello world!');
    cy.getById('contact-input-name').type('John Doe');
    cy.getById('contact-btn-submit')
      .contains('Send Message') // chaining
      .and('not.have.attr', 'disabled'); // and is synonymous with should
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      // another way to check. Unit text syntax
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.be.eq('Send Message');
    });
    cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').type('test@example.com');
    cy.submitForm();
    cy.screenshot();
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').should('have.attr', 'disabled');
  });

  it('should validate the form input', () => {
    cy.submitForm();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
    cy.get('[data-cy="contact-input-message"]').focus().blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should('have.attr', 'class') // 'should' passes the class attribute, instead of the parent element
      .and('match', /invalid/);

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        // should instead of then
        expect(el.attr('class')).contain('invalid');
      });
  });
});
