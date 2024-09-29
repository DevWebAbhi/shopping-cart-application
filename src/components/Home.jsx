import React, { useEffect } from "react";
import {
  Box,
  Card,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Stack,
  Heading,
  Skeleton,
  SkeletonText,
  CardBody,
  CardFooter,
  useMediaQuery,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action/productAction";
import SliderPrice from "./SubComponents/SliderPrice";
import ModelFilter from "./SubComponents/ModelFilter";
import {
  GET_ALL_PRODUCTS,
  SET_LOADING,
} from "../redux/actionTypes/productActionTypes";
const Home = () => {
  const [isLargerThan330] = useMediaQuery("(min-width: 330px)");
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const [isLargerThan810] = useMediaQuery("(min-width: 810px)");
  const [isLargerThan1195] = useMediaQuery("(min-width: 1195px)");
  const toast = useToast();
  const selector = useSelector((store) => store.productsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(selector);
    dispatch(getProducts());
  }, []);

  const handleCart = (e) => {
    try {
      const tempData =
        JSON.parse(
          localStorage.getItem("shoping-cart-assignment-cart-items-6")
        ) || [];
      let alreadyAdded = false;
      if (tempData.length > 0) {
        tempData.forEach((item, itemIndex) => {
          if (e.id == item.id) {
            console.log(e.id);
            alreadyAdded = true;
            toast({
              title: "Item already in cart",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
        });
      }
      if (alreadyAdded) {
        return;
      }
      const tempProductData = { ...e, itemCount: 1 };
      localStorage.setItem(
        "shoping-cart-assignment-cart-items-6",
        JSON.stringify([...tempData, tempProductData])
      );
      toast({
        title: "Sucessfully Added to cart",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Error while adding into cart",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  function filterbyPrice() {
    let newData = [];
    dispatch({ type: SET_LOADING, payload: true });

    selector.products.forEach((e) => {
      const price = Number(e.price);
      const minPrice = Number(selector.sliderMin) || 0;
      const maxPrice = Number(selector.sliderMax) || 5000;

      if (price >= minPrice && price <= maxPrice) {
        newData.push(e);
      }
    });

    console.log(newData, selector.sliderMin, selector.sliderMax);

    dispatch({ type: GET_ALL_PRODUCTS, payload: newData });

    setTimeout(() => {
      dispatch({ type: SET_LOADING, payload: false });
    }, 1500);
  }

  function sortByPrice(e) {
    let newData = [];
    dispatch({ type: SET_LOADING, payload: true });

    if (e.target.value === "asc") {
      newData = [...selector.products].sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });
    } else if (e.target.value === "desc") {
      newData = [...selector.products].sort((a, b) => {
        return Number(b.price) - Number(a.price);
      });
    }

    dispatch({ type: GET_ALL_PRODUCTS, payload: newData });

    setTimeout(() => {
      dispatch({ type: SET_LOADING, payload: false });
    }, 1500);
  }

  function resetFilter() {
    dispatch(getProducts());
  }

  return (
    <>
      <Heading textAlign={"center"}>Products</Heading>
      {isLargerThan1195 ? (
        <Box
          width={"80%"}
          margin={"auto"}
          display={"flex"}
          justifyContent={"space-between"}
          border={"1px solid"}
          borderColor={"rgba(160,160,255,0.5)"}
          borderRadius={"0.5rem"}
          padding={"0.3rem 1.5rem"}
        >
          <SliderPrice filterbyPrice={filterbyPrice} />
          <Box width={"max-content"}>
            <Text>Sort by price</Text>
            <Select
              onChange={(e) => {
                sortByPrice(e);
              }}
            >
              <option value="">Sort</option>
              <option value="asc">Sort by price ascending</option>
              <option value="desc">Sort by price decending</option>
            </Select>
          </Box>
          <Box paddingTop={"1rem"}>
            <Button onClick={resetFilter} colorScheme="blue">
              Reset filters
            </Button>
          </Box>
        </Box>
      ) : (
        <Box width={"max-content"} margin={"auto"}>
          <ModelFilter
            filterbyPrice={filterbyPrice}
            sortByPrice={sortByPrice}
            resetFilter={resetFilter}
          />
        </Box>
      )}
      <Box
        margin={"auto"}
        width={"max-content"}
        display={"grid"}
        gridTemplateColumns={
          isLargerThan1195
            ? "repeat(3,1fr)"
            : isLargerThan810
            ? "repeat(2,1fr)"
            : "repeat(1,1fr)"
        }
        gridGap={"5"}
        mt={"1.5rem"}
      >
        {selector.error ? (
          <Heading>Something went wrong</Heading>
        ) : selector.loading ? (
          [...Array(5)].map((e, index) => (
            <Card
              maxW="sm"
              padding={"1rem"}
              boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
            >
              <CardBody>
                <Skeleton
                  width={isLargerThan450 ? "18rem" : "10rem"}
                  height={isLargerThan450 ? "15rem" : "9rem"}
                  borderRadius="lg"
                  margin={"auto"}
                />
                <Stack mt="6" spacing="3">
                  <Skeleton height="20px" width="90%" />

                  <SkeletonText noOfLines={4} spacing="4" />

                  <Skeleton height="20px" width="50%" />
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Skeleton height="40px" width="100px" />
                  <Skeleton height="40px" width="100px" />
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))
        ) : selector.products ? (
          selector.products.map((e, index) => (
            <Card
              maxW={
                isLargerThan450 ? "sm" : isLargerThan330 ? "19rem" : "15rem"
              }
              key={e.id}
              boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
            >
              <CardBody>
                <Image
                  src={e.image}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  width={isLargerThan450 ? "15rem" : "10rem"}
                  height={isLargerThan450 ? "12rem" : "9rem"}
                  display={"block"}
                  margin={"auto"}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{e.title}</Heading>
                  <Text height={"4.7rem"} width={"100%"} overflow={"hidden"}>
                    {e.description}
                  </Text>
                  <Text color="blue.450" fontSize="2xl">
                    ${e.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleCart(e)}
                  >
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default Home;
