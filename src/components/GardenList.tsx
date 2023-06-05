import { Card, Typography, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { gardenArea, treeType } from './CreateGarden';

const TABLE_HEAD = [
  'Tên vườn',
  'Chủ vườn',
  'Khu vực',
  'Địa chỉ',
  'Nông dân',
  'Chỉnh sửa',
];

type user = {
  email: string;
  userRole: string;
  phone: string;
  fullName: string;
  _id: string;
};
type action = {};

export type garden = {
  farmer: [user];
  action: [action];
  gardenArea: [gardenArea];
  address: String;
  _id: String;
  gardenName: String;
  owner: user;
};
// type populatedGardenArea = {
//   trees: treeType[];
//   gardenType: String;
//   area: String;
// };

export function GardenList() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [TABLE_ROWS, setTABLE_ROWS] = useState<garden[]>([]);
  const getAllGarden = async () => {
    const res = await fetch(`${baseUrl}/garden/all`, {
      credentials: 'include',
    });
    const data = await res.json();
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
              (
                { gardenName, address, gardenArea, farmer, _id, owner },
                index
              ) => {
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
                    <td className={classes}>
                      <Button
                        variant='text'
                        color='blue-gray'
                        className='font-normal'
                        onClick={() => {
                          navigate(`/user/${owner?._id}`, { state: owner });
                        }}
                      >
                        {owner?.fullName}
                      </Button>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <div>
                        {gardenArea.map((garden: any, index) => {
                          return (
                            <div key={index}>
                              <p>
                                {`${garden.gardenType} _ ${garden.area} m2 `}
                              </p>
                              <span>
                                Cây trồng:{' '}
                                {garden.trees.map((tree: treeType) => {
                                  return (
                                    <Button
                                      key={tree._id}
                                      variant='text'
                                      className='font-normal text-lg mx-2'
                                      onClick={() => {
                                        navigate(`/tree/${tree._id}`, {
                                          state: tree,
                                        });
                                      }}
                                    >
                                      {tree.tenCay}
                                    </Button>
                                  );
                                })}
                              </span>
                            </div>
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
                      {!farmer
                        ? ''
                        : farmer.map((user: user) => {
                            return (
                              <Button
                                key={user._id}
                                color='blue'
                                variant='outlined'
                                size='sm'
                                className='font-medium mx-1'
                                onClick={() => {
                                  navigate(`/user/${user._id}`, {
                                    state: user,
                                  });
                                }}
                              >
                                {user.fullName} : {user.phone}
                              </Button>
                            );
                          })}
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Button
                        variant='text'
                        className='font-normal'
                        onClick={() => {
                          const gardenState = {
                            gardenName,
                            address,
                            gardenArea,
                            farmer,
                            owner,
                            _id,
                          };
                          navigate(`/garden/${_id}`, { state: gardenState });
                        }}
                      >
                        Chỉnh sửa
                      </Button>
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
