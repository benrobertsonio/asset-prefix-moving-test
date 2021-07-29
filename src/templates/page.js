import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ pageContext }) => (
  <main>
    <h1>Page {pageContext.title}</h1>
  </main>
);

Page.propTypes = {};

export default Page;