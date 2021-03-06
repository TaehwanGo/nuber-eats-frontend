describe('Log in', () => {
  it('should see login page', () => {
    cy.visit('/').title().should('eq', 'Login | Nuber Eats');
  });

  it('can see email / password validation error', () => {
    cy.visit('/');
    cy.findByPlaceholderText(/email/i).type('bad@email');
    cy.findByRole('alert').should('have.text', 'Please enter a valid email');
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole('alert').should('have.text', 'Email is required');
    cy.findByPlaceholderText(/email/i).type('bad@email.com');
    cy.findByPlaceholderText(/password/i)
      .type('1')
      .clear();
    cy.findByRole('alert').should('have.text', 'Password is required');
  });

  it('can fill out the form and log in', () => {
    // @ts-ignore
    cy.login('testCy@press.com', '1234');
  });
});
