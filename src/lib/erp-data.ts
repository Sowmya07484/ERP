export type Role = 'Super Admin' | 'Admin' | 'Accountant' | 'Procurement Manager' | 'Production Manager' | 'Inventory Manager' | 'Installation Manager' | 'Employee';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  role: Role;
  status: 'Active' | 'Inactive';
  joiningDate: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'Alex Rivera',
    email: 'alex@quantis.com',
    mobile: '+1-555-0101',
    department: 'Management',
    designation: 'CEO',
    role: 'Super Admin',
    status: 'Active',
    joiningDate: '2023-01-15'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Sarah Chen',
    email: 'sarah@quantis.com',
    mobile: '+1-555-0102',
    department: 'Finance',
    designation: 'Head Accountant',
    role: 'Accountant',
    status: 'Active',
    joiningDate: '2023-02-20'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Michael Ross',
    email: 'michael@quantis.com',
    mobile: '+1-555-0103',
    department: 'Operations',
    designation: 'Production Lead',
    role: 'Production Manager',
    status: 'Active',
    joiningDate: '2023-03-10'
  }
];

export interface Product {
  id: string;
  productId: string;
  name: string;
  category: string;
  type: string;
  sku: string;
  unit: string;
  sellingPrice: number;
  costPrice: number;
  gstPercent: number;
  hsnCode: string;
  warranty: string;
  status: 'Available' | 'Discontinued';
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    productId: 'PROD-001',
    name: 'Industrial Valve X1',
    category: 'Hardware',
    type: 'Mechanical',
    sku: 'SKU-VALVE-X1',
    unit: 'PCS',
    sellingPrice: 450,
    costPrice: 320,
    gstPercent: 18,
    hsnCode: '8481',
    warranty: '2 Years',
    status: 'Available'
  },
  {
    id: 'p2',
    productId: 'PROD-002',
    name: 'Steel Casting M2',
    category: 'Material',
    type: 'Casting',
    sku: 'SKU-CAST-M2',
    unit: 'KG',
    sellingPrice: 120,
    costPrice: 85,
    gstPercent: 12,
    hsnCode: '7325',
    warranty: 'None',
    status: 'Available'
  }
];

export interface RawMaterial {
  id: string;
  name: string;
  category: string;
  unit: string;
  stockQuantity: number;
  minQuantity: number;
  reorderQuantity: number;
  purchaseCost: number;
  supplier: string;
}

export const mockRawMaterials: RawMaterial[] = [
  {
    id: 'm1',
    name: 'Grade A Steel',
    category: 'Metal',
    unit: 'KG',
    stockQuantity: 1500,
    minQuantity: 500,
    reorderQuantity: 2000,
    purchaseCost: 65,
    supplier: 'MetalCorp Ltd'
  },
  {
    id: 'm2',
    name: 'Industrial Lubricant',
    category: 'Chemical',
    unit: 'Liters',
    stockQuantity: 45,
    minQuantity: 100,
    reorderQuantity: 200,
    purchaseCost: 15,
    supplier: 'ChemSolutions Inc'
  }
];

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  discount: number;
  totalAmount: number;
  status: 'Quotation' | 'Ordered' | 'Production' | 'Installation' | 'Invoiced' | 'Paid';
  orderDate: string;
}

export const mockOrders: Order[] = [
  {
    id: 'o1',
    orderNumber: 'ORD-2024-001',
    customerName: 'Global Manufacturing Inc.',
    productName: 'Industrial Valve X1',
    quantity: 10,
    unitPrice: 450,
    tax: 810,
    discount: 200,
    totalAmount: 5110,
    status: 'Paid',
    orderDate: '2024-03-01'
  },
  {
    id: 'o2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Aero Dynamics',
    productName: 'Steel Casting M2',
    quantity: 50,
    unitPrice: 120,
    tax: 720,
    discount: 500,
    totalAmount: 6220,
    status: 'Ordered',
    orderDate: '2024-03-15'
  }
];

export interface LedgerEntry {
  id: string;
  date: string;
  account: string;
  debit?: number;
  credit?: number;
  reference: string;
}

export const mockLedger: LedgerEntry[] = [
  { id: 'l1', date: '2024-03-01', account: 'Cash', debit: 5110, reference: 'INV-001' },
  { id: 'l2', date: '2024-03-01', account: 'Sales Revenue', credit: 5110, reference: 'INV-001' },
  { id: 'l3', date: '2024-03-02', account: 'Inventory', debit: 2000, reference: 'PO-005' },
  { id: 'l4', date: '2024-03-02', account: 'Cash', credit: 2000, reference: 'PO-005' }
];

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  material: string;
  quantity: number;
  totalCost: number;
  status: 'Pending' | 'Ordered' | 'Received' | 'Cancelled';
  date: string;
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: 'po1', poNumber: 'PO-2024-001', supplier: 'MetalCorp Ltd', material: 'Grade A Steel', quantity: 2000, totalCost: 130000, status: 'Received', date: '2024-02-15' },
  { id: 'po2', poNumber: 'PO-2024-002', supplier: 'ChemSolutions Inc', material: 'Industrial Lubricant', quantity: 100, totalCost: 1500, status: 'Ordered', date: '2024-03-01' },
];

export interface Quotation {
  id: string;
  quoteNumber: string;
  customer: string;
  product: string;
  amount: number;
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Expired';
}

export const mockQuotations: Quotation[] = [
  { id: 'q1', quoteNumber: 'QT-2024-101', customer: 'Industrial Systems Corp', product: 'Valve X1 x 5', amount: 2250, validUntil: '2024-04-15', status: 'Sent' },
  { id: 'q2', quoteNumber: 'QT-2024-102', customer: 'Global Power', product: 'Valve X1 x 20', amount: 9000, validUntil: '2024-04-20', status: 'Accepted' },
];

export interface Installation {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  location: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed';
  technician: string;
  date: string;
}

export const mockInstallations: Installation[] = [
  { id: 'i1', orderNumber: 'ORD-2024-001', customer: 'Global Manufacturing Inc.', product: 'Industrial Valve X1', location: 'Site A', status: 'Completed', technician: 'Robert Fox', date: '2024-03-10' },
  { id: 'i2', orderNumber: 'ORD-2024-003', customer: 'Tech Solutions', product: 'Industrial Valve X1', location: 'Branch B', status: 'Scheduled', technician: 'Sarah Connor', date: '2024-03-25' },
];