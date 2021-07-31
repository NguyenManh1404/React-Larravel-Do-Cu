import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Header from "./components/Header/Header";


function App() {
  return (
    <>
      <Router>
          <Header />
        <h1>Hellod</h1>
      </Router>
    </>
  );
}

export default App;
