import React, { useEffect } from 'react';
import { css, StyleSheet } from 'aphrodite';

import Layout from '../components/layout';
import Image from '../components/image';
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

let styles = StyleSheet.create({
  animate: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    animationName: [motionKeyframe, rotationClockwiseKeyframe],
    animationDuration: '40000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});

const IndexPage = () => {
  useEffect(() => {
    const path = pathGeneration.generatePath(document.getElementById('blah'));
    console.log(path);
    styles = StyleSheet.create({
      animate: {
        position: 'absolute',
        top: '30%',
        left: '40%',
        offsetPath: path,
        animationName: [motionKeyframe, rotationClockwiseKeyframe],
        animationDuration: '40000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      },
    });
  });

  return (
    <Layout>
      {/* TODO: learn SEO lol */}
      <SEO title="Home" />
      <span className={css(styles.animate)} id="blah">
        hello
      </span>
    </Layout>
  );
};

export default IndexPage;
