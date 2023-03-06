export const URL = 'http://localhost:3001/api/v1';
export const SALE_ORDER_PATH = '/sale-orders';
export const PRODUCT_PATH = '/products';

export const customers = [
  {
    id: 1,
    name: 'John',
    lastName: 'Doe',
    email: 'example@example.com',
    telephone: '1234567',
    address: '4455 Landing Lange, APT 4',
    password: '$2y$10$ofkrO1S5XL2oN/XefozV92e0s74Rf0iNSJCbxuqojIOBLaq',
    identification: '1053770648'
  },
  {
    id: 2,
    name: 'Jane',
    lastName: 'Doe',
    email: 'example@example.com',
    telephone: '7654321',
    address: '4455 Landing Lange, APT 5',
    password: '$2y$10$ofkrO1S5XL2oN/XefozV92e0s74Rf0iNSJCbxuqojIOBLaq',
    identification: '56884612'
  }
];

export const statusOptions = ['Quote', 'Billed', 'Paid', 'Delivered'];
