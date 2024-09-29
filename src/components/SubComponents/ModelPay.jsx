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
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  GET_ALL_CART,
  SET_TOTAL_PRICE,
} from "../../redux/actionTypes/cartActionsTypes";

function ModelPay({ price }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const ref = useRef();
  const payNow = (onClose) => {
    if (ref.current === "1235") {
      toast({
        title: "Payment Sucessful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem(
        "shoping-cart-assignment-cart-items-6",
        JSON.stringify([])
      );
      dispatch({ type: GET_ALL_CART, payload: [] });
      dispatch({ type: SET_TOTAL_PRICE, payload: [] });
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      toast({
        title: "Wrong PIN",
        status: "error",
        description: "Enter Test PIN 1235",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button variant="solid" colorScheme="green" onClick={onOpen}>
        Pay Now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay Now</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Text mb={"1.5rem"} color="blue.450" fontSize="2xl">
              Enter Test PIN 1235
            </Text>
            <Text>Grand Total {" : $" + price}</Text>
          </ModalBody>
          <HStack width={"max-content"} margin={"auto"} mt={"3rem"}>
            <PinInput
              otp
              onChange={(e) => {
                ref.current = e;
              }}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <ModalFooter>
            <Button
              colorScheme="blue"
              margin={"auto"}
              onClick={() => {
                payNow(onClose);
              }}
            >
              Pay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModelPay;
