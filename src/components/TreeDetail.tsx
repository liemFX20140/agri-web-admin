import { Card, Typography } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';

type benh = {
  tenbenh: string;
  cachChua: string;
  cachPhong: string;
};
type giaidoanType = {
  tenGiaiDoan: string;
  tuoi: string;
  phanBon: string;
  mota: string;
  benh: benh[];
};
// type tree = {
//   tenCay: string;
//   giaidoan: giaidoanType;
// };
export function TreeDetail() {
  const TABLE_HEAD = ['Tên bệnh', 'Cách phòng', 'Cách chữa'];
  // const baseurl = import.meta.env.VITE_BASE_URL;
  // const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  return (
    <Card
      color='transparent'
      shadow={false}
      className='py-12 mx-auto container'
    >
      <Typography className='text-3xl my-4'> Cây {state.tenCay}</Typography>
      {state.giaiDoan.map((tungGiaiDoan: giaidoanType) => {
        const TABLE_ROWS = tungGiaiDoan.benh;
        return (
          <div className='flex flex-col' key={tungGiaiDoan.tenGiaiDoan}>
            <Typography className='text-2xl border-t-2'>
              {tungGiaiDoan.tenGiaiDoan}
            </Typography>
            <Typography className='text-lg mr-auto'>
              Mô tả: {tungGiaiDoan.mota}
            </Typography>
            <Typography className='text-lg mr-auto mb-4'>
              Các bệnh thường gặp
            </Typography>

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
                  ({ tenbenh, cachPhong, cachChua }: benh, index) => {
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
                            {tenbenh}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {cachPhong}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {cachChua}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </Card>
  );
}
