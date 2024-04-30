import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { BiHomeSmile, BiUser, BiBowlHot, BiCheckShield, BiCompass } from "react-icons/bi";

function DashSidebar(props) {

  const menulist = [
    {
      menuID: 1,
      menuTitle: 'Home',
    },
    {
      menuID: 2,
      menuTitle: 'Users',
    },
    {
      menuID: 3,
      menuTitle: 'OrderOnline',
    },
    {
      menuID: 4,
      menuTitle: 'Reservations',
    }
  ];

  const [selectedMenu, selectedMenuSet] = useState('Home');

  const renderIcon = (icon) => {
    switch (icon) {
      case "Home":
        return <BiHomeSmile />;
      case "Users":
        return <BiUser />;
      case "OrderOnline":
        return <BiBowlHot />;
      case "Reservations":
        return <BiCheckShield />;
      default:
        return <BiCompass />
    }
  }

  return (
    <div className={props.sidebarCtrl}>
      <ul className='sidebar' id='scrollable'>
        {menulist?.map((item, index) => (
          <li key={index.toString()}>
            <Link to={item.menuTitle}
              className={selectedMenu === item.menuTitle ? 'active' : ''}
              onClick={() => selectedMenuSet(item.menuTitle)}>
              <i>{renderIcon(item.menuTitle)}</i>
              <title className={props.titleCtrl}>{item.menuTitle}</title></Link>
            {/* {selectedMenu === item.menuTitle &&
              <ul>
                {item.nestedMenulist?.map((cItem, index) => (
                  <li key={index.toString()}><Link to={cItem.cMenuItem}>{cItem.cMenuItem}</Link> </li>
                ))}
              </ul>
            } */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashSidebar;


