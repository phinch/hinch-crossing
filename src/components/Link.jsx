/**
 * "Atomic" Link component. Wraps the Gatsby Link.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import { Link as GastbyLink } from 'gatsby';

import * as colors from '../tokens/colors';

const styles = StyleSheet.create({
  primary: {
    color: colors.moss,
    textDecoration: `none`,
  },
  outline: {},
  good: {},
  bad: {},
  link: {},
});

function Link({ children, type, ...linkProps }) {
  return (
    <GastbyLink className={css(styles[type])} {...linkProps}>
      {children}
    </GastbyLink>
  );
}

Link.propTypes = {
  type: PropTypes.string,
  linkProps: PropTypes.object,
};

export default Link;
