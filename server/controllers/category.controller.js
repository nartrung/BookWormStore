const Category = require('../models/category');

class CategoryController{
    async create(req,res){
        try{
            let category = new Category();
            category.type = req.body.type;
            await category.save();
            res.json({
                success: true,
                message: "Successfully created new category"
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
    async findAll(req,res){
        try{
            let categories = await Category.find();
            res.json({
                success: true,
                categories: categories
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
    async delete(req,res){
        try{
            let deleteCategory = await Category.findOneAndDelete({_id: req.params.id});
    
            if(deleteCategory){
                res.json({
                    status:true,
                    message: "Successfully deleted"
                });
            }
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
};

module.exports = new CategoryController();