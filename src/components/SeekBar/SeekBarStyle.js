const { default: styled } = require("styled-components");

export const SeekerWrapper = styled.div`
  position: relative;

  input{
    width: 100%;
    height: 6px;
    appearance: none;
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    cursor: pointer;

    &::-webkit-slider-runnable-track {
        height: 6px;
        appearance: none;
        -webkit-appearance: none;
        // background-color: #ffffff;
        border-radius: 8px;
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        width: 0px;
        appearance: none;
        -webkit-appearance: none;
        height: 6px;
        border-radius: 8px;
        background: #ffffff;
    }

    &:-moz-range-progress {
      background-color: rgba(255, 255, 255, 0.6); 
    }

    &::-moz-range-thumb {
      height: 6px;
      width: 0;
      border: none;
      box-sizing: border-box;
    }

    &::-ms-fill-lower {
      background-color: rgba(255, 255, 255, 0.6); 
    }

    &::-ms-fill-upper {  
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
`;