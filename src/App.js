import './App.css';
import MainContainer from './components/mainContainer/MainContainer';
import MiniSidebar from './components/MiniSidebar';
import ListSidebar from './components/ListSidebar';

function App() {
  return (
    <div className="flex h-screen bg-black text-white">
      <MiniSidebar />
      <ListSidebar />
      <MainContainer />
    </div>
  );
}

export default App;
