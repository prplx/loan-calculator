const path = require('path');

module.exports = [
  {
    path: '/',
    component: path.resolve(`src/pages/index.tsx`),
  },
  {
    path: '/en',
    component: path.resolve(`src/pages/index.tsx`),
  },
];
