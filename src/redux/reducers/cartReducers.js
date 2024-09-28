import { GET_ALL_CART, SET_CART_ERROR, SET_CART_LOADING, SET_TOTAL_PRICE } from "../actionTypes/cartActionsTypes";


const initialstate = {
    cart:[],
    loading:false,
    error:false,
    totalPrice:0
}

export const cartReducer = (state = initialstate,{type,payload})=>{
  switch(type){
    case GET_ALL_CART :return{...state,cart:payload};
    case SET_CART_ERROR :return{...state,error:payload};
    case SET_CART_LOADING :return{...state,loading:payload};
    case SET_TOTAL_PRICE : return({...state,totalPrice:payload});
    default :return{initialstate};
  }
}