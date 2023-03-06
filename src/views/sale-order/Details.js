import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { formater } from '../../utils/formater';
import axios from 'axios';
import { URL, SALE_ORDER_PATH } from '../../constants';
import './List';

function Details() {
  const { id } = useParams();
  const order = useLoaderData();
  const navigate = useNavigate();
  let total = 0;

  const HandleDelete = async () => {
    await axios.delete(`${URL}${SALE_ORDER_PATH}/${id}`);
    navigate('/');
  };

  return (
    <Card bg="light">
      <Card.Header className="header">
        <Card.Title>Order Number: {order.order}</Card.Title>
        <Link to={'edit'} className="btn-left">
          <Button variant="success">
            <i className="fa fa-pencil-square-o mr"></i>Edit
          </Button>
        </Link>
        <Button variant="danger" onClick={HandleDelete}>
          <i className="fa fa-trash mr"></i>Delete
        </Button>
      </Card.Header>
      <Card.Body>
        <Card className="mb">
          <Card.Body>
            <Container>
              <Row className="mb">
                <Col>
                  <strong className="mr">Customer:</strong>
                  {`${order?.customer?.name} ${order?.customer?.lastName}`}
                </Col>
                <Col>
                  <strong className="mr">Identification:</strong>
                  {order?.customer?.identification}
                </Col>
                <Col>
                  <strong className="mr">Email:</strong>
                  {order?.customer?.email}
                </Col>
                <Col>
                  <strong className="mr">Telephone:</strong>
                  {order?.customer?.telephone}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong className="mr">Status:</strong>
                  {order?.status}
                </Col>
                <Col>
                  <strong className="mr">Shipping Address:</strong>
                  {order?.shippingAddress}
                </Col>
                <Col>
                  <strong className="mr">Date:</strong>
                  {order?.updatedAt}
                </Col>
                <Col>
                  <strong className="mr">Notes:</strong>
                  {order?.notes}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <Card className="mb">
          <Card.Header>
            <Card.Title>Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {(order?.products ?? []).map((product) => {
                  const { price, quantity } = product.SaleOrderDetail;
                  total += price * quantity;
                  return (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{formater(price)}</td>
                      <td>{quantity}</td>
                      <td>{formater(price * quantity)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={3}></td>
                  <td>
                    <strong>{formater(total)}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Link to={'/'}>
          <Button variant="primary">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Details;
