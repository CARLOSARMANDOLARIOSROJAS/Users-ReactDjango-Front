import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { User } from "./components/User";
import { FormUser } from "./components/FormUser";
import { EditUser } from "./components/EditUser";

function App() {


  return (
    <>
      <Nav />
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/create" element={<FormUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
    </>

  )
}

export default App
