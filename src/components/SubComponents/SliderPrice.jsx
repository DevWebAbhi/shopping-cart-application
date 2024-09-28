import { Box, Button, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SLIDER_MAX, SET_SLIDER_MIN } from '../../redux/actionTypes/productActionTypes';

const SliderPrice = () => {
  const selector = useSelector(store => store.productsReducer);
  const dispatch = useDispatch();

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  return (
<>

<Box width={"35%"}>
    <Text textAlign={"center"}>Filter By Price</Text>
<Box display="flex" flexDirection="row" gap="8" width="100%">
      <Box width={"49%"}>
        <Slider
          aria-label="slider-ex-6"
          defaultValue={selector.sliderMin || 0}
          min={0}
          max={2500}
          onChange={(val) => dispatch({ type: SET_SLIDER_MIN, payload: val })}
        >
          <SliderMark {...labelStyles}>Start Price</SliderMark>
          <SliderMark
            value={selector.sliderMin || 0}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
            w="12"
          >
            {selector.sliderMin || 0}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <Box
      width={"49%"}
      >
        <Slider
          aria-label="slider-ex-6"
          defaultValue={selector.sliderMax || 5000}
          min={2501}
          max={5000}
          onChange={(val) => dispatch({ type: SET_SLIDER_MAX, payload: val })}
        >
          <SliderMark {...labelStyles}>End Price</SliderMark>
          <SliderMark
            value={selector.sliderMax || 5000}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
            w="12"
          >
            {selector.sliderMax || 5000}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Box>
        <Button>Filter</Button>
      </Box>
    </Box>
</Box>
</>
  );
};

export default SliderPrice;
