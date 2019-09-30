import * as React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocal from 'date-fns/locale/en-US';
import { useTranslation } from 'react-i18next';
import Layout from '../layouts';
import { Aside, Main, LoanMain, AsideMain } from '../components';
import LoanContextProvider from '../contexts/loanContextProvider';

const IndexPage: React.FC = () => {
  const [t, i18n] = useTranslation();

  return (
    <Layout>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={i18n.language === 'ru' ? ruLocale : enLocal}>
        <LoanContextProvider>
          <>
            <Main>
              <LoanMain />
            </Main>
            <Aside>
              <AsideMain />
            </Aside>
          </>
        </LoanContextProvider>
      </MuiPickersUtilsProvider>
    </Layout>
  );
};

export default IndexPage;
