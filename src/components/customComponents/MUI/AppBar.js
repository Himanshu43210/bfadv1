import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { orange, red, grey } from '@mui/material/colors';
import User from '../User.js';
import ListItemLink from '../NavLink';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UploadMap from '../../views/UploadMap';
import StarIcon from '@mui/icons-material/Star';
import { Badge, Button, Drawer, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { useMedia } from '../../use-media.js';
import { useSelector, useDispatch } from 'react-redux';
import instance from '../../shared/axios.js';
import { useSnackbar } from 'notistack';
import { apiConstants } from '../../../pages/api/api_constants.js';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationDrawer from '../NotificationDrawer.js';
import { useEffect } from 'react';
import { useState } from 'react';

const routes = [
  {
    path: '/search/lead',
    Icon: SearchIcon,
    iconColor: orange[800],
    name: 'Search Property',
  },
  {
    path: '/propertiesShortcuts/insertOwnersQuery',
    Icon: AddIcon,
    iconColor: orange[800],
    name: "Owners's Lead",
  },
  {
    path: '/propertiesShortcuts/insertDealersQuery',
    Icon: AddIcon,
    iconColor: orange[800],
    name: "Dealer's Lead",
  },
  // {
  //   path: "/propertiesShortcuts/insertPropertyHuda",
  //   Icon: AddIcon,
  //   iconColor: orange[800],
  //   name: "HUDA Details",
  // },
  // {
  //   path: "/propertiesShortcuts/insertPropertyMap",
  //   Icon: AddIcon,
  //   iconColor: red[800],
  //   name: "Map Record",
  // },
  // {
  //   path: "/propertiesShortcuts/insertPropertyHuda",
  //   Icon: AddIcon,
  //   iconColor: orange[800],
  //   name: "Authority Details",
  // },
  // {
  //   path: "/propertiesShortcuts/insertPropertyMap",
  //   Icon: AddIcon,
  //   iconColor: red[800],
  //   name: "Map Record",
  // },

  {
    // path: "/leads?filter={%22isFavVisible%22:false,%22isCategoryVisible%22:%22false%22,%22state%22:[%22HARYANA%22],%22city%22:[%22gurugram%22],%22category%22:%22PLOT%22,%22sectorNumber%22:[],%22plotNumber%22:%22%22,%22shortlisted%22:false,%22onlyOwnerInfo%22:true,%22onlyDealerInfo%22:true,%22cornerPlot%22:false,%22parkFacing%22:false,%22direction%22:[],%22roadWidth%22:[],%22owner%22:%22%22,%22cheque%22:[],%22builtup%22:false,%22plotSize%22:[],%22size%22:[],%22serious%22:false,%22interested%22:false,%22mylist%22:true,%22_id%22:%226385d05cec99072edaecec44%22,%22module%22:%22properties%22,%22uid%22:%2263246405c0f3c5229ece2386%22}",
    path: '/Favourites/myFavourites',
    Icon: StarIcon,
    iconColor: red[800],
    name: 'My Favourite',
  },
  {
    path: '/crm',
    Icon: AddIcon,
    iconColor: red[800],
    name: 'CRM',
  },
  {
    path: '/leads/myLeads',
    Icon: SearchIcon,
    iconColor: red[800],
    name: 'My Leads',
  },
  {
    path: '/searchUser',
    Icon: SearchIcon,
    iconColor: orange[800],
    name: 'Search User',
  },

  // {
  //   path: "/dataUtility",
  //   Icon: AddIcon,
  //   iconColor: orange[800],
  //   name: "Authority Utility",
  // },
  // {
  //   path: "/dataUtility",
  //   Icon: AddIcon,
  //   iconColor: orange[800],
  //   name: "Authority Utility",
  // },
];

export default function Header({ height }) {
  const userState = useSelector((state) => state.authReducer);
  const [open, setState] = React.useState(false);
  const isMobile = useMedia('(max-width: 990px)');
  const { enqueueSnackbar } = useSnackbar();

  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const resetAllData = async () => {
    try {
      const res = await instance.post('/auth/del-specific-data');
      if (res.status === apiConstants.success) {
        enqueueSnackbar(res?.data?.message, {
          variant: 'success',
        });
      }
    } catch (error) {}
  };

  const renderDrawer = () => {
    return (
      <Drawer
        id="drawer"
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {/* The inside of the drawer */}
        <Box
          sx={{
            p: 2,
            height: 1,
          }}
          className="drawer-background"
        >
          <IconButton sx={{ mb: 2 }}>
            <CloseIcon sx={{ color: '#fff' }} onClick={toggleDrawer(false)} />
          </IconButton>

          <Divider sx={{ mb: 2, background: grey[800] }} />

          {routes.map(({ path, Icon, name }) => (
            <Box
              onClick={toggleDrawer(false)}
              key={name}
              className="header_detail"
            >
              {name != 'Authority Utility' && name != 'Search User' && (
                <ListItemLink key={path} href={path} Icon={Icon} text={name} />
              )}
              {name == 'Search User' &&
                userState.user.role == 'brokerjeeAdmin' && (
                  <ListItemLink
                    key={path}
                    href={path}
                    Icon={Icon}
                    text={name}
                  />
                )}
            </Box>
          ))}
          {/* 
          <Box sx={{ color: "white !important" }}>
            <UploadMap />
          </Box> */}
          {userState.user.isDemoUser && (
            <Button
              onClick={resetAllData}
              sx={{
                color: 'white',
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: '#f2c98547 !important',
                  color: '#f2c985',
                },
              }}
            >
              Reset all data
            </Button>
          )}
        </Box>
      </Drawer>
    );
  };

  const [drawer, setDrawer] = React.useState({
    right: false,
  });

  const toggleNotificationDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer({ right: open });
  };

  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await instance.get(`/api/v2/notifications/getNotifications`);
      setNotifications(res?.data?.result);
    } catch (error) {}
  };

  const readNotification = async (id) => {
    let value = {
      id: id,
    };
    try {
      const res = await instance.put(
        `/api/v2/notifications/markReadById`,
        value
      );
      if (res?.status == apiConstants.success) {
        getNotifications();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getNotifications();
  }, []);

  let count = 0;

  notifications.forEach((notification) => {
    if (!notification.isRead) {
      count++;
    }
  });

  return (
    <React.Fragment>
      {isMobile ? (
        <AppBar
          position="sticky"
          sx={{
            height,
          }}
          className="login_login_button_container"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            spacing={0}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box className="user-align">
              {/* <NotificationsIcon
                onClick={toggleNotificationDrawer(true)}
                sx={{
                  color: '#f9c56d',
                  height: 26,
                  width: 26,
                  cursor: 'pointer',
                }}
              /> */}
              <User />
            </Box>
          </Stack>

          {renderDrawer()}
        </AppBar>
      ) : (
        <AppBar
          position="sticky"
          sx={{
            height,
          }}
          className="login_login_button_container"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0}
          >
            <img
              src={`${
                userState.user.email == 'demopropertydealer@property24x7.in'
                  ? '/assets/logo/brokerJee.png'
                  : '/assets/logo/p247.png'
              }`}
              alt="logo"
              className="imgwidth"
            />
            {routes.map(({ path, Icon, name }) => (
              <Box key={name} className="header_detail">
                {name != 'Authority Utility' && name != 'Search User' && (
                  <ListItemLink
                    key={path}
                    href={path}
                    Icon={Icon}
                    text={name}
                  />
                )}
                {name == 'Search User' &&
                  userState.user.role == 'brokerjeeAdmin' && (
                    <ListItemLink
                      key={path}
                      href={path}
                      Icon={Icon}
                      text={name}
                    />
                  )}
              </Box>
            ))}
            <Typography pl={2} className="header_usercompany_text">
              {userState?.user?.companyName ?? ''}
            </Typography>
            {/* <UploadMap /> */}
            {/* <Box
              sx={{
                color: "white",
              }}
            >
            </Box> */}
            {userState.user.isDemoUser && (
              <Button
                onClick={resetAllData}
                sx={{
                  color: 'white',
                  marginLeft: '10px',
                  '&:hover': {
                    backgroundColor: '#f2c98547 !important',
                    color: '#f2c985',
                  },
                }}
              >
                Reset all data
              </Button>
            )}
            <Box className="user-align">
              <Badge badgeContent={count} color="warning">
                <NotificationsIcon
                  onClick={toggleNotificationDrawer(true)}
                  sx={{
                    color: '#f9c56d',
                    height: 26,
                    width: 26,
                    cursor: 'pointer',
                    mr: 1,
                  }}
                />
              </Badge>
              <User />
            </Box>
          </Stack>
          <NotificationDrawer
            toggleNotificationDrawer={toggleNotificationDrawer}
            drawer={drawer}
            notifications={notifications}
            readNotification={readNotification}
          />
        </AppBar>
      )}
    </React.Fragment>
  );
}
