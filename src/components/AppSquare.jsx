import React from 'react'
import { motion } from 'framer-motion'
import { css, StyleSheet } from 'aphrodite';
import { tintColor } from '../utils/color'
import * as colors from '../tokens/colors'

// copied from experimental page, figure it out
export const HEIGHT_PERCENTAGE = 80
export const SCREEN_WIDTH_CALC = `100vh * ${HEIGHT_PERCENTAGE/100} * (375/812)`
export const ICONS_PER_ROW = 4
export const SCREEN_VERTICAL_PADDING = 20
export const SCREEN_HORIZONTAL_PADDING = 10
export const ICON_HORIZONTAL_PADDING = 10
export const ICON_DIMENSION_CALC = `(${SCREEN_WIDTH_CALC} - (${SCREEN_HORIZONTAL_PADDING * 2 + ICON_HORIZONTAL_PADDING * 2 * ICONS_PER_ROW}px)) * (1/${ICONS_PER_ROW})`

const generateAppIconStyles = (iconIndex, color) => {
  // const topMod = Math.floor(iconIndex / ICONS_PER_ROW)
  // const leftMod = iconIndex % ICONS_PER_ROW
  // const iconBottomSpacing = 25

  const styles = StyleSheet.create({
    appIcon: {
      margin: 10,
      // position: 'absolute',
      background: color,
      maxHeight: 60,
      maxWidth: 60,
      width: `calc(${ICON_DIMENSION_CALC})`,
      height: `calc(${ICON_DIMENSION_CALC})`,
      // top: `calc(${ICON_DIMENSION_CALC} * ${topMod} + ${iconBottomSpacing}px * ${topMod} + ${SCREEN_VERTICAL_PADDING}px)`,
      // left: `calc((${ICON_DIMENSION_CALC} * ${leftMod}) + (${ICON_HORIZONTAL_PADDING}px * 2 * ${leftMod}) + ${SCREEN_HORIZONTAL_PADDING}px + ${ICON_HORIZONTAL_PADDING}px)`,
      borderRadius: 10,
      cursor: 'pointer',
    },
  })

  return styles
}

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

export const AppSquare = (props) => {
  const { isMovingMode, index, dragConstraints, meta, onDrag, onDragStart, onDragEnd, onUpdateRef, ...htmlProps } = props
  const [color] = React.useState(tintColor(colors.sun, 0.2))
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      onUpdateRef(meta, ref)
    }
  }, [ref])

  return (
    <motion.div
      layout
      ref={ref}
      {...htmlProps}
      className={css(generateAppIconStyles(index, color).appIcon)}
      whileTap={{
        scale: [null, 1, 0.9, 1.1],
        opacity: [null, 0.5, 0.5, 1],
        duration: 1.5,
      }}
      drag
      dragConstraints={dragConstraints}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      animate={isMovingMode && {
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
  )
}
