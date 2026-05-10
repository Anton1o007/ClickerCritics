import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 20px;
`;

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SliderRange = styled(Slider)`
  width:100%;
  .rc-slider-rail {
    background-color: ${(props) => props.theme.nord.dark1};
    height: 8px; // Altura del riel
    border-radius: 4px; // Bordes del riel
  }

  .rc-slider-track {
    background-color: transparent; // Color de la parte llena del slider
    height: 8px; // Altura de la parte llena del slider
    border-radius: 4px; // Bordes de la parte llena del slider
  }

  .rc-slider-handle {
    width: 18px; // Ancho del thumb
    height: 18px; // Altura del thumb
    border: 2px solid ${(props) => props.theme.nord.dark0};
    background-color: #fff; // Color de fondo del thumb
    margin-top: -5px; // Ajuste para centrar el thumb verticalmente
  }
`;
export const RatingLabel = styled.p`
  display: flex;
  flex-direction: row;
  width: max-content;
  text-align: center;
  padding: 5px;
  color: ${(props) => props.theme.nord.dark0};
  font-family: "proxima-nova-extrabold", sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
  border: 2.5px solid ${(props) => props.theme.nord.dark0};
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  width: 230px;
  background-color: ${props => props.theme.nord.dark1};
  color: ${props => props.theme.nord.light0};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.nord.blue4};
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  gap:10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  gap: 10px;
`;