import React, { useEffect } from 'react'
import { Box, Card, Text,Divider,ButtonGroup,Button,Image,Stack,Heading,Skeleton, SkeletonCircle, SkeletonText, CardBody, CardFooter, useMediaQuery } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/action/productAction';
const Home = () => {

  const [isLargerThan450] = useMediaQuery('(min-width: 450px)');
  const [isLargerThan810] = useMediaQuery('(min-width: 810px)');
  const [isLargerThan1195] = useMediaQuery('(min-width: 1195px)');
  const selector = useSelector(store => store.productsReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(selector)
    dispatch(getProducts());
  },[])
  return (
    <Box margin={"auto"}
    width={"max-content"} display={"grid"} gridTemplateColumns={isLargerThan1195?"repeat(3,1fr)":isLargerThan810?"repeat(2,1fr)":"repeat(1,1fr)"} gridGap={"5"} mt={"1.5rem"}>
      {
        selector.error?
        <Heading>Something went wrong</Heading>:
        selector.loading?
        [...Array(5)].map((e,index)=>(
          <Card maxW='sm' padding={"1rem"}>
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
          <Card maxW='sm'>
  <CardBody>
    <Image
      src={e.image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      width={isLargerThan450?"18rem":"10rem"}
      height={isLargerThan450?"15rem":"9rem"}
      display={"block"}
      margin={"auto"}
      
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
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
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
        )):<></>

      }
    </Box>
  )
}

export default Home