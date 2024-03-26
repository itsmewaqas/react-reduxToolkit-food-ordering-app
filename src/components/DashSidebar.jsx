import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { BiUserPin, BiMoneyWithdraw, BiCompass } from "react-icons/bi";

function DashSidebar(props) {

  const menulist = [
    {
      menuID: 1,
      menuTitle: 'Users',
      nestedMenulist: [
        {
          cMenuID: 1,
          cMenuItem: 'SearchUserDetails',
        },
        {
          cMenuID: 2,
          cMenuItem: 'UserDetails',
        },
        {
          cMenuID: 3,
          cMenuItem: 'Users',
        },
        {
          cMenuID: 4,
          cMenuItem: 'OrderOnline',
        }
      ]
    },
    {
      menuID: 2,
      menuTitle: 'WealthManagment',
      nestedMenulist: [
        {
          cMenuID: 1,
          cMenuItem: 'Subscription',
        },
        {
          cMenuID: 2,
          cMenuItem: 'CustomerView',
        },
        {
          cMenuID: 3,
          cMenuItem: 'ExisitingApplication',
        }
      ]
    },
  ];

  const [selectedMenu, selectedMenuSet] = useState('Users');

  const renderIcon = (icon) => {
    switch (icon) {
      case "Users":
        return <BiUserPin />;
      case "WealthManagment":
        return <BiMoneyWithdraw />;
      default:
        return <BiCompass />
    }
  }

  return (
    <div className={props.sidebarCtrl}>
      <ul className='sidebar' id='scrollable'>
        {menulist?.map((item, index) => (
          <li key={index.toString()}>
            <a to={item.menuTitle}
              className={selectedMenu === item.menuTitle ? 'active' : ''}
              onClick={() => selectedMenuSet(item.menuTitle)}>
              <i>{renderIcon(item.menuTitle)}</i>
              <title className={props.titleCtrl}>{item.menuTitle}</title></a>
            {selectedMenu === item.menuTitle &&
              <ul>
                {item.nestedMenulist?.map((cItem, index) => (
                  <li key={index.toString()}><Link to={cItem.cMenuItem}>{cItem.cMenuItem}</Link> </li>
                ))}
              </ul>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashSidebar;


