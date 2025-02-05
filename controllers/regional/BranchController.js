const BranchService = require('../../services/regional/BranchService');

class BranchController {
  static async getAll(req, res) {
    try {
      const branches = await BranchService.getAllBranches();
      res.status(200).json(branches);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const branch = await BranchService.getBranchById(req.params.id);
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      res.status(200).json(branch);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    try {
      await BranchService.createBranch(req.body);
      res.status(201).json({ message: 'Branch created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      await BranchService.updateBranch(req.params.id, req.body);
      res.status(200).json({ message: 'Branch updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await BranchService.deleteBranch(req.params.id);
      res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = BranchController;