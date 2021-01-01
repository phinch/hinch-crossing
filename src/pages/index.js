import React, { useEffect } from 'react';
import { css, StyleSheet } from 'aphrodite';

import Layout from '../components/layout';
import SEO from '../components/seo';
import * as pathGeneration from '../util/pathGeneration';

const motionKeyframe = {
  '0%': {
    offsetDistance: '0%',
  },
  '50%': {
    offsetDistance: '100%',
  },
  '100%': {
    offsetDistance: '0%',
  },
};

const rotationClockwiseKeyframe = {
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
};

let defaultStyles = StyleSheet.create({
  animate: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    // offsetPath: 'path("M50,50 C50,200 120,0 220,100 S 400,150 350,0")',
    animationName: [motionKeyframe, rotationClockwiseKeyframe],
    animationDuration: '40000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});

const IndexPage = () => {
  const [styles, updateStyles] = React.useState(defaultStyles);

  useEffect(() => {
    if (!document) return;
    const pathString = pathGeneration.generatePath(
      document.getElementById('blah'),
    );
    console.log(pathString);
    const stylesWithOffset = StyleSheet.create({
      animate: {
        position: 'absolute',
        top: '30%',
        left: '40%',
        offsetPath: `path("${pathString}")`,
        animationName: [motionKeyframe, rotationClockwiseKeyframe],
        animationDuration: '40000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      },
    });
    updateStyles(stylesWithOffset);
  }, []);

  console.log(styles);

  return (
    <Layout>
      {/* TODO: learn SEO lol */}
      <SEO title="Home" />
      <span className={css(styles.animate)} id="blah">
        work in progress!
      </span>
    </Layout>
  );
};

export default IndexPage;
