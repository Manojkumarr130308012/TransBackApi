const driverSchema = require('../model/driver');
const errorHandler = require('../utils/error.handler');
require('dotenv').config();

class DriverController {

    async add(farm){
		try{
			let response = await driverSchema.create(farm);
			return { status: "success",   msg:"driver Added successfully", result: response };
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	
	async fetch(){
		try{
			let response = await driverSchema.find({});
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
			let response = await driverSchema.find({_id:id});
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
			let response = await driverSchema.deleteOne({_id: id});
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
            let response = await driverSchema.update({_id: id}, body);
            return { status: "success", msg:"driver Updated successfully",result: response };
        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
    }

	
}

       

module.exports=new DriverController();