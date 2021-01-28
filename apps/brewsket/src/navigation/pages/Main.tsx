import {
  AppBar,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

import { FormulaesList } from '../../components/FormulaesList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton */}
        {/*  edge="start" */}
        {/*  className={classes.menuButton} */}
        {/*  color="inherit" */}
        {/*  aria-label="menu" */}
        {/* > */}
        {/*  <MenuIcon /> */}
        {/* </IconButton> */}
        <Typography variant="h6" className={classes.title}>
          Brewsket
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};
export const Main: React.FC = () => (
  <>
    <Header />
    <Container>
      <FormulaesList />
    </Container>
  </>
);
