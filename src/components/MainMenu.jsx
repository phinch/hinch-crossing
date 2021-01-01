import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import Link from './Link';
import * as colors from '../tokens/colors';

const styles = StyleSheet.create({
  MainMenu: {
    position: 'absolute',
    right: 0,
    opacity: 0.8,
    minWidth: 320,
  },
  contentWrapper: {
    margin: `0 auto`,
    maxWidth: 320,
    padding: `1.45rem 1.0875rem`,
    textAlign: 'right',
  },
  time: {
    color: colors.farrowBallScotchBlue,
    margin: 0,
    fontSize: 16,
    lineHeight: 1.8,
  },
  title: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.8,
  },
  subLink: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.8,
  },
});

const MainMenu = ({ siteTitle }) => {
  const [isOpen, toggleOpen] = React.useState(true);

  return isOpen ? (
    <div className={css(styles.MainMenu)}>
      <div className={css(styles.contentWrapper)}>
        <h1 className={css(styles.time)}>time of day</h1>
        <h1 className={css(styles.title)}>
          <Link to="/" type="primary">
            {siteTitle}
          </Link>
        </h1>
        {/* <h1 className={css(styles.subLink)}>
          <Link to="/projects" type="primary">
            projects
          </Link>
        </h1> */}
        <h1 className={css(styles.subLink)}>
          <Link to="/experimental" type="primary">
            experiments
          </Link>
        </h1>
      </div>
    </div>
  ) : (
    <div onClick={() => toggleOpen(true)}>CLICKA CLICKA</div>
  );
};

MainMenu.propTypes = {
  siteTitle: PropTypes.string,
};

MainMenu.defaultProps = {
  siteTitle: ``,
};

export default MainMenu;
