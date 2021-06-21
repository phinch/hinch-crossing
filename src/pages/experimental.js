import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import * as colors from '../tokens/colors'
import { css, StyleSheet } from 'aphrodite';

import { AppSquare } from '../components/AppSquare';

const HEIGHT_PERCENTAGE = 80
const SCREEN_WIDTH_CALC = `100vh * ${HEIGHT_PERCENTAGE/100} * (375/812)`
const SCREEN_VERTICAL_PADDING = 20
const SCREEN_HORIZONTAL_PADDING = 10

const styles = StyleSheet.create({
  centerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  iphoneScreen: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    position: 'relative',
    maxWidth: 375,
    width: `calc(${SCREEN_WIDTH_CALC})`,
    maxHeight: 812,
    height: `${HEIGHT_PERCENTAGE}%`,
    borderRadius: 20,
    background: colors.moss,
    padding: `${SCREEN_VERTICAL_PADDING}px ${SCREEN_HORIZONTAL_PADDING}px`,
  },
})

const children = (() => {
  const children = []
  for (let childIndex = 0; childIndex < 20; childIndex++) {
    children.push({ childIndex, order: childIndex });
  }
  return children
})();

const ExperimentalPage = () => {
  const screenRef = React.useRef(null)
  const [_tapTimeoutRef, setTapTimeoutRef] = React.useState(null);
  const [movingMode, setMovingMode] = React.useState(false);
  const [iconOrder, setIconOrder] = React.useState(children);
  const [iconRefs, setIconRefs] = React.useState({});

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

  const moveFromTo = (fromIndex, toIndex) => {
    setIconOrder(prevOrder => {
      const newOrder = [...prevOrder]
      const removedItems = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, ...removedItems)
      return newOrder;
    })
  }

  const onIconDragStart = (event, info) => {
    // save initial position info
    console.log('drag start', event, info);
  }

  const onIconDrag = (event, info) => {
    // rearrange icon order if needed.
    // need to move icon out of the normal order if it is dragged out
    // based on icon's position (info.offset.x/y, info.point.x/y), can determine where in order it belongs
    // although ^ relies on...some pixel stuff, or refs

    console.log(event, info)
  }

  const onIconDragEnd = (event, info) => {
    // snap into place (maybe unneeded?)
    // seems like it's kind of flaky if it puts it back in flex order or not
    console.log('drag end', event, info);
  }

  const onUpdateIconRef = (iconIndex, ref) => {
    setIconRefs(prevRefs => ({
      ...prevRefs,
      [iconIndex]: ref,
    }))
  }

  return (
    <Layout>
      <SEO title="experimental" />
      <div className={css(styles.centerWrapper)}>
        <div className={css(styles.iphoneScreen)} ref={screenRef}>
          {iconOrder.map((icon, index) => (
            <AppSquare
              key={icon.childIndex}
              index={index}
              meta={icon}
              onUpdateRef={onUpdateIconRef}
              dragConstraints={screenRef}
              onDrag={onIconDrag}
              onDragStart={onIconDragStart}
              onDragEnd={onIconDragEnd}
              onMouseDown={onIconPress}
              onMouseUp={onIconRelease}
              isMovingMode={movingMode}
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
