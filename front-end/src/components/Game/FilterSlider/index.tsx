import type { FC } from "react";
import { useState } from "react";
import { Container, RatingLabel, SliderContainer, SliderRange } from "./styles";

export type Props = {
  setMinScore: React.Dispatch<React.SetStateAction<number | null>>;
  setMaxScore: React.Dispatch<React.SetStateAction<number | null>>;
};

const FilterSlider: FC<Props> = ({ setMaxScore, setMinScore }) => {
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(10);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinRating(value[0]);
      setMinScore(value[0]);
      setMaxRating(value[1]);
      setMaxScore(value[1]);
      if(value[0]===0 && value[1]===10){
        setMinScore(null);
        setMaxScore(null);
      }
    } else if (typeof value === "number") {
      if (value < maxRating) {
        setMinRating(value);
        setMinScore(value);
      } else {
        setMaxRating(value);
        setMaxScore(value);
      }
    }
  };

  return (
    <Container>
      <RatingLabel>
        {`${
          minRating !== maxRating ? `${minRating} - ${maxRating}` : minRating
        }`}
      </RatingLabel>
      <SliderContainer>
        <SliderRange
          min={0}
          max={10}
          step={1}
          value={[minRating, maxRating]}
          onChange={handleSliderChange}
          range // Indicación de que el slider es un rango
        />
      </SliderContainer>
    </Container>
  );
};

export default FilterSlider;
