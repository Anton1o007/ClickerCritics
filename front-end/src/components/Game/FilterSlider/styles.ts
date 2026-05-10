import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    background:linear-gradient(
      to right,
      #ff0000 0%,
      #ff0000 10%,
      #ff4000 10%,
      #ff4000 20%,
      #ff8000 20%,
      #ff8000 30%,
      #ffbf00 30%,
      #ffbf00 40%,
      #ffff00 40%,
      #ffff00 50%,
      #bfff00 50%,
      #bfff00 60%,
      #80ff00 60%,
      #80ff00 70%,
      #40ff00 70%,
      #40ff00 80%,
      #00ff00 80%,
      #00ff00 90%,
      #00ff80 90%,
      #00ff80 100%
    );
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
  font-size: 20px;
  margin-bottom: 10px;
  border: 2.5px solid ${(props) => props.theme.nord.dark0};
  border-radius: 5px;
`;
