import './App.css';
import Header from './Header/Header'
import DataField from './DataField/DataField';
import Menu from './Menu/Menu'
import useClient from './connection/useClient'

 
function App() {
  useClient()

  return ( 
    <div className = "App" >
      <Header/>
      <DataField/>
      <Menu/>
    </div>
  );
}

export default App;
