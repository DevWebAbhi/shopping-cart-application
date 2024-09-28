import { GET_ALL_PRODUCTS, SET_ERROR, SET_LOADING, SET_SLIDER_MAX, SET_SLIDER_MIN } from "../actionTypes/productActionTypes"

const initialstate = {
    products:[],
    loading:false,
    error:false,
    sliderMax:5000,
    sliderMin:0
}

export const productsReducer = (state = initialstate,{type,payload})=>{
  switch(type){
    case GET_ALL_PRODUCTS :return{...state,products:payload};
    case SET_ERROR :return{...state,error:payload};
    case SET_LOADING :return{...state,loading:payload};
    case SET_SLIDER_MAX:return{...state,sliderMax:payload};
    case SET_SLIDER_MIN:return{...state,sliderMin:payload};
    
    default :return{initialstate};
  }
}