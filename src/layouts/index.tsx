import * as React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Layout: React.FC = ({ children }) => {
  const [t, i18n] = useTranslation();

  const isEn = i18n.language === 'en';

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: isEn ? 'en' : 'ru',
        }}>
        <title>{t('title')}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t('description')} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="alternate"
          hrefLang={isEn ? 'ru' : 'en'}
          href={
            isEn
              ? process.env.GATSBY_FINANCE_SITE_URL
              : `${process.env.GATSBY_FINANCE_SITE_URL}/en`
          }
        />
      </Helmet>
      <Global
        styles={css`
          :root {
            --dark-blue: #01048a;
            --text-color: #48536d;
            --menu-width: 5.54%;
            --aside-width: 34%;
          }
          body {
            margin: 0;
            padding: 0;
            background: white;
            color: var(--text-color);
            font-size: calc(1em + 1vw);
            font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
          }
        `}
      />
      <Grid>{children}</Grid>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto var(--aside-width);
  min-height: 100vh;
`;

export default Layout;
