import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import RestaurantList from '../components/RestaurantList';
import TestimonialList from '../components/TestimonialList';
import { CustomContainers } from '../components/CustomContainers';
import DataTable from 'react-data-table-component';

function Home() {

  // future item filter
  const filterProductList = RestaurantList.filter(x => x.menuList.some(item => item.itemType === 'future'));
  const finalData = filterProductList.sort(() => Math.random() - Math.random()).slice(0, 4);

  const filteredItems = finalData.map(item => {
    return item.menuList.filter(subitem => subitem.itemType === 'future').slice(0, 4);
  });

  // Object.keys(filteredItems).map((el, index) => {
  //   filteredItems[el].map(item => console.log(item.itemName));
  // })
  // future item filter

  //herro picture show randomly
  const herroPicture = RestaurantList.sort(() => Math.random() - Math.random()).slice(0, 1);
  //testimonial show randomly
  const testimonialData = TestimonialList.sort(() => Math.random() - Math.random());

  useEffect(() => {
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <Row>
        <Col md={12}>
          <Form.Label>Future Items</Form.Label>
          <div>
            {Object.keys(filteredItems).map((el, index) => (
              <div key={index.toString()}>
                {filteredItems[el].slice(0, 1).map((item, index) => (
                  <div key={index.toString()} className='futureBox'>
                    <img src={item.itemImg} alt="" />
                    <p>{item.itemName}</p>
                    <p>{item.itemDescription}</p>
                    <p>{item.itemType}</p>
                    <p>{item.itemPrice}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Col>
        <Col md={2}>
          <Form.Label>Restaurant</Form.Label>
          <div className='heroPic'>
            {herroPicture?.map((p, index) => (
              <img key={index.toString()} src={p.picture} alt="" />
            ))}
          </div>
        </Col>
        <Col md={10}>
          <Form.Label>Testimonials</Form.Label>
          <ul className='testimonialsList'>
            {testimonialData?.map((item, index) => (
              <li key={index.toString()}>
                <img src={item.tesImg} alt="" />
                <h5>{item.tesName}</h5>
                <p>{item.tesDescription}</p>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default Home;


// https://www.freecodecamp.org/news/javascript-2d-arrays/