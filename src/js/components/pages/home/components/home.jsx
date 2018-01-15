import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const Home = props => (
  <div className="home-page">
    <Helmet title="Home Title" />
    {props.message}
    <Link to="/about">Go to About</Link>
  </div>
);

Home.propTypes = {
  message: React.PropTypes.string,
};

export default Home;
