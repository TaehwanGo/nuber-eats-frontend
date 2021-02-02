describe('create Account', () => {
  const user = cy;
  it('should see email / password validation errors', () => {
    user.visit('/');
    user.findByText(/create an account/i).click();
    user.findByPlaceholderText(/email/i).type('non@good');
    user.findByRole('alert').should('have.text', 'Please enter a valid email');
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole('alert').should('have.text', 'Email is required');
    user.findByPlaceholderText(/email/i).type('real@email.com');
    user
      .findByPlaceholderText(/password/i)
      .type('a')
      .clear();
    user.findByRole('alert').should('have.text', 'Password is required');
  });

  it('should be able to create account and login', () => {
    user.intercept('http://localhost:4000/graphql', req => {
      //   console.log(req.body);
      const { operationName } = req.body;
      if (operationName && operationName === 'createAccountMutation') {
        req.reply(res => {
          res.send({
            fixture: 'auth/create-account.json',
          });
        });
      }
    });

    user.visit('/create-account');
    user.findByPlaceholderText(/email/i).type('testCy@press.com');
    user.findByPlaceholderText(/password/i).type('1234');
    user.findByRole('button').click();
    user.wait(2000);
    // @ts-ignore
    cy.login('testCy@press.com', '1234');
  });
});
