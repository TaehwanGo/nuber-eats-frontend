describe('Log in', () => {
  it('should see login page', () => {
    cy.visit('/').title().should('eq', 'Login | Nuber Eats');
  });
  it('can fill out the form', () => {
    cy.visit('/')
      .get('[name="email"]')
      .type('asdf@asdf.com')
      .get('[name="password"]')
      .type('1234')
      .findByRole('button')
      .should('not.have.class', 'pointer-events-none');
    // todo : can log in
  });
  it('can see email / password validation error', () => {
    cy.visit('/')
      .findByPlaceholderText(/email/i)
      .type('bad@email')
      .findByRole('alert')
      .should('have.text', 'Please enter a valid email');
  });
});
