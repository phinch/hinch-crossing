import React from 'react';

import Project from '../components/project';
import Layout from '../components/layout';
import SEO from '../components/seo';

import BlendWhite from '../assets/blendCatalyst.svg';
import BlendBig from '../assets/blendBig.jpg';

const blendDescription =
  'Blend is powering the next generation of consumer finance, providing ' +
  'easy-to-use, seamlessly integrated tools that allow borrowers to provide verified financial information. ' +
  "At Blend, I've worked on projects like upgrading our codebase from Angular 1.x to React 16; " +
  'laying the foundation for our new atomic design system; and building the ' +
  '<a target="_blank" href="https://www.blend.com/one-tap/">one-tap mortgage experience</a>.';

const ProjectsPage = () => (
  <Layout>
    <SEO title="projects" />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      <Project
        projectTitle="blend"
        projectSubtitle="building white-label consumer finance ui"
        mainImage={BlendWhite}
        mainImageAlt={'Blend Logo'}
        innerImage={BlendBig}
        innerImageAlt={'Blend - the home-buying journey'}
        descriptionText={blendDescription}
      />
      <Project
        projectTitle="project name"
        projectSubtitle="work that i did"
        mainImage={''}
        innerImage={''}
        descriptionText={'look at the work i did'}
      />
      <Project
        projectTitle="project name"
        projectSubtitle="work that i did"
        mainImage={''}
        innerImage={''}
        descriptionText={'look at the work i did'}
      />
      <Project
        projectTitle="project name"
        projectSubtitle="work that i did"
        mainImage={''}
        innerImage={''}
        descriptionText={'look at the work i did'}
      />
    </div>
  </Layout>
);

export default ProjectsPage;
