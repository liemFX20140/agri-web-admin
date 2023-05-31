import { Card, Typography, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TABLE_HEAD = [
  'Email',
  'Phân quyền',
  'Họ và tên',
  'Số điện thoại',
  'Edit',
];

export function UserList() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const getAllUser = async () => {
    const res = await fetch(`${baseUrl}/user/all`, {
      credentials: 'include',
    });
    const data = await res.json();
    setTABLE_ROWS(data);
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className='container relative'>
      <Card className='overflow-visible h-full w-full my-8'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ _id, email, userRole, phone, fullName }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {userRole}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {fullName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant='small' className='font-medium'>
                        {phone}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        as='a'
                        href='#'
                        variant='small'
                        color='blue'
                        className='font-medium'
                      >
                        Edit
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      <Button
        className='flex ml-auto'
        onClick={() => {
          navigate('/user/create');
        }}
      >
        Tạo Mới
      </Button>
    </div>
  );
}
