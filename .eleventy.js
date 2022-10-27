nunjucksEnvironment = require('./nunjucks-env')
module.exports = function(eleventyConfig) { 
  // this means everything that isn't a template file will be
  // copied into _site by default:
  eleventyConfig.setTemplateFormats([
    "*"
  ]);

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
};
