import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import { CustomContainers } from '../components/CustomContainers';
import DataTable from 'react-data-table-component';
import { BiPencil } from "react-icons/bi";

function SearchUserDetails() {

  const initalState = {
    userid: '',
    recordStatus1: '',
    firstName: '',
    pjoenixrmName: '',
    recordStatus2: '',
    roles: '',
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

  useEffect(() => {
  }, [console.log(values)])

  return (
    <div>
      <h1>SearchUserDetails</h1>
      <Row>
        <Col md={12}>
          <CustomContainers title="Search Criteria">
            <Row>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>User Id</Form.Label>
                <Form.Control
                  type="text"
                  name='userid'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Record Status</Form.Label>
                <Form.Select name="recordStatus1" value={values.recordStatus1} onChange={handleChnage}>
                  <option hidden selected>Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name='firstName'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Phoenix RM Name</Form.Label>
                <Form.Control
                  type="text"
                  name='pjoenixrmName'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Record Status</Form.Label>
                <Form.Select name="recordStatus2" value={values.recordStatus2} onChange={handleChnage}>
                  <option hidden selected>Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Roles</Form.Label>
                <Form.Select name="roles" value={values.roles} onChange={handleChnage}>
                  <option hidden selected>Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="success">Search</Button>
            </div>
          </CustomContainers>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CustomContainers title="List">
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

export default SearchUserDetails;
