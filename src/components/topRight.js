import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const TopRight = ({ siteTitle }) => (
  <>
    <div
      style={{
        position: 'absolute',
        right: 0,
        opacity: 0.8,
        minWidth: 320,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 320,
          padding: `1.45rem 1.0875rem`,
          textAlign: 'right',
        }}
      >
        <h1 style={{ color: '#2a5739', margin: 0, fontSize: 16, lineHeight: 1.8 }}>time of day</h1>
        <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.8 }}>
          <Link
            to="/"
            style={{
              color: `#2a5739`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <h1 style={{ margin: 0, fontSize: 16, lineHeight: 1.8 }}>
          <Link
            to="/"
            style={{
              color: `#2a5739`,
              textDecoration: `none`,
            }}
          >
            link 1
          </Link>
        </h1>
        <h1 style={{ margin: 0, fontSize: 16, lineHeight: 1.8 }}>
          <Link
            to="/"
            style={{
              color: `#2a5739`,
              textDecoration: `none`,
            }}
          >
            link 2
          </Link>
        </h1>
        <h1 style={{ margin: 0, fontSize: 16, lineHeight: 1.8 }}>
          <Link
            to="/"
            style={{
              color: `#2a5739`,
              textDecoration: `none`,
            }}
          >
            link 3
          </Link>
        </h1>
      </div>
    </div>
  </>
)

TopRight.propTypes = {
  siteTitle: PropTypes.string,
}

TopRight.defaultProps = {
  siteTitle: ``,
}

export default TopRight
