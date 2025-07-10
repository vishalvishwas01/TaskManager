import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Settings from "./Components/Settings/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/Settings" element={<Settings/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
