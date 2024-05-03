const locationSchema = require('../model/location');
const errorHandler = require('../utils/error.handler');
require('dotenv').config();

class LocationController {

  
    async add(farm){
		try{
			let response = await locationSchema.create(farm);
			return { status: "success",   msg:"Location Added successfully", result: response };
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{            
			let response = await locationSchema.find({});
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
			let response = await locationSchema.find({_id:id});
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
			let response = await locationSchema.deleteOne({_id: id});
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
            let response = await locationSchema.update({_id: id}, body);
            return { status: "success", msg:"Location Updated successfully",result: response };
        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
    }

	
}

       

module.exports=new LocationController();