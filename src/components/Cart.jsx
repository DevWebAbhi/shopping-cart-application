import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Text,Divider,ButtonGroup,Button,Image,Stack,Heading,Skeleton, SkeletonCircle, SkeletonText, CardBody, CardFooter, useMediaQuery, useToast, Modal } from '@chakra-ui/react'
import { GET_ALL_CART, SET_TOTAL_PRICE } from '../redux/actionTypes/cartActionsTypes';
import ModelPay from './SubComponents/ModelPay';

const Cart = () => {

    const [isLargerThan450] = useMediaQuery('(min-width: 450px)');
    const [isLargerThan810] = useMediaQuery('(min-width: 810px)');
    const [isLargerThan1195] = useMediaQuery('(min-width: 1195px)');
    const toast = useToast();
    const selector = useSelector(store => store.cartReducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("shoping-cart-assignment-cart-items-6")) || [];
        let totalPrice = 0;
        data.forEach((e)=>{
            totalPrice+=(Number(e.itemCount)*Number(e.price));
        });
        dispatch({type:SET_TOTAL_PRICE,payload:totalPrice});
        dispatch({type:GET_ALL_CART,payload:data});
      console.log(selector)
    },[])

    function increaseQuantity(e){
        
        const data = JSON.parse(localStorage.getItem("shoping-cart-assignment-cart-items-6")) || [];
        const newData = data.map((item,index)=>{
            if(item.id === e.id){
                return {...item,itemCount:item.itemCount+1}
            }else{
                return item;
            }
        })
        dispatch({type:GET_ALL_CART,payload:newData});
        dispatch({type:SET_TOTAL_PRICE,payload:selector.totalPrice+e.price});
        localStorage.setItem("shoping-cart-assignment-cart-items-6",JSON.stringify(newData));
    }

    function decreaseQuantity(e){
        if(e.itemCount === 1){
            return;
        }
        const data = JSON.parse(localStorage.getItem("shoping-cart-assignment-cart-items-6")) || [];
        const newData = data.map((item,index)=>{
            if(item.id === e.id){
                return {...item,itemCount:item.itemCount-1}
            }else{
                return item;
            }
        })
        dispatch({type:GET_ALL_CART,payload:newData});
        dispatch({type:SET_TOTAL_PRICE,payload:selector.totalPrice-e.price});
        localStorage.setItem("shoping-cart-assignment-cart-items-6",JSON.stringify(newData));
    }

    function removeItem(e){
        const data = JSON.parse(localStorage.getItem("shoping-cart-assignment-cart-items-6")) || [];
        const newData = [];
        for(let i=0;i<data.length;i++){
            if(data[i].id!=e.id){
                newData.push(data[i]);
            }
        }
        console.log(data)
        dispatch({type:GET_ALL_CART,payload:newData});
        dispatch({type:SET_TOTAL_PRICE,payload:selector.totalPrice-(e.price*e.itemCount)});
        localStorage.setItem("shoping-cart-assignment-cart-items-6",JSON.stringify(newData));
    }
  return (
    <Box width={"90%"} margin={"auto"}>
        <Heading textAlign={"center"}>Cart</Heading>
        {
            selector.cart?selector.cart.length<1?<Heading textAlign={"center"} mt={"1rem"}>No item added in cart</Heading>:
            selector.cart.map((e,index)=>(
                <Card
                key={e.id}
                padding={"0.5rem"}
                mt={"1rem"}
        direction={{ base: 'column', md: 'row' }}
        overflow='hidden'
        variant='outline'
        boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
>
  <Image
    display={"block"}
    margin={"auto"}
    width={isLargerThan450?"18rem":"10rem"}
    height={isLargerThan450?"15rem":"9rem"}
    src={e.image}
    alt='Image'
  />

  <Stack width={"100%"}>
    <CardBody>
      <Heading size='md'>{e.title}</Heading>

      <Text py='2'>
        {e.description}
      </Text>
    </CardBody>

    <CardFooter display={isLargerThan450?"flex":"block"} width={"100%"} justifyContent={"space-between"}>
      <Box display={"flex"} margin={"auto"}>
      <Button variant='solid' colorScheme='blue' onClick={()=>decreaseQuantity(e)}>
        -
      </Button>
      <Button variant='solid' colorScheme='ghost' color='blue.450'>
        {e.itemCount}
      </Button>
      <Button variant='solid' colorScheme='blue' onClick={()=>increaseQuantity(e)}>
        +
      </Button>
      </Box>
      <Box>
      <Button variant='solid' colorScheme='red' onClick={()=>removeItem(e)}>
        Remove
      </Button>
      </Box>
      <Box ml={"2rem"} color='blue.450' fontSize='2xl' margin={"auto"}>
        Price ${(Number(e.itemCount)*Number(e.price)).toFixed(2)}
      </Box>
    </CardFooter>
  </Stack>
</Card>
            )):<></>
        }
        <Box
        position={"fixed"}
        bottom={"0"}
        right={"10"}
        backgroundColor={"#aad6ec"}
        padding={'1rem'}
        display={"flex"}
        justifyContent={"space-between"}
        >
            <Text color='blue.450' mr={"1rem"} fontSize='2xl' display={"flex"}>
                <Text color={"gray"}>Total Price</Text>{" : "} {Number(selector.totalPrice).toFixed(2)}
            </Text >
            <ModelPay price = {selector.totalPrice}/>
        </Box>
    </Box>
  )
}

export default Cart