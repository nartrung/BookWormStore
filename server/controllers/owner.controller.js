const Owner = require("../models/owner");

class OwnerController {
  async create(req, res) {
    try {
      let owner = new Owner();
      owner.name = req.body.name;
      owner.about = req.body.about;
      owner.photo = req.file.path;
      await owner.save();
      res.json({
        success: true,
        message: "Successfully created new owner",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async findAll(req, res) {
    try {
      let owners = await Owner.find();
      res.json({
        owners: owners,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getOne(req, res) {
    try {
      let owner = await Owner.findOne({ _id: req.params.id });
      res.json({
        success: true,
        owner: owner,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async updateProfile(req, res) {
    try {
      let foundOwner = await Owner.findOne({ _id: req.params.id });
      if (foundOwner) {
        if(req.body.name)
          foundOwner.name = req.body.name;
        if(req.body.about)
          foundOwner.about = req.body.about;
        await foundOwner.save();
        res.json({
          success: true,
          message: "Profile has been updated",
        });
      }
      else{
        console.log("Loi roi");
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async delete(req, res) {
    try {
      let deleteOwner = await Owner.findOneAndDelete({ _id: req.params.id });

      if (deleteOwner) {
        res.json({
          status: true,
          message: "Successfully deleted",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new OwnerController();
