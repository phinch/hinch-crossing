/**
 * Text component that accepts text and displays it in a split-flap-dispay style, with animation.
 *
 */

import React from "react"
import PropTypes from "prop-types"

function SplitFlapDisplay({ text }) {
  return (
    <React.Fragment>
      <h1 id="TODO-AltTextForScreenReading">{text}</h1>
      {text.split('').map(character => {
        <span>{character}</span>
      })}
    </React.Fragment>
  );
}

SplitFlapDisplay.propTypes = {
  text: PropTypes.string,
}

export default SplitFlapDisplay;
