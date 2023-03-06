import axios from 'axios';
import { redirect } from 'react-router-dom';
import { URL, SALE_ORDER_PATH, PRODUCT_PATH, customers } from '../../constants';

export async function loadList() {
  const res = await axios.get(URL + SALE_ORDER_PATH);
  return res.data;
}

export async function loadDetails({ params }) {
  const { id } = params;
  try {
    const res = await axios.get(`${URL}${SALE_ORDER_PATH}/${id}`);
    return res.data;
  } catch (error) {
    throw redirect('/');
  }
}

export async function loadCustomersAndProucts() {
  const productsResponse = await axios.get(URL + PRODUCT_PATH);
  // const customers = await axios.get(URL + CUSTOMER_PATH);
  const products = productsResponse.data;
  return {
    products,
    customers
  };
}
