import './App.css';
import { CreateUser } from './components/CreateUser';
import { CreateGarden } from './components/CreateGarden';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import NavBarAdmin from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { UserList } from './components/UserList';
import { GardenList } from './components/GardenList';

function App() {
  return (
    <div>
      <header>
        <NavBarAdmin></NavBarAdmin>
      </header>
      <Routes>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='user' element={<UserList></UserList>}></Route>
        <Route path='/user/create' element={<CreateUser></CreateUser>}></Route>
        <Route
          path='user/reset'
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path='garden/create' element={<CreateGarden />} />
        <Route path='garden' element={<GardenList />} />
      </Routes>
    </div>
  );
}

export default App;
