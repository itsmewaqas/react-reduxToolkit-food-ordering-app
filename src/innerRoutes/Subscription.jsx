import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import { CustomContainers } from '../components/CustomContainers';
import DataTable from 'react-data-table-component';
import { BiPencil, BiCalendarWeek } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Subscription() {

  const initalState = {
    applicationNo: '',
    rim: '',
    portfolio: '',
    dispatchTermssheet: '',
    isForProprietaryBook: '',
    isLeverageAccount: '',
    investmentAccount: '',
    investmentAccountTitle: '',
    productType: '',
    investmentCurrency: '',
    activity: '',
    name: '',
    status: '',
    unDerlyingprofile: '',
    wealthCenter: '',
    overdraftAmount: '',
    relationshipManager: '',
  };

  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});

  const [custodySettlmentDate, setcustodySettlmentDate] = useState();
  const [date, setdate] = useState();

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

  useEffect(() => {
  }, [])

  return (
    <div>
      <h1>Subscription</h1>
      <Row>
        <Col md={12}>
          <CustomContainers title="Subscription Form">
            <Row>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Application No</Form.Label>
                <Form.Control
                  type="text"
                  name='applicationNo'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>RIM</Form.Label>
                <Form.Control
                  type="text"
                  name='rim'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Portfolio</Form.Label>
                <Form.Control
                  type="text"
                  name='portfolio'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Dispatch Termssheet</Form.Label>
                <Form.Control
                  type="text"
                  name='dispatchTermssheet'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Is For Proprietary Book</Form.Label>
                <Form.Check
                  type="checkbox"
                  onChange={handleChnage}
                  name='isForProprietaryBook'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Is Leverage Account</Form.Label>
                <Form.Check
                  type="checkbox"
                  onChange={handleChnage}
                  name='isLeverageAccount'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Investment Account</Form.Label>
                <Form.Select name="investmentAccount" value={values.investmentAccount} onChange={handleChnage}>
                  <option hidden selected>Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Investment Account Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='investmentAccountTitle'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Product Type</Form.Label>
                <Form.Select name="productType" value={values.productType} onChange={handleChnage}>
                  <option hidden selected>Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Investment Currency</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='investmentCurrency'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Custody Settlment Date</Form.Label>
                <DatePicker
                  showIcon
                  className='form-control'
                  selected={custodySettlmentDate}
                  withPortal
                  icon={<BiCalendarWeek />}
                  onChange={(e) => setcustodySettlmentDate(e)}
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Activity</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='activity'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='name'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Date</Form.Label>
                <DatePicker
                  showIcon
                  className='form-control'
                  selected={date}
                  withPortal
                  icon={<BiCalendarWeek />}
                  onChange={(e) => setdate(e)}
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='status'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>UnDerlying Profile</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='unDerlyingprofile'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Wealth Center</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='wealthCenter'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Overdraft Amount</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='overdraftAmount'
                />
              </Col>
              <Col md={3} className='mt-3 my-3'>
                <Form.Label>Relationship Manager</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChnage}
                  name='relationshipManager'
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="success">Add Product</Button>
            </div>
          </CustomContainers>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CustomContainers title="Funds Details">
            <DataTable
              columns={columns}
              data={data}
            />
          </CustomContainers>
        </Col>
      </Row>
    </div>
  )
}

export default Subscription;
