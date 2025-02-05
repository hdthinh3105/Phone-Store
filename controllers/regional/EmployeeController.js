const EmployeeService = require('../../services/regional/EmployeeService');

class EmployeeController {
  static async getAll(req, res) {
    try {
      const employees = await EmployeeService.getAllEmployees();
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const employee = await EmployeeService.getEmployeeById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    try {
      await EmployeeService.createEmployee(req.body);
      res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      await EmployeeService.updateEmployee(req.params.id, req.body);
      res.status(200).json({ message: 'Employee updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await EmployeeService.deleteEmployee(req.params.id);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = EmployeeController;