describe('Edit Profile', () => {
  const user = cy;
  beforeEach(() => {
    // @ts-ignore
    user.login('testCy@press.com', '1234');
  });
  it('can go to /edit-profile using the header', () => {
    // @ts-ignore
    // user.login('testCy@press.com', '1234');
    user.wait(1000);
    user.get('a[href="/edit-profile"]').click();
    user.wait(1000);
    user.title().should('eq', 'Edit Profile | Nuber Eats');
  });
  it('can change email', () => {
    user.intercept('POST', 'http://localhost:4000/graphql', req => {
      console.log(req.body);
      if (req.body?.operationName === 'editProfile') {
        req.body.variables.input.email = 'testCy@press.com'; // req에 직접 접근해서 아이디가 바뀌지 않도록 해줌
      }
    });
    // @ts-ignore
    user.login('testCy@press.com', '1234');
    user.visit('/edit-profile');
    user.findByPlaceholderText(/email/i).clear().type('newtestCy@press.com');
    user.findByRole('button').click();
  });
});
