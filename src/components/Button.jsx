/**
 * "Atomic" button component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  primary: {},
  outline: {},
  good: {},
  bad: {},
  link: {},
});

function Button({ children, type, buttonProps }) {
  return (
    <button className={css(styles[type])} {...buttonProps}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  buttonProps: PropTypes.object,
};

export default Button;
