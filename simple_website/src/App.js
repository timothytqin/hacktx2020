import logo from './Group_5.svg';
import './App.css';
import DefaultMap from './map.js';
function App() {
  return (
    <div className="App">
      <div className = "navbar">
          <div className = "logo">
            <img src={logo}alt="Logo"height="100"width="100"/>
            <h1 style = {{color: "white"}}>  Refuge</h1>
          </div>
          <div className = "elem"><h2 style = {{color: "white"}}>About us</h2></div>
          <div className = "elem"><h2 style = {{color: "white"}}>Our mission</h2></div>
          <div className = "elem"><h2 style = {{color: "white"}}>Contact</h2></div>

      </div>
      <div className = "map">
        <DefaultMap/>
       </div> 
      
    </div>
  );
}

export default App;