import { Card, Typography, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const TABLE_HEAD = ['Tên Cây', 'Giai đoạn', 'Vườn cây', 'Chỉnh sửa'];
type giaidoanType = {
  tenGiaiDoan: string;
  tuoi: string;
  phanBon: string;
  mota: string;
  benh: benh[];
  _id: string;
};
type benh = {
  tenbenh: string;
  cachChua: string;
  cachPhong: string;
};
type user = {
  email: string;
  userRole: string;
  phone: string;
  fullName: string;
  _id: string;
};
// type action = {};

type gardenArea = { area: String; gardenType: String };
type garden = {
  farmer: [user];
  // action: [action];
  gardenArea: [gardenArea];
  address: String;
  _id: String;
  gardenName: String;
  owner: user;
};

type treeType = {
  tenCay: string;
  giaiDoan: giaidoanType[];
  garden: garden[];
  _id: string;
};

export function TreeList() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const getAllGarden = async () => {
    const res = await fetch(`${baseUrl}/tree/all`, {
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
            {TABLE_ROWS.map(({ tenCay, giaiDoan, _id }: treeType, index) => {
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
                      {tenCay}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <ul>
                      {giaiDoan.map((tungGiaiDoan: giaidoanType) => {
                        return (
                          <ul key={tungGiaiDoan._id}>
                            <li>Tên giai đoạn: {tungGiaiDoan.tenGiaiDoan}</li>
                            <li>Tuổi cây: {tungGiaiDoan.tuoi}</li>
                            <li>Mô tả: {tungGiaiDoan.mota}</li>
                          </ul>
                        );
                      })}
                    </ul>
                  </td>
                  <td>Vườn cây</td>
                  <td>
                    <Button
                      variant='text'
                      className='font-normal'
                      onClick={() => {
                        navigate(`/tree/${_id}`, {
                          state: { _id, tenCay, giaiDoan },
                        });
                      }}
                    >
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Button
        className='flex ml-auto'
        onClick={() => {
          navigate('/tree/create');
        }}
      >
        Tạo Mới
      </Button>
    </div>
  );
}
