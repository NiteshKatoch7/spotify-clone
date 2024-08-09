const { default: styled } = require("styled-components");

export const ListContainer = styled.div`
    transition: all 0.6s ease-in-out;

    @media only screen and (max-width: 1024px){
        width: 50%;
    }

    @media only screen and (max-width: 767px){
        position: fixed;
        left: -320px;
        top: 0;
        z-index: 99;
        height: 100vh;
        width: 320px;
        background: ${({ selectedColor }) => `
          linear-gradient(
            108.18deg,
            ${selectedColor} 2.46%, 
            #000000 99.84%
          )
        `};

        &.active{
            left: 0;
        }
    }

    .close-btn{
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${({ selectedColor }) => `
          linear-gradient(
            108.18deg,
            ${selectedColor} 2.46%, 
            #000000 99.84%
          )
        `};
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 100%;
        position: absolute;
        right: 12px;
        top: 12px;

        @media only screen and (min-width: 767px){
            display: none;
        }
    }

    nav{
        padding: 0 16px;
        ul{
            gap: 0 12px;

            li{
                button{
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 32px;
                    color: #ffffff;
                    opacity: 0.7;
                    transition: all 0.3s ease-in-out;

                    &.active{
                        opacity: 1;
                    }
                }
            }
        }
    }

    .search-input{
        padding: 8px 16px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        margin-bottom: 24px;

        &::-webkit-input-placeholder{
            color: #ffffff;
            opacity: 0.7;
            font-weight: 400;
        }
        
        &:focus{
            outline: 0;
        }
    }

    .tracks-list{
        height: calc(100% - 120px);
        overflow: auto;

        &::-webkit-scrollbar{
            width: 0;
        }
    }
`;

export const InputContainer = styled.div`
    position: relative;
    padding: 0 16px;

    img{
        position: absolute;
        right: 24px;
        top: 4px;
    }
`;