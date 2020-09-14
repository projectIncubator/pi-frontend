import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Typography,
  Button,
  Divider
} from '@material-ui/core';

import ExploreCard from '../components/ExploreCard';
import FeaturedCard from '../components/FeaturedCard';

import { themes, projectStubs, projectStubsFeatured } from '../mocks';
import { projectStubType } from '../types';

const useStyles = makeStyles((theme) => ({
  content: {
    borderTop: 'none',
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  container: {
    display: 'flex',
    flexFlow: 'row',
    padding: theme.spacing(3)
  },
  themeSelectors: {
    display: 'flex',
    flexFlow: 'row',
    padding: theme.spacing(2),
    justifyContent: 'center'
  },
  themeSelectButton: {
    margin: theme.spacing(0, 2)
  },
  sidebar: {
    flex: 1,
    margin: theme.spacing(10, 2),
    display: 'flex',
    flexFlow: 'column'
  },
  categories: {
    flex: 3,
    margin: theme.spacing(2)
  },
  themeTitle: {
    textTransform: 'capitalize'
  },
  seeMoreButton: {
    display: 'flex', 
    justifyContent: 'center'
  },
  featured: {
    flex: 2,
    margin: theme.spacing(2)
  }
}));

function Explore(props) {
  const classes = useStyles();

  const [projects, setProjects] = useState([]);
  const [themeMocks, setThemes] = useState(null);
  const [projectsFeatured, setProjectsFeatured] = useState([]);

  useEffect(() => {
    setProjects(projectStubs);
    setThemes(themes);
    setProjectsFeatured(projectStubsFeatured);
  }, []);

  // TODO: figure out how to correctly couple themes

  const renderThemeSelectors = () => {
    console.log(projects);
    console.log(themeMocks);
    return (
      Object.keys(themeMocks).map((key, index) => (
        <div className={classes.themeSelectButton}>
          <Button
              key={"theme-"+key+"-button"}
              variant="contained"
              color={index % 2 === 0 ? 'primary' : 'secondary'}
              size="large"
          >
            {themeMocks[key].name}
          </Button>
        </div>
      ))
    )
  };



  const renderCategories = () => {
    return (
      <div>
        <Typography variant="h5" className={classes.header}>
        Explore
        </Typography>
        {Object.keys(themeMocks).map((key) => (
          <div key={key}>
            <Typography variant="h6" color="primary" className={classes.themeTitle}>
            {themeMocks[key].name}
            </Typography>
            <div>
            {projects
              .filter((proj) => proj.themes.includes(themeMocks[key]))
              .map((item, index) => (
                <ExploreCard key={"explore-"+themeMocks[key].name+"-"+index} project={item} />
              ))}
            </div>
            <div className={classes.seeMoreButton}>
              <Button
                key={"explore-"+key+"-button"}
                variant="outlined"
                color="primary"
                size="large"
              >
                See more projects in this theme
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  };

  const renderFeatured = () => {
    return (
      <div>
        <Typography variant="h5" className={classes.header}>
          Featured
        </Typography>
        {/* todo: de-couple projectStubsFeatured */}
        <FeaturedCard key={"featured"} featured={projectsFeatured[0]} />
      </div>
    )
  }

  return (
    <Paper className={classes.content}>
      <div className={classes.themeSelectors}>{renderThemeSelectors()}</div>
      <Divider />
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <Typography variant="h6" align="right">Hot</Typography>
          <Typography variant="h6" align="right">Top</Typography>
          <Typography variant="h6" align="right">Rising</Typography>
        </div>
        <Divider orientation="vertical" flexItem="true"/>
        <div className={classes.categories}>{renderCategories()}</div>
        <div className={classes.featured}>{renderFeatured()}</div>
      </div>
    </Paper>
  )
}

export default Explore;
