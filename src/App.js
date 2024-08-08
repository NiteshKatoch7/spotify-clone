import './App.css';
import MainContainer from './components/mainContainer/MainContainer';
import MiniSidebar from './components/MiniSidebar';
import ListSidebar from './components/ListContainer/ListSidebar';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

function App() {
  const { selectedColor } = useSelector((state) => state.tracks);

  return (
    <Container selectedColor={selectedColor} className="flex h-screen text-white">
      <MiniSidebar />
      <ListSidebar />
      <MainContainer />
    </Container>
  );
}

const spreadAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  background: ${({ selectedColor }) => `
    linear-gradient(
      108.18deg,
      ${selectedColor} 2.46%, 
      #000000 99.84%
    )
  `};
  transition: all 0.6s ease-in-out;
  overflow: hidden;
  animation: ${({ isSpread }) => (isSpread ? `${spreadAnimation} 1s ease-in-out 1` : 'none')};
  transform-origin: center center;
`;

export default App;
