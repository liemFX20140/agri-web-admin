import './App.css';
import { CreateUser } from './components/CreateUser';
import { CreateGarden } from './components/CreateGarden';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import NavBarAdmin from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { UserList } from './components/UserList';
import { GardenList } from './components/GardenList';
import { useDispatch } from 'react-redux';

import { logIn } from './store/authSlice';
import { Button } from '@material-tailwind/react';
import { useEffect } from 'react';
import { EditGarden } from './components/EditGarden';
import { EditUser } from './components/EditUser';
import { CreateTree } from './components/CreateTree';
import { TreeList } from './components/TreeList';
import { TreeDetail } from './components/TreeDetail';

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const getLogin = async () => {
    const res = await fetch(`${baseUrl}/user/get`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (res.status === 200) {
      dispatch(logIn(data));
    }
  };
  useEffect(() => {
    getLogin();
  }, []);
  return (
    <div>
      <header>
        <NavBarAdmin></NavBarAdmin>
      </header>
      <Routes>
        <Route path='login' element={<Login></Login>}></Route>
        <Route
          path='/'
          element={<Button onClick={() => {}}>Home Page</Button>}
        />
        <Route path='user' element={<UserList></UserList>}></Route>
        <Route path='/user/create' element={<CreateUser></CreateUser>}></Route>
        <Route
          path='user/reset'
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path='user/:id' element={<EditUser></EditUser>}></Route>
        <Route path='garden/create' element={<CreateGarden />} />
        <Route path='garden/:id' element={<EditGarden />} />
        <Route path='garden' element={<GardenList />} />
        <Route path='tree/create' element={<CreateTree />} />
        <Route path='tree/:id' element={<TreeDetail />} />
        <Route path='tree' element={<TreeList />} />
      </Routes>
    </div>
  );
}

export default App;
