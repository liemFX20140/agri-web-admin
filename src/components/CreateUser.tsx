import { FormEvent, useState } from 'react';
import {
  Card,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';

export function CreateUser() {
  const [userRole, setUserRole] = useState('');
  const baseurl = import.meta.env.VITE_BASE_URL;

  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
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

        <Button className='mt-6' fullWidth type='submit'>
          Tạo mới
        </Button>
      </form>
      {status === 200 && (
        <div className='font-regular relative block w-full rounded-lg bg-green-500 p-4 text-base leading-5 text-white opacity-100'>
          Email thông tin đăng nhập đã được gửi tới bạn
        </div>
      )}
    </Card>
  );
}
