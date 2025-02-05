const Customer = require('../../models/master/Customer');

class CustomerService {
  static async getAllCustomers() {
    return await Customer.getAll();
  }

  static async getCustomerById(id) {
    return await Customer.getById(id);
  }

  static async createCustomer(customer) {
    await Customer.create(customer);
  }

  static async updateCustomer(id, customer) {
    await Customer.update(id, customer);
  }

  static async deleteCustomer(id) {
    await Customer.delete(id);
  }
}

module.exports = CustomerService;