import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './main.css';
import './sidebar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  sroot: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  firstRoot: {
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
    paddingLeft: theme.spacing(19),
    marginTop: -25,
  },
  downIcon: {
    width: 25,
    background: 'transparent',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [course, setCourse] = useState([]);
  const [courseList, setCourseList] = useState([]);

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

  useEffect(() => {
    axios
      .get(
        `https://www.udemy.com/api-2.0/courses/2454958/subscriber-curriculum-items/?page_size=1400&fields[lecture]=title,object_index,is_published,sort_order,created,asset,supplementary_assets,is_free&fields[quiz]=title,object_index,is_published,sort_order,type&fields[practice]=title,object_index,is_published,sort_order&fields[chapter]=title,object_index,is_published,sort_order&fields[asset]=title,filename,asset_type,status,time_estimation,is_external&caching_intent=True`,
        {
          headers: {
            Authorization: `Bearer 09YqmxwEbl96SZE3XbFKPG1nHrfULt5DjwbcKLto`,
          },
        }
      )
      .then((res) => {
        setCourseList(res.data.results);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, []);

  const index = 0;
  const accord = {};

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              {course.map((courses) => (
                <Card key={courses.id} className={classes.firstRoot}>
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
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <div className={classes.root}>
              {accord.map((courseLists) => (
                {
                if(chapter){
                   index ++;
                  obj[index] = {...data, children:[]}
                }
                else{
                  obj:[index] [children].push(...data)
                }
                
                 
              }
                
                <Accordion
                  key={courseLists.id}
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{courseLists.title}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
