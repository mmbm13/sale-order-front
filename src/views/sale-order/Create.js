import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { statusOptions, SALE_ORDER_PATH, URL } from '../../constants';
import { formater } from '../../utils/formater';
import './List';

function Create() {
  const { products, customers } = useLoaderData();

  const [customer, setCustomer] = useState({});
  const [data, setData] = useState({});
  const [details, setDetails] = useState([{ price: 0, discount: 0, quantity: 0, productId: 0 }]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const HandleSubmit = async (event) => {
    // TODO add validations
    event.preventDefault();

    try {
      await axios.post(`${URL}${SALE_ORDER_PATH}`, { ...data, details: [...details] });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const HandleCustomerSelect = (event) => {
    const id = event.target.value;
    if (id == 0) {
      setCustomer({});
    } else {
      setCustomer(customers[id - 1]);
      setData({ ...data, customerId: id, shippingAddress: customers[id - 1].address });
    }
  };

  const HandleStatusSelect = (event) => {
    if (event.target.value == 0) {
      setCustomer({});
    } else {
      setData({ ...data, status: event.target.value });
    }
  };

  const HandleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const HandleDetails = (event, index) => {
    // TODO improve creating a element containing the array of inputs with his own state
    const { name, value } = event.target;
    let calculateTotal = total;

    if (name == 'discount' && value > 100) return;
    if (name == 'price') {
      calculateTotal +=
        (value - details[index].price) *
        details[index].quantity *
        (1 - details[index].discount / 100);
    }
    if (name == 'quantity') {
      calculateTotal +=
        (value - details[index].quantity) *
        details[index].price *
        (1 - details[index].discount / 100);
    }
    if (name == 'discount') {
      calculateTotal +=
        details[index].quantity * details[index].price * ((details[index].discount - value) / 100);
    }

    setTotal(calculateTotal);
    const data = [...details];
    data[index] = { ...data[index], [name]: value };
    setDetails(data);
  };

  const deleteRow = (index) => {
    let calculateTotal = total;
    calculateTotal -=
      details[index].quantity * details[index].price * (1 - details[index].discount / 100);

    const data = [...details];
    data.splice(index, 1);
    setDetails(data);
    setTotal(calculateTotal);
  };

  const addRow = () => {
    const data = [...details];
    data.push({ price: 0, discount: 0, quantity: 0, productId: 0 });
    setDetails(data);
  };

  return (
    <Card bg="light" className="max-width">
      <Card.Body>
        <Form onSubmit={HandleSubmit}>
          <Row className="row-center mb">
            <Form.Group as={Col}>
              <Form.Select onChange={HandleCustomerSelect} value={customer.id || 0}>
                <option value={0}>Select a customer</option>
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {`${customer.name} ${customer.lastName}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Col>
              <strong className="mr">Identification:</strong>
              {customer?.identification}
            </Col>
            <Col>
              <strong className="mr">Email:</strong>
              {customer?.email}
            </Col>
            <Col>
              <strong className="mr">Telephone:</strong>
              {customer?.telephone}
            </Col>
          </Row>

          <Row className="mb">
            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>
              <Form.Select onChange={HandleStatusSelect} value={data.status || 0}>
                <option value={0}>Select a Status</option>
                {statusOptions.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Shipping Address"
                value={data.shippingAddress || ''}
                onChange={HandleData}
                name="shippingAddress"
                required
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Notes"
                value={data.notes || ''}
                onChange={HandleData}
                name="notes"
              />
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <strong>Product</strong>
            </Col>
            <Col>
              <strong>Price</strong>
            </Col>
            <Col>
              <strong>Quantity</strong>
            </Col>
            <Col>
              <strong>Discount (%)</strong>
            </Col>
            <Col>
              <strong>Total</strong>
            </Col>
            <Col>
              <strong>Option</strong>
            </Col>
          </Row>

          {details.map((detail, index) => {
            const total =
              (detail.price || 0) * (detail.quantity || 0) * (1 - (detail.discount || 0) / 100);
            return (
              <Row key={'item-' + index} className="mb">
                <Form.Group as={Col}>
                  <Form.Select
                    onChange={(e) => HandleDetails(e, index)}
                    value={detail.productId || 0}
                    name="productId">
                    <option value={0}>Select a Product</option>
                    {products.map((product) => (
                      <option value={product.id} key={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Control
                    type="number"
                    min={0}
                    placeholder="Enter Price"
                    value={detail.price || ''}
                    onChange={(e) => HandleDetails(e, index)}
                    name="price"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Control
                    type="number"
                    min={0}
                    placeholder="Enter Quantity"
                    value={detail.quantity || ''}
                    onChange={(e) => HandleDetails(e, index)}
                    name="quantity"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Control
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Enter Discount"
                    value={detail.discount || 0}
                    onChange={(e) => HandleDetails(e, index)}
                    name="discount"
                    onFocus={(event) => event.target.select()}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Control type="text" readOnly plaintext value={formater(total)} />
                </Form.Group>
                <Col>
                  <Button variant="danger" onClick={() => deleteRow(index)}>
                    <i className="fa fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            );
          })}

          <Row className="mb">
            <Col className="text-right">
              <strong>{`Total: ${formater(total)}`}</strong>
            </Col>
          </Row>

          <Row className="mb">
            <Col>
              <Button variant="primary" onClick={addRow}>
                <i className="fa fa-plus-circle "></i>
              </Button>
            </Col>
          </Row>

          <Button variant="success" type="submit" className="mr">
            Create
          </Button>

          <Link to={'/'}>
            <Button variant="danger">Back</Button>
          </Link>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Create;
