const { default: styled } = require("styled-components");

export const VolumeControllerWrapper = styled.div`
  position: relative;

  button{
    border-radius: 100%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;