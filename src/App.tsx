import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { User } from "./components/User";
import { FormUser } from "./components/FormUser";
import { EditUser } from "./components/EditUser";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { Login } from "./components/Login";
import {store} from "./app/store"; // Assuming you have a Redux store setup
import { Provider } from "react-redux";

function App() {

  const { search, setSearch, handleKeyDown, users, handleDelete } = useFetchUsers();

  return (
    <>
      <Provider store={store}>
        <Nav search={search} setSearch={setSearch} handleKeyDown={handleKeyDown} />   
        <Routes>
          <Route path="/" element={<User users={users} handleDelete={handleDelete} />} />
          <Route path="/create" element={<FormUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Provider>
    </>

  )
}

export default App
