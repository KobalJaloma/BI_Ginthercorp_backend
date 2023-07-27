import { Test } from "../models/TestModel.js";

const resOK = (arg) => {
    return {
    status: 'OK',
    message: arg || 'Su Respuesta Fue Exitosa!'
    }
}
const resError = (arg) => {
    return {
        status: 'ERROR',
        message: arg
    }
}


export const createTest = async(req, res) => {
      
    try {
        const testObj = req.body;
        const newTest = await Test.create(testObj);
        
        res.json(resOK(''));
    } catch (error) {
        res.json(resError(error));
    }

}

export const getAllTests = async(req, res) => {
    
    try {
        const tests = await Test.findAll();
        
        res.json(tests);
    } catch (error) {
        res.json(resError(error));
    }
}