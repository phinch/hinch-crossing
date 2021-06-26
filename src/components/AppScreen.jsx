import React from 'react';

import * as colors from '../tokens/colors'
import { css, StyleSheet } from 'aphrodite';

import { AppSquare, ICONS_PER_ROW, ICON_HORIZONTAL_PADDING } from '../components/AppSquare';

const HEIGHT_PERCENTAGE = 80
const SCREEN_WIDTH_CALC = `100vh * ${HEIGHT_PERCENTAGE/100} * (375/812)`
const SCREEN_VERTICAL_PADDING = 20
const SCREEN_HORIZONTAL_PADDING = 10
const NUM_ICONS = 20

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
  for (let childIndex = 0; childIndex < NUM_ICONS; childIndex++) {
    children.push({ childIndex, order: childIndex });
  }
  return children
})();

export const AppScreen = () => {
  const screenRef = React.useRef(null)
  const [_tapTimeoutRef, setTapTimeoutRef] = React.useState(null);
  const [movingMode, setMovingMode] = React.useState(false);
  const [iconOrder, setIconOrder] = React.useState(children);
  const [iconRefs, setIconRefs] = React.useState({});
  const [initialDragPosition, setInitialDragPosition] = React.useState({ x: -1, y: -1 });
  const [iconBeingDragged, setIconBeingDragged] = React.useState(null);

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

  const onIconDragStart = (icon, event, info) => {
    setIconBeingDragged(icon)
    setInitialDragPosition(info.point)
  }

  const onIconDrag = (event, info) => {
    // rearrange icon order if needed.
    // need to move icon out of the normal order if it is dragged out
    // based on icon's position (info.offset.x/y, info.point.x/y), can determine where in order it belongs
    // although ^ relies on...some pixel stuff, or refs
    const { top, left } = screenRef.current.getBoundingClientRect();
    const { x, y } = info.point;
    const iconWidth = iconRefs[0].current.getBoundingClientRect().width + ICON_HORIZONTAL_PADDING * 2;
    const iconHeight = iconRefs[0].current.getBoundingClientRect().height + ICON_HORIZONTAL_PADDING * 2;
    const iconRow = Math.floor(Math.max(y - top, 0) / iconWidth)
    const iconColumn = Math.floor(Math.max(x - left, 0) / iconHeight)
    const posIndex = iconRow * ICONS_PER_ROW + iconColumn
    const currIndex = iconOrder.findIndex(icon => icon.childIndex === iconBeingDragged.childIndex)

    if (posIndex >= NUM_ICONS - 1 && currIndex !== iconOrder.length - 1) {
      // moveFromTo(currIndex, iconOrder.length - 1);
    } else {
      // moveFromTo(currIndex, posIndex)
    }
  }

  const onIconDragEnd = (event, info) => {
    // snap into place (maybe unneeded?)
    // seems like it's kind of flaky if it puts it back in flex order or not
    setIconBeingDragged(null)
    setInitialDragPosition({ x: -1, y: -1 })
  }

  const onUpdateIconRef = (icon, ref) => {
    setIconRefs(prevRefs => ({
      ...prevRefs,
      [icon.childIndex]: ref,
    }))
  }

  return (
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
            onDragStart={(event, info) => onIconDragStart(icon, event, info)}
            onDragEnd={onIconDragEnd}
            onMouseDown={onIconPress}
            onMouseUp={onIconRelease}
            isMovingMode={movingMode}
          />
        ))}
      </div>
    </div>
  );
};

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
