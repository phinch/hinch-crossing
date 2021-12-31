import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PiwigoFetcher from '../components/PiwigoFetcher';

import { AppScreen } from '../components/AppScreen';

const PiwigoPage = () => {
  return (
    <Layout>
      <SEO title="piwigo" />
      <PiwigoFetcher />
    </Layout>
  );
};

export default PiwigoPage;
