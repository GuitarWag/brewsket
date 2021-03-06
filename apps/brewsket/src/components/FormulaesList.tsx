import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { map } from 'lodash';
import * as React from 'react';
import { ChangeEvent, useCallback } from 'react';

import {
  useFormulaesSearchData,
  useLoadFormulaesSearch,
} from '../store/formulaes-search';
import { useLoadFormulaesListOnMount } from '../store/full-formulas-list';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    margin: '10px auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
});

export const FormulaesListInternal: React.FC = () => {
  const classes = useStyles();
  useLoadFormulaesListOnMount(null);
  const search = useLoadFormulaesSearch();
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      search({ text: e.target.value });
    },
    [search],
  );
  const data = useFormulaesSearchData();
  return (
    <Container>
      <TextField onChange={onChange} />
      {map(data, item => (
        <Card className={classes.root} key={item.name} elevation={10}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Name
            </Typography>
            <Typography variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Description
            </Typography>
            <Typography variant="body2" component="h2">
              {item.desc}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
              Version
            </Typography>
            <Typography variant="body2" component="p">
              {item.versions.stable}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => window.open(item.homepage)}>
              See site
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export const FormulaesList: React.FC = () => <FormulaesListInternal />;
