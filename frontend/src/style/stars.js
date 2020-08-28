import styled from 'styled-components';

export const RatingStars = styled.p`
  display: inline-block;
  font-size: 28px;
  font-family: Times;
  line-height: 1;

  &::before {
    content: '★★★★★';
    letter-spacing: 3px;

    background: ${(props) =>
      'linear-gradient(90deg, #d7e23b ' +
      (props.rating / 5) * 100 +
      '%, #e5e5e5 ' +
      (props.rating / 5) * 100 +
      '%)'};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
