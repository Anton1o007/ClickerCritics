import { useState, ChangeEvent, FC } from "react";
import { Container, RatingLabel, Slider, SliderContainer } from "./styles";

export type Props = {
  onRatingChange: (value: number) => void;
};

const RatingSlider: FC<Props> = ({ onRatingChange }) => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setRating(value);
    onRatingChange(value);
  };

  return (
    <Container>
      <RatingLabel>{rating}</RatingLabel>
      <SliderContainer>
        <Slider
          type="range"
          min="0"
          max="10"
          step="1"
          value={rating.toString()}
          onChange={handleRatingChange}
        />
      </SliderContainer>
    </Container>
  );
};

export default RatingSlider;
