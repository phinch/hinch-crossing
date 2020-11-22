import React from 'react';
import { motion } from 'framer-motion'

import Layout from '../components/layout';
import SEO from '../components/seo';
import * as colors from '../tokens/colors'
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  centerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  iphoneScreen: {
    maxWidth: 375,
    width: `calc(100vh * .8 * (375/812))`,
    maxHeight: 812,
    height: '80%',
    borderRadius: 20,
    background: colors.moss,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    padding: 20,
  },
  appIcon: {
    background: colors.sun,
    maxHeight: 60,
    maxWidth: 60,
    width: `calc((100vh * .8 * (375/812) - 120px) * .25)`,
    height: `calc((100vh * .8 * (375/812) - 120px) * .25)`,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
    cursor: 'pointer',
  },
})

const children = (() => {
  const children = []
  for (let childIndex = 0; childIndex < 20; childIndex++) {
    children.push({ childIndex });
  }
  return children
})();

const ExperimentalPage = () => {
  const screenRef = React.useRef(null)
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <Layout>
      <SEO title="experimental" />
      <div className={css(styles.centerWrapper)}>
        <div className={css(styles.iphoneScreen)} ref={screenRef}>
          {children.map(child => (
            <motion.div
              className={css(styles.appIcon)}
              key={child.childIndex}
              whileTap={{
                scale: [null, 1, 0.9, 1.1],
                opacity: [null, 0.5, 0.5, 1],
              }}
              drag
              dragConstraints={screenRef}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExperimentalPage;
