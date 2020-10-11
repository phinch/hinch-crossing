/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { css, StyleSheet } from 'aphrodite';

import MainMenu from './MainMenu';
import * as colors from '../tokens/colors';
import './layout.css';

const styles = StyleSheet.create({
  background: {
    background: colors.sun,
    margin: `0 auto`,
    padding: `0px 0px 1.45rem`,
    paddingTop: 0,
    minHeight: '100vh',
    color: colors.farrowBallScotchBlue,
  },
});

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <MainMenu siteTitle={data.site.siteMetadata.title} />
      <div className={css(styles.background)}>
        <main>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
