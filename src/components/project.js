import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  Project: {
    transition: 'all 0.6s ease',
  },
  compactProject: {
    minWidth: 320,
    width: '35%',
    height: '70vh',
    minHeight: 240,
    cursor: 'pointer',
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    border: '1px solid black',
  },
  titleWrapperCompact: {},
  titleCompact: {
    fontSize: 24,
  },
  subtitleCompact: {
    fontSize: 16,
  },
  mainImageCompact: {
    maxWidth: 150,
  },
  innerImageCompact: {
    display: 'none',
  },

  expandedProject: {
    background: 'linear-gradient(180deg, #fcebe0 0%, #ddab7b 100%)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: '0.8',
    zIndex: 2,
    display: 'flex',
  },
  expandedContent: {
    marginLeft: 48,
    height: '70%',
    minHeight: 600,
    minWidth: 520,
    width: '48%',
    marginTop: 48,
  },
  titleWrapperExpanded: {
    height: '30%',
  },
  titleExpanded: {},
  subtitleExpanded: {},
  mainImageExpanded: {},
  innerImageExpanded: {
    position: 'absolute',
    top: '5%',
    right: '3%',
    maxWidth: '42%',
    zIndex: 2,
    opacity: 0.9,
    ':hover': {
      opacity: 1,
    },
  },
  descriptionExpanded: {
    zIndex: 3,
  },
});

const Compact = ({ onExpand, ...props }) => {
  const {
    projectTitle,
    projectSubtitle,
    mainImage,
    mainImageAlt,
    innerImage,
    innerImageAlt,
  } = props;
  return (
    <div
      key={`${projectTitle}-compact`}
      onClick={onExpand}
      className={css(styles.compact)}
    >
      <img
        className={css(styles.mainImageCompact)}
        src={mainImage}
        alt={mainImageAlt}
      />
      <div className={css(styles.titleWrapperCompact)}>
        <h1 className={css(styles.titleCompact)}>{projectTitle}</h1>
        <h2 className={css(styles.subtitleCompact)}>{projectSubtitle}</h2>
      </div>
      <img
        className={css(styles.innerImageCompact)}
        src={innerImage}
        alt={innerImageAlt}
      />{' '}
    </div>
  );
};

const Expanded = ({ onCompact, ...props }) => {
  const {
    projectTitle,
    projectSubtitle,
    mainImage,
    mainImageAlt,
    innerImage,
    innerImageAlt,
    descriptionText,
  } = props;
  return (
    <div className={css(styles.expandedOverlay)}>
      <div
        key={`${projectTitle}-expanded`}
        className={css(styles.expandedContent)}
      >
        <div className={css(styles.titleWrapperExpanded)}>
          <img
            className={css(styles.mainImageExpanded)}
            src={mainImage}
            alt={mainImageAlt}
          />
          <h1 className={css(styles.titleExpanded)}>{projectTitle}</h1>
          <h2 className={css(styles.subtitleExpanded)}>{projectSubtitle}</h2>
        </div>
        <p
          className={css(styles.descriptionExpanded)}
          dangerouslySetInnerHTML={{ __html: descriptionText }}
        />
      </div>
      <button onClick={onCompact} className={css(styles.closeButton)}>
        closee
      </button>
      <img
        className={css(styles.innerImageExpanded)}
        src={innerImage}
        alt={innerImageAlt}
      />
    </div>
  );
};

class Project extends React.Component {
  state = {
    expanded: false,
  };

  render() {
    const { expanded } = this.state;
    return (
      <div
        className={css(
          styles.Project,
          expanded ? styles.expandedProject : styles.compactProject,
        )}
      >
        {expanded ? (
          <Expanded
            onCompact={() => this.setState({ expanded: false })}
            {...this.props}
          />
        ) : (
          <Compact
            onExpand={() => this.setState({ expanded: true })}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

export default Project;
