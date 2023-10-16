import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';

const MenupState = (MenuItems) => {
  const navigate = useNavigate();
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button  {...bindTrigger(popupState)} className='menu_btn'>
            <BiMenuAltLeft size={30} color="blue" />
            <span className='menu_btn_label'>Menu</span>
          </Button>
          <Menu {...bindMenu(popupState)}>
            {
              MenuItems.MenuItems.map((item) => {
                return <MenuItem onClick={() => { navigate(`${item.path}`) }}>{item.name}</MenuItem>
              })
            }
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenupState;