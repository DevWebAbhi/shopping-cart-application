import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    PinInput, 
    PinInputField,
    HStack,
    useToast,
    Box,
    Select
  } from '@chakra-ui/react'
  import { useRef } from 'react';
  import { useDispatch } from 'react-redux';
  import { GET_ALL_CART, SET_TOTAL_PRICE } from '../../redux/actionTypes/cartActionsTypes';
import SliderPrice from './SliderPrice';
  
  function ModelFilter({filterbyPrice,sortByPrice,resetFilter}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const dispatch = useDispatch();
   
    
    return (
      <>
        <Button variant='solid' colorScheme='blue' onClick={onOpen}>Filter Popup</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filter</ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={"center"}>
            <Box width={"100%"} margin={"auto"}  >
    <SliderPrice width={"100%"} filterbyPrice={filterbyPrice}/>
    <Box width={"max-content"} margin={"auto"} >
      <Text>Sort by price</Text>
    <Select onChange={(e)=>{sortByPrice(e)}}>
    <option value=''>Sort</option>
    <option value='asc'>Sort by price ascending</option>
    <option value='desc'>Sort by price decending</option>
    </Select>
    </Box>
    <Box paddingTop={"1rem"}>
      <Button onClick={resetFilter}>Reset filters</Button>
    </Box>
   </Box>
            </ModalBody>
            
            <ModalFooter>
              
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default ModelFilter;