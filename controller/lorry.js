const lorrySchema = require('../model/lorry');
const errorHandler = require('../utils/error.handler');
require('dotenv').config();

class LorryController {

    async add(farm){
		try{
			let createresponse = await lorrySchema.create(farm);
			let response = await userSchema.find({_id: createresponse._id});
            return { status: "success",   msg:"data Created successfully", result: response };
	} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await lorrySchema.find({});
			let count=Object.keys(response).length;
			return { status: "success",   msg:"data get successfully", result: response };
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
   

	async fetchdata(id){
		try{
			let response = await lorrySchema.find({_id:id});
			return response;	
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

	async delete(id){
		try{
			let response = await lorrySchema.deleteOne({_id: id});
			return { status: "success",   msg:"data Deleted successfully", result: response };
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

	async update(id, body) {

        try {
            let updateResponse = await lorrySchema.update({_id: id}, body);
			let response = await lorrySchema.find({_id: id});
			return { status: "success",   msg:"data Updated successfully", result: response };
        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
    }

	
}

       

module.exports=new LorryController();