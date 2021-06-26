import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { AppScreen } from '../components/AppScreen';

const ExperimentalPage = () => {
  return (
    <Layout>
      <SEO title="experimental" />
      <AppScreen />
    </Layout>
  );
};

export default ExperimentalPage;
