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
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

var Downloader = require('mt-files-downloader');
const homedir = require('os').homedir();
var url = require('url');
var path = require('path');
var mtd = require('zeltice-mt-downloader');

import './main.css';
import './sidebar.css';
import './dashBoard.css';

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
    flexBasis: '100%',
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

  const [expanded, setExpanded] = useState(false);
  const [course, setCourse] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(false);

  const courseSelect = (id) => {
    console.log(id);
    setSelectedCourse(id);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const courseDownload = (id, index, name) => {
    axios
      .get(
        `https://www.udemy.com/api-2.0/users/me/subscribed-courses/${selectedCourse}/lectures/${id}/?fields[lecture]=asset,description,download_url,is_free,last_watched_second&fields[asset]=asset_type,length,media_license_token,course_is_drmed,media_sources,captions,thumbnail_sprite,slides,slide_urls,download_url`,
        {
          headers: {
            Authorization: `Bearer 09YqmxwEbl96SZE3XbFKPG1nHrfULt5DjwbcKLto`,
          },
        }
      )
      .then((res) => {
        const media = res.data.asset.media_sources.find(
          (media) => media.label === '144'
        );
        var target_url = media.src;
        var file_name = path.basename(url.parse(target_url).pathname);
        var file_path = homedir + `/Downloads/${index}-${name}`;
        var options = {
          //To set the total number of download threads
          count: 8, //(Default: 2)

          //To set custom headers, such as cookies etc.
          headers: { cookies: 'abc=pqr;' },

          //HTTP method
          method: 'GET', //(Default: GET)

          //HTTP port
          port: 80, //(Default: 80)

          //If no data is received the download times out. It is measured in seconds.
          timeout: 5, //(Default: 5 seconds)

          //Control the part of file that needs to be downloaded.
          range: '0-100', //(Default: '0-100')

          //Triggered when the download is started
          onStart: function (meta) {
            console.log('Download Started', meta);
          },

          //Triggered when the download is completed
          onEnd: function (err, result) {
            if (err) console.error(err);
            else console.log('Download Complete');
          },
        };
        var downloader = new mtd(file_path, target_url, options);

        downloader.start();
      });
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
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;
    axios
      .get(
        `https://www.udemy.com/api-2.0/courses/${selectedCourse}/subscriber-curriculum-items/?page_size=1400&fields[lecture]=title,object_index,is_published,sort_order,created,asset,supplementary_assets,is_free&fields[quiz]=title,object_index,is_published,sort_order,type&fields[practice]=title,object_index,is_published,sort_order&fields[chapter]=title,object_index,is_published,sort_order&fields[asset]=title,filename,asset_type,status,time_estimation,is_external&caching_intent=True`,
        {
          headers: {
            Authorization: `Bearer 09YqmxwEbl96SZE3XbFKPG1nHrfULt5DjwbcKLto`,
          },
        }
      )
      .then((res) => {
        let index = 0,
          data = [];
        res.data.results.map((r) => {
          if (r._class == 'chapter') {
            index++;
            data[index] = { ...r, children: [] };
          } else {
            data[index]['children'].push({ ...r });
          }
        });
        setCourseList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCourse]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              {course &&
                course.map((courses) => (
                  <Card
                    key={courses.id}
                    className={classes.firstRoot}
                    onClick={() => courseSelect(courses.id)}
                  >
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
            <section className={classes.root}>
              {courseList &&
                courseList.map((course, index) => (
                  <Accordion
                    key={course.id}
                    expanded={expanded === `panel${course.id}`}
                    onChange={handleChange(`panel${course.id}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <List className={classes.root}>
                        <ListItemText
                          primary={'Section ' + index + ': ' + course.title}
                        />
                      </List>
                      <IconButton>
                        <GetAppIcon className={classes.downIcon} />
                      </IconButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List className={classes.root}>
                        {course.children.map((item, index) => (
                          <ListItem key={item.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <PlayCircleFilledIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.title}
                              secondary={
                                item._class == 'lecture' &&
                                Math.floor(item.asset.time_estimation / 60) +
                                  ' min'
                              }
                            />
                            <IconButton
                              aria-label="previous"
                              onClick={() =>
                                courseDownload(item.id, index, item.asset.title)
                              }
                            >
                              <GetAppIcon className={classes.downIcon} />
                            </IconButton>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </section>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
