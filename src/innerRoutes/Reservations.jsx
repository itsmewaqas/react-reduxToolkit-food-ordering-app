import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BiSolidStar,BiPlusCircle } from "react-icons/bi";
import { connect, useSelector, useDispatch } from 'react-redux';
import validateInfo from '../components/validation';
import RestaurantList from '../components/RestaurantList';
import LocationSelect from '../components/LocationSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reservations(props) {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state
  });

  const [chooseCategory, SetchooseCategory] = useState('All');
  const [datalist, Setdatalist] = useState(RestaurantList);
  const [search, Setsearch] = useState('');

  const notify = () => toast.error("Please Select Branch", {
    position: "bottom-right",
    theme: "dark"
  });

  const selectedCategory = (chooseCategory) => {
    SetchooseCategory(chooseCategory);
    if (chooseCategory == "All") {
      Setdatalist(RestaurantList);
      return;
    }
    const filteredData = RestaurantList.filter((x) => {
      return x.category == chooseCategory;
    })
    Setdatalist(filteredData);
  }

  const searchItems = (searchValue) => {
    Setsearch(searchValue)
    if (search !== '') {
      const filteredData = RestaurantList.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
      })
      Setdatalist(filteredData)
    }
    else {
      Setdatalist(RestaurantList)
    }
  }

  function selectCategory(event) {
    if (event.target.value == "All") {
      Setdatalist(RestaurantList);
    }
    else {
      const filteredData = RestaurantList.filter((x) => {
        return x.category == event.target.value;
      })
      Setdatalist(filteredData);
    }
  }

  const getCategory = ['All', ...new Set(RestaurantList.map(x => x.category))];
  console.log('getCategory', getCategory);

  const [getLocation, SetgetLocation] = useState('');
  const [selectErr, SetselectErr] = useState(false);

  const [getid, Setgetid] = useState('');

  const selectLoction = (e, id) => {
    if (e.target.value == "Select") {
      notify()
    }
    else {
      Setgetid(id);
      SetgetLocation(e.target.value);
    }
  };

  const goToReserved = (em) => {
    if (getLocation == '' || em.id != getid) {
      SetselectErr({ selectErr: true });
      notify()
    }
    else {
      const filterBranch = em.branches.filter((x) => x == getLocation);
      const dataFilter = {
        category: em.category,
        name: em.name,
        branches: filterBranch == '' ? em.branches : filterBranch,
        picture: em.picture,
        rating: em.rating,
      }
      navigate('/ReservationsDetails', { state: dataFilter });
    }
  }

  const renderIcon = (icon) => {
    switch (icon) {
      case "All":
        return require('../assets/images/icons/All.png');
      case "Cafe":
        return require('../assets/images/icons/Cafe.png');
      case "Pizza":
        return require('../assets/images/icons/Pizza.png');
      case "FastFood":
        return require('../assets/images/icons/FastFood.png');
      case "Buffet":
        return require('../assets/images/icons/Buffet.png');
      case "BarBq":
        return require('../assets/images/icons/BarBq.png');
      case "Chinese":
        return require('../assets/images/icons/Chinese.png');
      case "DesiFood":
        return require('../assets/images/icons/DesiFood.png');
      case "Burgers":
        return require('../assets/images/icons/Burgers.png');
      case "Steakhouses":
        return require('../assets/images/icons/Steakhouses.png');
      case "Icecream":
        return require('../assets/images/icons/Icecream.png');
      default:
        return require('../assets/images/icons/All.png');
    }
  }

  useEffect(() => {
  }, [])

  const checkListCategory = [...new Set(RestaurantList.map(x => x.category))];
  console.log('checkListCategory', checkListCategory);

  const [checkList, SetcheckList] = useState([]);

  const handleChange = (e) => {
    const { checked, value } = e.currentTarget;
    SetcheckList(
      prev => checked
        ? [...prev, value]
        : prev.filter(val => val !== value)
    );
  };

  const newFilterdList = checkList.length > 0 ? datalist.filter(x => checkList.includes(x.category)) : datalist;
  console.log('checkList', checkList);

  return (
    <div>
      <ToastContainer />
      <div className='container clearfix'>
        <h3>Reservations</h3>
        <div className='resLeftBlock'>
          <div>
            <label>Filter:</label>
            <br />
            <select onChange={selectCategory} className='form-control mt-2 mb-2'>
              {getCategory.map((item, index) => {
                return (
                  <option key={index.toString()} value={item}>{item}</option>
                )
              })}
            </select>
          </div>
          <div>
            <label>Search:</label>
            <input placeholder='Search' className='form-control mt-2 mb-2' onChange={(e) => searchItems(e.target.value)} />
          </div>
          <label>Search By Checked</label>
          <div className='checkSearchMain'>
            { checkListCategory.map((item, index) => {
                return <label key={index.toString()}>
                  <input type="checkbox" value={item} id="flexCheckDefault" onChange={handleChange} />{item}
                </label>
              })}
          </div>
          <ul className='filterTab'>
            {getCategory.map((item, index) => {
              return (<li key={index.toString()}>
                <a className={chooseCategory === item ? 'tabActive' : 'tabClick'}
                  onClick={() => selectedCategory(item)}>
                  <img src={renderIcon(item)} alt="" />
                  {item}</a>
              </li>)
            })}
          </ul>
        </div>
        <div className='resRightBlock'>
          <ul className='resCard'>
            {newFilterdList.length == 0 ? datalist.map : newFilterdList.map((em, index) => (
              <li key={index.toString()}>
                <img src={em.picture} alt="" />
                <h1>{em.name}
                  <span><BiSolidStar color="#f1dc18" size={18} />{em.rating}</span></h1>
                <LocationSelect
                  menuData={em.branches}
                  handleDropdown={(e) => selectLoction(e, em.id)} />
                <button onClick={() => goToReserved(em)}><BiPlusCircle color="#000" size={16} /></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reservations;



