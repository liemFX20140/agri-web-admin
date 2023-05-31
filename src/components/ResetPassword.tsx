import { type FormEvent, useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const [status, setStatus] = useState<Number>();
  const baseurl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(`${baseurl}/user/reset`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });
    if (res.status !== 200) {
      setStatus(res.status);
    }

    navigate('/login');
  };

  return (
    <Card
      color='transparent'
      shadow={false}
      className='py-12 mx-auto container'
    >
      <Typography variant='h4' color='blue-gray'>
        Đặt lại mật khẩu
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
        </div>

        <Button className='mt-6' fullWidth type='submit'>
          Đặt lại
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          Bạn chưa có tài khoản? Liên hệ: 0986219238.
        </Typography>
      </form>
      {status === 405 && (
        <div className='font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100'>
          Chỉ admin có quyền sử dụng
        </div>
      )}
      {status === 402 && (
        <div className='font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100'>
          Sai mật khẩu
        </div>
      )}
    </Card>
  );
};

export default ResetPassword;
