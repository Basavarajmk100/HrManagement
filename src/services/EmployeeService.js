import axios from "axios";

const API_URL = "http://localhost:8085/api/v1/employees";

// GET all employees
export const getEmployees = () => axios.get(API_URL);

// GET employee by id
export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);

// POST create employee
export const addEmployee = (employee) => axios.post(API_URL, employee);

// PUT update employee
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);

// DELETE employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
