/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const findWebpack = require('find-webpack');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

module.exports = (on) => {
  // find the Webpack config used by react-scripts
  const webpackOptions = findWebpack.getWebpackOptions();

  if (!webpackOptions) {
    throw new Error('Could not find Webpack in this project 😢');
  }

  const cleanOptions = {
    reactScripts: true,
  };

  findWebpack.cleanForCypress(cleanOptions, webpackOptions);

  const options = {
    webpackOptions,
    watchOptions: {},
  };

  on('file:preprocessor', webpackPreprocessor(options));
};
