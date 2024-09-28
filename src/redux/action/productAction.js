import axios from "axios";
import { GET_ALL_PRODUCTS, SET_ERROR, SET_LOADING } from "../actionTypes.js/contactActionTypes";


export const getProducts = ()=>async(dispatch)=>{
    try {
        dispatch({type:SET_ERROR,payload:false});
        dispatch({type:SET_LOADING,payload:true});
        const get = await axios.get(`https://fakestoreapi.com/products`);
        console.log(get)
        dispatch({type:GET_ALL_PRODUCTS,payload:get.data});
        return get;
    } catch (error) {
        console.log(error)
        dispatch({type:SET_ERROR,payload:true});
        return error;
    }finally{
        dispatch({type:SET_LOADING,payload:false});
    }
}

