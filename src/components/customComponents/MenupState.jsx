import * as React from 'react';
import Button from '@mui/material/Button/Button.js';
import { useNavigate } from 'react-router-dom';
import SortRoundedIcon from '@mui/icons-material/SortRounded.js';
import ArticleIcon from '@mui/icons-material/Article.js';
import CallIcon from '@mui/icons-material/Call.js';
import LoginIcon from '@mui/icons-material/Login.js';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded.js';
import HomeIcon from '@mui/icons-material/Home.js';

const MenupState = ({ component }) => {
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
          {component.items.map((item) => {
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