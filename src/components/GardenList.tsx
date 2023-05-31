import { Card, Typography, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const TABLE_HEAD = ['Tên vườn', 'Khu vực', 'Địa chỉ', 'Nông dân', 'Edit'];

type user = {
  email: string;
  userRole: string;
  phone: string;
  fullName: string;
  id: string;
};
type action = {};

type gardenArea = { area: String; gardenType: String };
type garden = {
  users?: [user];
  action: [action];
  gardenArea: [gardenArea];
  address: String;
  _id: String;
  gardenName: String;
};

export function GardenList() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [TABLE_ROWS, setTABLE_ROWS] = useState<garden[]>([]);
  const getAllGarden = async () => {
    const res = await fetch(`${baseUrl}/garden/all`, {
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
    setTABLE_ROWS(data);
  };
  useEffect(() => {
    getAllGarden();
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
              ({ gardenName, address, gardenArea, users }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {gardenName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <div>
                        {gardenArea.map((garden: gardenArea, index) => {
                          return (
                            <p
                              key={index}
                            >{`${garden.gardenType} : ${garden.area} m2`}</p>
                          );
                        })}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {address}
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
                        {!users
                          ? ''
                          : users.map((user: user) => {
                              user.fullName;
                            })}
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
          navigate('/garden/create');
        }}
      >
        Tạo Mới
      </Button>
    </div>
  );
}
