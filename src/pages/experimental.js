import React from 'react';
import { motion } from 'framer-motion'

import Layout from '../components/layout';
import SEO from '../components/seo';
import * as colors from '../tokens/colors'
import { css, StyleSheet } from 'aphrodite';

const HEIGHT_PERCENTAGE = 80
const SCREEN_WIDTH_CALC = `100vh * ${HEIGHT_PERCENTAGE/100} * (375/812)`
const ICONS_PER_ROW = 4
const SCREEN_VERTICAL_PADDING = 20
const SCREEN_HORIZONTAL_PADDING = 10
const ICON_HORIZONTAL_PADDING = 10
const ICON_DIMENSION_CALC = `(${SCREEN_WIDTH_CALC} - (${SCREEN_HORIZONTAL_PADDING * 2 + ICON_HORIZONTAL_PADDING * 2 * ICONS_PER_ROW}px)) * (1/${ICONS_PER_ROW})`

const styles = StyleSheet.create({
  centerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  iphoneScreen: {
    position: 'relative',
    maxWidth: 375,
    width: `calc(${SCREEN_WIDTH_CALC})`,
    maxHeight: 812,
    height: `${HEIGHT_PERCENTAGE}%`,
    borderRadius: 20,
    background: colors.moss,
  },
})

const generateAppIconStyles = iconIndex => {
  const topMod = Math.floor(iconIndex / ICONS_PER_ROW)
  const leftMod = iconIndex % ICONS_PER_ROW
  const iconBottomSpacing = 25

  const styles = StyleSheet.create({
    appIcon: {
      position: 'absolute',
      background: colors.sun,
      maxHeight: 60,
      maxWidth: 60,
      width: `calc(${ICON_DIMENSION_CALC})`,
      height: `calc(${ICON_DIMENSION_CALC})`,
      top: `calc(${ICON_DIMENSION_CALC} * ${topMod} + ${iconBottomSpacing}px * ${topMod} + ${SCREEN_VERTICAL_PADDING}px)`,
      left: `calc((${ICON_DIMENSION_CALC} * ${leftMod}) + (${ICON_HORIZONTAL_PADDING}px * 2 * ${leftMod}) + ${SCREEN_HORIZONTAL_PADDING}px + ${ICON_HORIZONTAL_PADDING}px)`,
      borderRadius: 10,
      cursor: 'pointer',
    },
  })

  console.log(styles)
  return styles
}

const children = (() => {
  const children = []
  for (let childIndex = 0; childIndex < 20; childIndex++) {
    children.push({ childIndex });
  }
  return children
})();

const generateRandomShiverSequence = () => {
  const oddZero = Math.round(Math.random())
  const randomDegree1 = Math.ceil(Math.random() * 2) + 2 // somewhere between 2 and 5
  const randomDegree2 = Math.ceil(Math.random() * 2) + 2 // somewhere between 2 and 5
  const negFirst = Math.round(Math.random())

  if (oddZero) {
    return [
      '0deg', 
      `${negFirst ? '-' : ''}${randomDegree1}deg`, 
      '0deg', 
      `${!negFirst ? '-' : ''}${randomDegree2}deg`,
    ];
  }
  return [
    `${negFirst ? '-' : ''}${randomDegree1}deg`, 
    '0deg', 
    `${!negFirst ? '-' : ''}${randomDegree2}deg`,
    '0deg', 
  ];
}

const ExperimentalPage = () => {
  const screenRef = React.useRef(null)
  const [isEditing, setIsEditing] = React.useState(false);
  const [tapTimeoutRef, setTapTimeoutRef] = React.useState(null);
  const [movingMode, setMovingMode] = React.useState(false);

  const onIconPress = () => {
    const timeoutRef = setTimeout(() => {
      setMovingMode(true);
      setTapTimeoutRef(null);
    }, 700) // time is somehow tied to whileTap duration
    setTapTimeoutRef(timeoutRef);
  }

  const onIconRelease = () => {
    /**
    * on release
    * need to snap the moving icon back into place. 
    * we should know the order, and thus the coords.
    */
  }

  return (
    <Layout>
      <SEO title="experimental" />
      <div className={css(styles.centerWrapper)}>
        <div className={css(styles.iphoneScreen)} ref={screenRef}>
          {children.map(child => (
            <motion.div
              className={css(generateAppIconStyles(child.childIndex).appIcon)}
              key={child.childIndex}
              whileTap={{
                scale: [null, 1, 0.9, 1.1],
                opacity: [null, 0.5, 0.5, 1],
                duration: 1.5,
              }}
              drag
              dragConstraints={screenRef}
              onMouseDown={onIconPress}
              onMouseUp={onIconRelease}
              animate={movingMode && {
                rotate: generateRandomShiverSequence(),
                transition: {
                  duration: Math.max((Math.random() + 2.5), 3) / 10,
                  repeat: Infinity,
                },
                /**
                 * Notes: the real iphone animation has more than one sequence.
                 * It changes rotation strategy, incrementally, over time
                 * It also does seem to very slightly move left/right/up/down
                 * It's frankly just more dynamic and fun
                 * whereas this current implementation is stiff
                 */ 
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExperimentalPage;

/**
 * maintaining order
 * could keep state with ordering of icons 
 * when drag dimensions indicate change, set new order state. 
 * when order changes, we'll want something (maybe useEffect) to trigger motion animations
 * motion animation is seems to be a simple x->y ease. 
 * how do we trigger the motion? 
 * for each icon, if order changed before me, move. (but how do we know if order changed?)
 * can we like have the top-level component dictate x/y position for each component based on order?
 * so when it changes it animates automatically? feels hacky, would have to position absolute it
 * i like that solution because it eliminates inelegance in other ways (like having to keep track of prevOrder)
 */
