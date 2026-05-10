import React, { FC, useState, useEffect } from "react";
import {
  Container,
  RatingLabel,
  Row,
  SliderContainer,
  SliderRange,
  SubmitButton,
} from "./styles";

const WeightSlider: FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [userSliderWeight, setUserSliderWeight] = useState<number>(0);
  const [professionalSliderWeight, setProfessionalSliderWeight] =
    useState<number>(0);
  const [userWeight, setUserWeight] = useState<number>(0);
  const [professionalWeight, setProfessionalWeight] = useState<number>(0);

  useEffect(() => {
    const fetchUserWeights = async () => {
      try {
        const response = await fetch(
          "https://clicker-critics-api.onrender.com/score_weights/get_weights",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los pesos del usuario");
        }
        const data = await response.json();

        if (data.user_weight === 1.0 && data.professional_weight === 0.0) {
          setSliderValue(1.0);
          setUserSliderWeight(1.0);
          setProfessionalSliderWeight(0.0);
        } else if (
          data.user_weight === 1.0 &&
          data.professional_weight === 0.5
        ) {
          setSliderValue(0.75);
          setUserSliderWeight(0.75);
          setProfessionalSliderWeight(0.25);
        } else if (
          data.user_weight === 1.0 &&
          data.professional_weight === 1.0
        ) {
          setSliderValue(0.5);
          setUserSliderWeight(0.5);
          setProfessionalSliderWeight(0.5);
        } else if (
          data.user_weight === 0.5 &&
          data.professional_weight === 1.0
        ) {
          setSliderValue(0.25);
          setUserSliderWeight(0.25);
          setProfessionalSliderWeight(0.75);
        } else if (
          data.user_weight === 0.0 &&
          data.professional_weight === 1.0
        ) {
          setSliderValue(0.0);
          setUserSliderWeight(0.0);
          setProfessionalSliderWeight(1.0);
        }

        setUserWeight(data.user_weight);
        setProfessionalWeight(data.professional_weight);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserWeights();
  }, []);

  const handleUserSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      let uWeight: number = 1.0;
      let pWeight: number = 1.0;

      if (value === 1.0) {
        uWeight = 1.0;
        pWeight = 0.0;
        setUserSliderWeight(1.0);
        setProfessionalSliderWeight(0.0);
      } else if (value === 0.75) {
        uWeight = 1.0;
        pWeight = 0.5;
        setUserSliderWeight(0.75);
        setProfessionalSliderWeight(0.25);
      } else if (value === 0.5) {
        uWeight = 1.0;
        pWeight = 1.0;
        setUserSliderWeight(0.5);
        setProfessionalSliderWeight(0.5);
      } else if (value === 0.25) {
        uWeight = 0.5;
        pWeight = 1.0;
        setUserSliderWeight(0.25);
        setProfessionalSliderWeight(0.75);
      } else if (value === 0.0) {
        uWeight = 0.0;
        pWeight = 1.0;
        setUserSliderWeight(0.0);
        setProfessionalSliderWeight(1.0);
      }

      setSliderValue(value);
      setUserWeight(uWeight);
      setProfessionalWeight(pWeight);
    }
  };

  const handleApplyChanges = async () => {
    try {
      const response = await fetch(
        "https://clicker-critics-api.onrender.com/score_weights/add_or_update_weight",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            user_weight: userWeight,
            professional_weight: professionalWeight,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al agregar el peso");
      }
      console.log("Peso asignado correctamente");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Row>
        <RatingLabel>Usuario {userSliderWeight * 100}%</RatingLabel>
        <SliderContainer>
          <SliderRange
            min={0}
            max={1}
            step={0.25}
            value={sliderValue}
            onChange={handleUserSliderChange}
          />
        </SliderContainer>
        <RatingLabel>Profesional {professionalSliderWeight * 100}%</RatingLabel>
      </Row>
      <SubmitButton onClick={handleApplyChanges}>Aplicar Cambios</SubmitButton>
    </Container>
  );
};

export default WeightSlider;
