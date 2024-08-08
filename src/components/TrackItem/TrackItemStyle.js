const { default: styled } = require("styled-components");

export const TrackContainer = styled.div`
    padding: 16px;
    &:hover{
        background: rgba(255, 255, 255, 0.08);
    }

    .track-name{
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
    }

    .track-artist{
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
    }

    .duration{
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
    }
`;