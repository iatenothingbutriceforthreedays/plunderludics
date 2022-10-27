const ghpages = require('gh-pages');

ghpages.publish('_site', {branch: 'gh-pages', history: 'false'}, console.error);