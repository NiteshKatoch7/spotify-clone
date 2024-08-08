const { default: styled } = require("styled-components");

export const MainWrapper = styled.div`
  position: relative;
`;

export const ButtonGroup = styled.div`
  .music-control{
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 100%;
  }
  
  button{
    &.control-btn{
      &:disabled{
      svg{
        g{
          opacity: 0.6;
        }
      }
      }
      svg{
        path{
          fill: #ffffff;
        }
      }
    }
  }
`;

export const PlayerContainer = styled.div`
  max-height: 680px;
  height: 100%;
  max-width: 480px;

  @media only screen and (max-width: 1023px){
    margin-top: 80px;
    max-height: 480px;
  }

  @media only screen and (max-width: 767px){
    margin: 80px auto 0;
    max-height: calc(100vh - 100px);
  }

  .header-body{
    h2{
      font-size: 32px;
      font-weight: 700;
      line-height: 36px;
    }

    p{
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }

  .img-container{
    width: 100%;
    height: 480px;
    object-fit: cover;

    @media only screen and (max-width: 1536px){
      height: 360px;
    }

    @media only screen and (max-width: 1025px){
      height: 300px;
    }

    img{
      transition: all 0.6s ease-in-out;
    }
  }
`;

export const PlayListBtn = styled.button`
  background: ${({ selectedColor }) => `
    linear-gradient(
      108.18deg,
      ${selectedColor} 2.46%, 
      #000000 99.84%
    )
  `};
  box-shadow: rgba(255, 255, 255, 0.05) 0px 6px 24px 0px, rgba(255, 255, 255, 0.08) 0px 0px 0px 1px;
  padding: 12px 8px;
  color: #ffffff;
  border-radius: 8px;
  min-width: 120px;

  @media only screen and (min-width: 767px){
      display: none;
  }
`;

export const AudioContainer = styled.div`
  .progress-bar{
    width: 100%;
    height:5px;
    background-color: rgba(255, 255, 255,0.6);
    border-radius: 8px;
    margin-bottom: 24px;
    position: relative;
    height: 0;

    .progress{
      background-color: #ffffff;
      height: 5px;
      border-radius: 8px;
      opacity: 1;
      position: absolute;
      top: 12px;
    }
  }
`;

export const FloatingWrapper = styled.div`
  position: absolute;
  top: 0;
  max-width: 480px;
  max-height: 80px;
  margin: 0 auto;
`;