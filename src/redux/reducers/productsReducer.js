import { GET_ALL_PRODUCTS, SET_ERROR, SET_LOADING } from "../actionTypes.js/contactActionTypes"

const initialstate = {
    products:[],
    loading:false,
    error:false
}

export const productsReducer = (state = initialstate,{type,payload})=>{
  switch(type){
    case GET_ALL_PRODUCTS :return{...state,products:payload};
    case SET_ERROR :return{...state,error:payload};
    case SET_LOADING :return{...state,loading:payload};
    
    default :return{initialstate};
  }
}