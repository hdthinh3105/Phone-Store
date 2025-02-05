const Employee = require('../../models/regional/Employee');

class EmployeeService {
  static async getAllEmployees() {
    return await Employee.getAll();
  }

  static async getEmployeeById(id) {
    return await Employee.getById(id);
  }

  static async createEmployee(employee) {
    await Employee.create(employee);
  }

  static async updateEmployee(id, employee) {
    await Employee.update(id, employee);
  }

  static async deleteEmployee(id) {
    await Employee.delete(id);
  }
}

module.exports = EmployeeService;