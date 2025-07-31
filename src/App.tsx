import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { User } from "./components/User";
import { FormUser } from "./components/FormUser";
import { EditUser } from "./components/EditUser";
import { useFetchUsers } from "./hooks/useFetchUsers";

function App() {

  const { search, setSearch, handleKeyDown, users, handleDelete } = useFetchUsers();

  return (
    <>
      <Nav search={search} setSearch={setSearch} handleKeyDown={handleKeyDown} />   
      <Routes>
        <Route path="/" element={<User users={users} handleDelete={handleDelete} />} />
        <Route path="/create" element={<FormUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </>

  )
}

export default App
