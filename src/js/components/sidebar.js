import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';

import './sidebar.css';

const useStyles = makeStyles((theme) => ({
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
}));

export default function SideBar() {
  const classes = useStyles();

  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.udemy.com/api-2.0/users/me/subscribed-courses`, {
        headers: {
          Authorization: `Bearer 09YqmxwEbl96SZE3XbFKPG1nHrfULt5DjwbcKLto`,
        },
      })
      .then((res) => {
        setCourse(res.data.results);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, []);

  return (
   
  );
}
