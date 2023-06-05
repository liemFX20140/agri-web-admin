import { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { useNavigate, Link } from 'react-router-dom';
import { VscAccount, VscHome } from 'react-icons/vsc';
import { BsTree } from 'react-icons/bs';
import { CgTrees } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logOut } from '../store/authSlice';
export default function NavbarAdmin() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.Auth.authenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal hover:text-blue-500'
      >
        <Link to='/' className='flex items-center'>
          <VscHome className='w-6 h-6 mr-2'></VscHome>
          Trang Chủ
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal  hover:text-blue-500'
      >
        <Link to='/garden' className='flex items-center'>
          <CgTrees className='w-6 h-6 mr-2'></CgTrees>
          Vườn cây
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link to='/user' className='flex items-center  hover:text-blue-500'>
          <VscAccount className='w-6 h-6 mr-2'></VscAccount>
          Người dùng
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal  hover:text-blue-500'
      >
        <Link to='/tree' className='flex items-center'>
          <BsTree className='w-6 h-6 mr-2'></BsTree>
          Cây trồng
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className='mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4'>
      <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
        <Typography
          as='a'
          href='#'
          className='mr-4 cursor-pointer py-1.5 font-medium'
        >
          Logo
        </Typography>
        <div className='hidden lg:block'>{navList}</div>
        {isAuth ? (
          <Button
            variant='gradient'
            size='sm'
            className='hidden lg:inline-block'
            onClick={() => {
              dispatch(logOut());
              navigate('/login');
            }}
            color='red'
          >
            <span>Đăng xuất</span>
          </Button>
        ) : (
          <Button
            variant='gradient'
            size='sm'
            className='hidden lg:inline-block'
            onClick={() => {
              navigate('/login');
            }}
          >
            <span>Đăng nhập</span>
          </Button>
        )}

        <IconButton
          variant='text'
          className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              className='h-6 w-6'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className='container mx-auto'>
          {navList}
          <Button
            variant='gradient'
            size='sm'
            fullWidth
            className='mb-2'
            onClick={() => {
              navigate('/login');
            }}
          >
            <span>Đăng nhập</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
