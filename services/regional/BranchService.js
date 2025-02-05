const Branch = require('../../models/regional/Branch');

class BranchService {
  static async getAllBranches() {
    return await Branch.getAll();
  }

  static async getBranchById(id) {
    return await Branch.getById(id);
  }

  static async createBranch(branch) {
    await Branch.create(branch);
  }

  static async updateBranch(id, branch) {
    await Branch.update(id, branch);
  }

  static async deleteBranch(id) {
    await Branch.delete(id);
  }
}

module.exports = BranchService;