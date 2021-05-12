import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './sidebar.css';
import './main.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
    marginTop: '3px',
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: -10,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    minWidth: 90,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(12),
    marginTop: -25,
  },
  downIcon: {
    width: 25,
    background: 'transparent',
  },
  secroot: {
    width: '100%',
    marginLeft: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [course, setCourse] = useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axios
      .get(
        `https://www.udemy.com/api-2.0/users/me/subscribed-courses/?ordering=-last_accessed`,
        {
          headers: {
            Authorization: `Bearer 09YqmxwEbl96SZE3XbFKPG1nHrfULt5DjwbcKLto`,
          },
        }
      )
      .then((res) => {
        setCourse(res.data.results);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, []);

  return (
    <div className={classes.secroot}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <div>
            {course.map((courses) => (
              <Card key={courses.id} className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  image={courses.image_125_H}
                  title="Live from space album cover"
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Link className="link" to="#">
                      {courses.title}
                    </Link>
                  </CardContent>
                  <div className={classes.controls}>
                    <IconButton aria-label="previous">
                      <GetAppIcon className={classes.downIcon} />
                    </IconButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.secroot}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                General settings
              </Typography>
              <Typography className={classes.secondaryHeading}>
                I am an accordion
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </main>
    </div>
  );
}
