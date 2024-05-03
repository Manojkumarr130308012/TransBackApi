const lorrySchema = require('../model/lorry');
const errorHandler = require('../utils/error.handler');
require('dotenv').config();

class LorryController {

    async add(farm){
		try{
			let response = await lorrySchema.create(farm);
			return { status: "success",   msg:"Lorry Added successfully", result: response };
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
			return {
				response: response,
				count:count
			};
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
			return {
				status: "success",
				response: response
			};
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

	async update(id, body) {

        try {
            let response = await lorrySchema.update({_id: id}, body);
            return { status: "success", msg:"Item Updated successfully",result: response };
        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
    }

	
}

       

module.exports=new LorryController();