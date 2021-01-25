// folder의 depth가 여러개라도 인식함
module.exports = {
  client: {
    includes: ['src/**/*.tsx'],
    tagName: 'gql',
    service: {
      name: 'nuber-eats-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
