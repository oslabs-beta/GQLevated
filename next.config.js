const withTM = require('next-transpile-modules')(['react-github-btn']);
// module.exports = {
//   reactStrictMode: true,
//   withTM: withTM(),
// };

module.exports = withTM();

// module.exports = {
//   withTM: withTM(),
//   rewrites: async () => {
//     return [
//       {
//         source: '/convert-sql-db',
//         destination: 'http://localhost:8080/convert-sql-db', // Proxy to Backend
//       },
//     ];
//   },
// };

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/convert-sql-db',
//         destination: 'http://localhost:8080/convert-sql-db', // Proxy to Backend
//       },
//     ];
//   },
// };
