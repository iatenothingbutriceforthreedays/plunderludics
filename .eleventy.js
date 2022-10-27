nunjucksEnvironment = require('./nunjucks-env')
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) { 
  // this means everything that isn't a template file will be
  // copied into _site by default:
  eleventyConfig.setTemplateFormats([
    "*"
  ]);

  // Handle alternate prefix (for gh pages)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);


  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
};
