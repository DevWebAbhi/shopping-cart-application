import React, { useEffect } from 'react'
import { Box, Card, Text,Divider,ButtonGroup,Button,Image,Stack,Heading,Skeleton, SkeletonCircle, SkeletonText, CardBody, CardFooter, useMediaQuery, useToast, Select } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/action/productAction';
import SliderPrice from './SubComponents/SliderPrice';
const Home = () => {

  const [isLargerThan450] = useMediaQuery('(min-width: 450px)');
  const [isLargerThan810] = useMediaQuery('(min-width: 810px)');
  const [isLargerThan1195] = useMediaQuery('(min-width: 1195px)');
  const toast = useToast();
  const selector = useSelector(store => store.productsReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(selector)
    dispatch(getProducts());
  },[])


const handleCart = (e)=>{
  try {
    const tempData = JSON.parse(localStorage.getItem("shoping-cart-assignment-cart-items-6")) || [];
    let alreadyAdded = false;
    if(tempData.length>0){
      tempData.forEach((item,itemIndex)=>{

        if(e.id == item.id){
          console.log(e.id)
          alreadyAdded = true;
          toast({
            title: 'Item already in cart',
            duration: 9000,
            isClosable: true,
          })
          return;
        }
      })
    }
    if(alreadyAdded){
      return;
    }
    const tempProductData = {...e,itemCount:1};
    localStorage.setItem("shoping-cart-assignment-cart-items-6",JSON.stringify([...tempData,tempProductData]));
    toast({
      title: 'Sucessfully Added to cart',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  } catch (error) {
    toast({
      title: 'Error occured',
      description: "Error while adding into cart",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }
}


  return (
   <>
   <Heading textAlign={"center"} >Products</Heading>
   <Box width={"80%"} margin={"auto"} display={"flex"} justifyContent={"space-between"}>
    <SliderPrice/>
    <Box width={"max-content"} >
      <Text>Filter by Name</Text>
    <Select>
    <option value='asc'>Filter by name ascending</option>
    <option value='desc'>Filter by name decending</option>
    </Select>
    </Box>
    <Box paddingTop={"1rem"}>
      <Button>Reset filters</Button>
    </Box>
   </Box>
   <Box margin={"auto"}
    width={"max-content"} display={"grid"} gridTemplateColumns={isLargerThan1195?"repeat(3,1fr)":isLargerThan810?"repeat(2,1fr)":"repeat(1,1fr)"} gridGap={"5"} mt={"1.5rem"}>
      {
        selector.error?
        <Heading>Something went wrong</Heading>:
        selector.loading?
        [...Array(5)].map((e,index)=>(
          <Card maxW='sm' padding={"1rem"}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          >
          <CardBody>
            
            <Skeleton width={isLargerThan450?"18rem":"10rem"}
      height={isLargerThan450?"15rem":"9rem"} borderRadius='lg' />
            <Stack mt='6' spacing='3'>
              
              <Skeleton height='20px' width='90%' />
              
              <SkeletonText noOfLines={4} spacing='4' />
              
              <Skeleton height='20px' width='50%' />
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              
              <Skeleton height='40px' width='100px' />
              <Skeleton height='40px' width='100px' />
            </ButtonGroup>
          </CardFooter>
        </Card>
        )):selector.products?selector.products.map((e,index)=>(
          <Card maxW='sm' key={e.id}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          >
  <CardBody>
    <Image
      src={e.image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      width={isLargerThan450?"15rem":"10rem"}
      height={isLargerThan450?"12rem":"9rem"}
      display={"block"}
      margin={"auto"}
      
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{e.title}</Heading>
      <Text height={"4.7rem"}  width={ isLargerThan450?"100%":"70%"} overflow={"hidden"}>
        {e.description}
      </Text>
      <Text color='blue.450' fontSize='2xl'>
        ${e.price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
    <Button variant='solid' colorScheme='blue'
    onClick={()=>handleCart(e)}
    >
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
        )):<></>

      }
    </Box>
   </>
  )
}

export default Home