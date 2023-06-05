import { FormEvent, useState } from 'react';
import {
  Card,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { useLocation, useNavigate } from 'react-router-dom';

export function EditUser() {
  const location = useLocation();
  const user = location.state;
  const baseurl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  console.log('user state', user);
  const [userRole, setUserRole] = useState(user.userRole);
  const [phone, setPhone] = useState(user.phone);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [status, setStatus] = useState<Number>();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (userRole === '') {
      alert('Vui lòng chọn phân quyền người dùng');
      return;
    }
    if (email === '') {
      alert('Vui lòng điền email người dùng');
      return;
    }
    const res = await fetch(`${baseurl}/user/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        userRole,
        phone,
        fullName,
      }),
      credentials: 'include',
    });
    // const data = await res.json();
    if (res.status === 200) setStatus(200);
  };
  return (
    <Card
      color='transparent'
      shadow={false}
      className='py-12 mx-auto container'
    >
      <Typography variant='h4' color='blue-gray'>
        Tạo người dùng mới
      </Typography>

      <form
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            label='Email'
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            size='lg'
            label='Số điện thoại'
            value={phone}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPhone(event.target.value);
            }}
          />
          <Input
            size='lg'
            label='Họ và tên'
            value={fullName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFullName(event.target.value);
            }}
          />
          <Select
            variant='outlined'
            label='Phân quyền'
            value={userRole}
            onChange={(value) => {
              if (!value) return;
              setUserRole(value);
            }}
          >
            <Option value='admin'>Admin</Option>
            <Option value='staff'>Chuyên gia</Option>
            <Option value='farmer'>Nông dân</Option>
          </Select>
        </div>
        <div>
          <Button className='mt-6' type='submit'>
            Cập nhật
          </Button>
          <Button
            className='mt-6 mx-4'
            color='red'
            onClick={async () => {
              await fetch(`${baseurl}/user/${user._id}`, {
                method: 'DELETE',
                credentials: 'include',
              });
              navigate(-1);
            }}
            type='button'
          >
            Xóa
          </Button>
        </div>
      </form>
      {status === 200 && (
        <div className='font-regular relative block w-full rounded-lg bg-green-500 p-4 text-base leading-5 text-white opacity-100'>
          Email thông tin đăng nhập đã được gửi tới bạn
        </div>
      )}
    </Card>
  );
}
