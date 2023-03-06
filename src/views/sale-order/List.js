import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { formater } from '../../utils/formater';
import './List.css';

function List() {
  const orders = useLoaderData();
  const navigate = useNavigate();

  const detailClick = (id) => {
    navigate(`/${id.split('-')[1]}`);
  };

  return (
    <>
      <Link to={'/create'}>
        <Button variant="success" className="btn">
          New Order<i className="fa fa-plus-circle ml"></i>
        </Button>
      </Link>
      <Table striped bordered hover variant="dark" className="hover">
        <thead>
          <tr>
            <th># Order</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const [date, time] = order.updatedAt.split('T');
            return (
              <tr key={order.order} onClick={() => detailClick(order.order)}>
                <td>{order.order}</td>
                <td>{order.customerName}</td>
                <td>
                  <div className={order.status}>{order.status}</div>
                </td>
                <td>{`${date} ${time.slice(0, 8)}`}</td>
                <td>{formater(order.total)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default List;
