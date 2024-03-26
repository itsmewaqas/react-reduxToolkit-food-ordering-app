import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import { CustomContainers } from '../components/CustomContainers';
import DataTable from 'react-data-table-component';
import { BiPencil } from "react-icons/bi";

function ExisitingApplication() {

  const initalState = {
    rim: '',
    ran: '',
    customerName: '',

    portfolioName: '',
    defaultName: '',
    profile: '',
    profileType: '',
  };

  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});

  const handleChnage = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
    {
      name: 'Actions',
      cell: row => <BiPencil size={24} row={row} />,
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]

  const [conditionalBlock, setConditionalBlock] = useState('tab1');
  const [isActive, setisActive] = useState(1);
  const [tabsData] = useState([
    { id: 1, title: 'tab1' },
    { id: 2, title: 'tab2' },
    { id: 3, title: 'tab3' },
    { id: 4, title: 'tab4' },
    { id: 5, title: 'tab5' },
    { id: 6, title: 'tab6' },
    { id: 7, title: 'tab7' },
    { id: 8, title: 'tab8' },
    { id: 9, title: 'tab9' },
    { id: 10, title: 'tab10' },
    { id: 11, title: 'tab11' },
    { id: 12, title: 'tab12' },
    { id: 13, title: 'tab13' },
    { id: 14, title: 'tab14' },
    { id: 15, title: 'tab15' },
    { id: 16, title: 'tab16' },
    { id: 17, title: 'tab17' },
    { id: 18, title: 'tab18' },
    { id: 19, title: 'tab19' },
    { id: 20, title: 'tab20' }
  ]);


  const showBlock = (item) => {
    setisActive(item.id);
    setConditionalBlock(item.title)
  }

  useEffect(() => {
  }, [])

  return (
    <div>
      <h1>Exisiting Application</h1>
      <Row>
        <Col md={12}>
          <CustomContainers title="Customer Details">
            <Row>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>RIM</Form.Label>
                <Form.Control
                  type="text"
                  name='rim'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>RAN</Form.Label>
                <Form.Control
                  type="text"
                  name='ran'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name='customerName'
                  onChange={handleChnage}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="success">Search</Button>
            </div>
          </CustomContainers>
        </Col>
      </Row>
      <Col md={12}>
        <ul className='horizontalList'>
          {tabsData.map((item, index) =>
            <li key={index.toString()}>
              <a className={isActive === item.id ? 'active' : ''} onClick={() => showBlock(item)}>{item.title}</a>
            </li>
          )}
        </ul>
      </Col>
      {conditionalBlock === 'tab1' && <CustomContainers title="Title Here">
        <Row>
          <Col md={4} className='mt-3 my-3'>
            <Form.Label>Portfolio Name</Form.Label>
            <Form.Control
              type="text"
              name='portfolioName'
              onChange={handleChnage}
            />
          </Col>
          <Col md={4} className='mt-3 my-3'>
            <Form.Label>Default Name</Form.Label>
            <Form.Control
              type="text"
              name='defaultName'
              onChange={handleChnage}
            />
          </Col>
          <Col md={4} className='mt-3 my-3'>
            <Form.Label>Profile</Form.Label>
            <Form.Control
              type="text"
              name='profile'
              onChange={handleChnage}
            />
          </Col>
          <Col md={4} className='mt-3 my-3'>
            <Form.Label>Profile Type</Form.Label>
            <Form.Control
              type="text"
              name='profileType'
              onChange={handleChnage}
            />
          </Col>
        </Row>
      </CustomContainers>}
      {conditionalBlock === 'tab2' && <CustomContainers title="Title Here">
        tab2 data
      </CustomContainers>}
      {conditionalBlock === 'tab3' && <CustomContainers title="Title Here">
        tab3 data
      </CustomContainers>}
      {conditionalBlock === 'tab4' && <CustomContainers title="Title Here">
        tab4 data
      </CustomContainers>}
      {conditionalBlock === 'tab5' && <CustomContainers title="Title Here">
        tab5 data
      </CustomContainers>}
      {conditionalBlock === 'tab6' && <CustomContainers title="Title Here">
        tab6 data
      </CustomContainers>}
      {conditionalBlock === 'tab7' && <CustomContainers title="Title Here">
        tab7 data
      </CustomContainers>}
      {conditionalBlock === 'tab8' && <CustomContainers title="Title Here">
        tab8 data
      </CustomContainers>}
      {conditionalBlock === 'tab9' && <CustomContainers title="Title Here">
        tab9 data
      </CustomContainers>}
      {conditionalBlock === 'tab10' && <CustomContainers title="Title Here">
        tab10 data
      </CustomContainers>}
      {conditionalBlock === 'tab11' && <CustomContainers title="Title Here">
        tab11 data
      </CustomContainers>}
      {conditionalBlock === 'tab12' && <CustomContainers title="Title Here">
        tab12 data
      </CustomContainers>}
      {conditionalBlock === 'tab13' && <CustomContainers title="Title Here">
        tab13 data
      </CustomContainers>}
      {conditionalBlock === 'tab14' && <CustomContainers title="Title Here">
        tab14 data
      </CustomContainers>}
      {conditionalBlock === 'tab15' && <CustomContainers title="Title Here">
        tab15 data
      </CustomContainers>}
      {conditionalBlock === 'tab16' && <CustomContainers title="Title Here">
        tab16 data
      </CustomContainers>}
      {conditionalBlock === 'tab17' && <CustomContainers title="Title Here">
        tab17 data
      </CustomContainers>}
      {conditionalBlock === 'tab18' && <CustomContainers title="Title Here">
        tab18 data
      </CustomContainers>}
      {conditionalBlock === 'tab19' && <CustomContainers title="Title Here">
        tab19 data
      </CustomContainers>}
      {conditionalBlock === 'tab20' && <CustomContainers title="Title Here">
        tab20 data
      </CustomContainers>}
      <Row>
        <Col md={12}>
          <CustomContainers title="Portfolio Register">
            <DataTable
              columns={columns}
              data={data}
            />
          </CustomContainers>
        </Col>
        <Col md={12}>
          <CustomContainers title="Portfolio Orders">
            <DataTable
              columns={columns}
              data={data}
            />
          </CustomContainers>
        </Col>
        <Col md={12}>
          <CustomContainers title="Corporate Actions">
            <Row>
              <Col md={12}>No Data Exist</Col>
            </Row>
          </CustomContainers>
        </Col>
        <Col md={12}>
          <CustomContainers title="Portfolio Transfers">
            <Row>
              <Col md={12}>No Data Exist</Col>
            </Row>
          </CustomContainers>
        </Col>
        <Col md={12}>
          <CustomContainers title="Metured Products">
            <Row>
              <Col md={12}>No Data Exist</Col>
            </Row>
          </CustomContainers>
        </Col>
      </Row>
    </div>
  )
}

export default ExisitingApplication;
