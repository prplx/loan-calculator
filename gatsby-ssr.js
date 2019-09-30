/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');
const { renderToString } = require('react-dom/server');
const { I18n } = require('./src/components');
const Backend = require('i18next-sync-fs-backend');

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  pathname,
}) => {
  I18n.use(Backend).init({
    initImmediate: false,
    preload: ['en', 'ru'],
    lng: 'ru',
    backend: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
    },
  });
  I18n.loadNamespaces(['loanCalc'], () => {
    if (pathname === '/en') I18n.changeLanguage('en');
    replaceBodyHTMLString(renderToString(bodyComponent));
  });
};
