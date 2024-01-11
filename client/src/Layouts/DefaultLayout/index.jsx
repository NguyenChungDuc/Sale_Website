import React from 'react';
import AppHeader from '../../Components/AppHeader';
import PageContent from '../../Components/PageContent';
import AppFooter from '../../Components/AppFooter';

const DefaultLayout = () => {
  return (
    <>
      <AppHeader />
      <PageContent />
      <AppFooter />
    </>
  );
};

export default DefaultLayout;
