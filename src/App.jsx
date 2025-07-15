import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import MyTask from "./Components/MyTask/MyTask";
import History from "./Components/History/History";
import Settings from "./Components/Settings/Settings";
import Signup from "./Components/Admin/Signup";
import Login from "./Components/Admin/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/MyTask" element={<MyTask/>}></Route>
          <Route path="/history" element={<History/>}></Route>
          <Route path="/settings" element={<Settings/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
