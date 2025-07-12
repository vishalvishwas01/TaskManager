import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import MyTask from "./Components/MyTask/MyTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/MyTask" element={<MyTask/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
