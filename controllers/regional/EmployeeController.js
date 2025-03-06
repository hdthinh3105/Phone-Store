const EmployeeService = require('../../services/regional/EmployeeService');

class EmployeeController {
  static async getAll(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Region from query:', region);
      const employees = await EmployeeService.getAllEmployees(region);
      res.status(200).json(employees);
    } catch (err) {
      console.error('Error in getAll:', err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Region from query:', region);
      const employee = await EmployeeService.getEmployeeById(req.params.id, region);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (err) {
      console.error('Error in getById:', err);
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Region from query:', region);
      await EmployeeService.createEmployee(req.body, region);
      res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
      console.error('Error in create:', err);
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Region from query:', region);
      await EmployeeService.updateEmployee(req.params.id, req.body, region);
      res.status(200).json({ message: 'Employee updated successfully' });
    } catch (err) {
      console.error('Error in update:', err);
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const region = req.query.region || 'north';
      console.log('Region from query:', region);
      await EmployeeService.deleteEmployee(req.params.id, region);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      console.error('Error in delete:', err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = EmployeeController;