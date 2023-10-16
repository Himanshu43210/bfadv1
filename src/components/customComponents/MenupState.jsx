import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import ArticleIcon from '@mui/icons-material/Article';
import CallIcon from '@mui/icons-material/Call';
import LoginIcon from '@mui/icons-material/Login';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import HomeIcon from '@mui/icons-material/Home';

const MenupState = (MenuItems) => {
  const [open, setOpen] = React.useState(false);
  const [visited, setVisited] = React.useState(false);
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  const handleMouseLeave = () => {
    if (visited || isMobile) {
      setOpen(false);
      setVisited(false);
    }
  };

  const getIcons = (key) => {
    switch (key) {
      case "HOME":
        return <HomeIcon className='menu_item_icon' />;
      case "LOGIN":
        return <LoginIcon className='menu_item_icon' />;
      case "CONTACT":
        return <CallIcon className='menu_item_icon' />;
      case "DOC":
        return <ArticleIcon className='menu_item_icon' />;
      case "ORG":
        return <PeopleAltRoundedIcon className='menu_item_icon' />;
      default:
        return null;
    }
  };

  return (
    <div className='menu_comp' onMouseLeave={handleMouseLeave}>
      <Button className={`menu_btn ${open && "main_menu_open"}`} onClick={() => setOpen(!open)}>
        {/* <BiMenuAltLeft size={30} color="blue" /> */}
        <SortRoundedIcon className='main_menu_icon' />
        <span className='menu_btn_label'>Menu</span>
      </Button>
      {open && (
        <div className='main_menu_popup' onMouseEnter={() => setVisited(true)}>
          {MenuItems.MenuItems.map((item) => {
            return <div onClick={() => { navigate(`${item.path}`) }} className="menu_item">
              {getIcons(item.icon)}
              <span className='menu_item_label'>{item.name}</span>
            </div>
          })}
        </div>
      )}
    </div>
  );
}

export default MenupState;