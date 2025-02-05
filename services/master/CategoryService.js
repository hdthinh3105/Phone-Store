const Category = require('../../models/master/Category');

class CategoryService {
  static async getAllCategories() {
    return await Category.getAll();
  }

  static async getCategoryById(id) {
    return await Category.getById(id);
  }

  static async createCategory(category) {
    await Category.create(category);
  }

  static async updateCategory(id, category) {
    await Category.update(id, category);
  }

  static async deleteCategory(id) {
    await Category.delete(id);
  }
}

module.exports = CategoryService;