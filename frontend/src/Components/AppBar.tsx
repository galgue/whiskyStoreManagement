import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, BATCHES_BARRELS_TYPE_ROUTE, PROCCESS_MANAGEMENT_ROUTE, CHAIN_OF_PROCCESS_MANAGEMENT_ROUTE, USER_MANAGEMENT_ROUTE, BATCHES_BARRELS_ROUTE, MISSON_MANAGEMENT_ROUTE, COMMENTS_ROUTE, BARREL_USAGE_ROUTE, DASHBOARD_ROUTE } from '../Components/Routes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BatchesTable } from './Tables/BerralBatch/BatchesBarrelsTable';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUser, loggoutUser } from '../Actions/actionsCreator';
import { UserController } from '../controllers/users.controller';
import { stateProps } from './interfaces';


const drawerWidth = 240;

const listItemsBeforeDivider = [{
    name: 'ניהול אצוות חבית',
    route: BATCHES_BARRELS_ROUTE
},
{
    name: 'ניהול משימות',
    route: MISSON_MANAGEMENT_ROUTE
},
{
    name: 'ניהול הערות',
    route: COMMENTS_ROUTE
},
{
    name: 'ניהול שימוש בחביות',
    route: BARREL_USAGE_ROUTE
}
];

const listItemsAfterDivider = [{
    name: 'ניהול סוגי חבית',
    route: BATCHES_BARRELS_TYPE_ROUTE
},
{
    name: 'ניהול תהליכים',
    route: PROCCESS_MANAGEMENT_ROUTE
},
{
    name: 'ניהול שרשראות תהליכים',
    route: CHAIN_OF_PROCCESS_MANAGEMENT_ROUTE
},
{
    name: 'ניהול משתמשים',
    route: USER_MANAGEMENT_ROUTE,
    managerOnly: true
},
{
    name: 'דאשבורד',
    route: DASHBOARD_ROUTE,
}
]
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        websiteName: {
            marginRight: '1vw'
        },
        navBarLink: {
            textDecoration: 'none',
            fontSize: '1rem'
        },
        logOut: {
            color: 'white',
            marginRight: '70vw'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginRight: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: -drawerWidth,
        },
    }),
);


export const WebsiteBar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { loggedUser } = useSelector((state: stateProps) => state.appState);
    const [open, setOpen] = useState(false);
    let history = useHistory();

    const handleLogOut = () => {
        UserController.logut().then(() => {
            history.push(LOGIN_ROUTE);
            dispatch(loggoutUser());
        })
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return <>
        <CssBaseline />
        {loggedUser && <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                {!open && <>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.websiteName} variant="h6" noWrap>
                        Milk & Honey
          </Typography>
                    <Typography className={classes.websiteName} variant="h6" noWrap>
                        שלום {loggedUser.userName}
                    </Typography>
                    <Button onClick={handleLogOut} className={classes.logOut}>
                        <Typography variant="h6" noWrap>
                            התנתק
          </Typography>
                        <ExitToAppIcon />
                    </Button>
                </>}
            </Toolbar>
        </AppBar>}
        {loggedUser && <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {listItemsBeforeDivider.map((item, index) => (
                    <Link className={classes.navBarLink} to={item.route}>
                        <ListItem button key={item.name}>
                            <ListItemText style={{ textAlign: 'right' }} primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {listItemsAfterDivider.map((item) => {
                    if (item.managerOnly && !loggedUser.isManager) {

                    } else {
                        return <NavLink activeStyle={{ color: 'blue' }} className={classes.navBarLink} to={item.route} >
                            <ListItem button key={item.name}>
                                <ListItemText style={{ textAlign: 'right' }} primary={item.name} />
                            </ListItem>
                        </NavLink>
                    }
                })}
            </List>
        </Drawer>}
    </>
}
