import { FormEvent, useState } from 'react';
import {
  Card,
  Button,
  Input,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

type benh = {
  tenbenh: string;
  cachChua: string;
  cachPhong: string;
};
export type giaidoanType = {
  tenGiaiDoan: string;
  tuoi: string;
  phanBon: string;
  mota: string;
  benh: benh[];
};

export function CreateTree() {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [tenCay, setTenCay] = useState('');
  const [mota, setMota] = useState('');
  const [tuoi, setTuoi] = useState('');
  const [phanBon, setPhanBon] = useState('');
  const [tenbenh, setTenBenh] = useState('');
  const [cachPhong, setCachPhong] = useState('');
  const [cachChua, setCachChua] = useState('');
  const [GiaiDoan, setGiaiDoan] = useState<giaidoanType[]>([]);
  const [tenGiaiDoan, setTenGiaiDoan] = useState('');
  const [benh, setBenh] = useState<benh[]>([]);
  const [isAlert, setIsAlert] = useState(false);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (GiaiDoan.length === 0) {
      setIsAlert(true);
      return;
    }
    await fetch(`${baseurl}/tree/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenCay, GiaiDoan }),
    });
    navigate('/tree');
  };

  return (
    <Card
      color='transparent'
      shadow={false}
      className='py-12 mx-auto container'
    >
      <Typography variant='h4' color='blue-gray' className='capitalize'>
        Thêm cây trồng mới
      </Typography>

      <form
        className='mt-8 mb-2 w-96 max-w-screen-lg sm:w-full mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            label='Tên cây trồng'
            value={tenCay}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTenCay(event.target.value);
            }}
          />

          <Typography className='text-left text-lg' size='medium'>
            Các giai đoạn cây trồng
          </Typography>
          <div className=''>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4'>
                <Input
                  type='text'
                  label='Tên giai đoạn'
                  value={tenGiaiDoan}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTenGiaiDoan(event.target.value);
                  }}
                ></Input>
                <Input
                  type='text'
                  label='Tuổi'
                  value={tuoi}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTuoi(event.target.value);
                  }}
                ></Input>
              </div>
              <Input
                type='text'
                label='Phân bón'
                value={phanBon}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPhanBon(event.target.value);
                }}
              ></Input>
              <Textarea
                label='Mô tả'
                className='overflow-auto'
                value={mota}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setMota(event.target.value);
                }}
              />
              <div className='w-11/12 ml-auto'>
                <Typography className='text-left text-lg mr-4' size='medium'>
                  Các bệnh hay gặp
                </Typography>
                <div className='flex flex-col gap-4'>
                  <Input
                    type='text'
                    label='Tên bệnh'
                    value={tenbenh}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setTenBenh(event.target.value);
                    }}
                  ></Input>
                  <Textarea
                    size='md'
                    label='Cách phòng'
                    value={cachPhong}
                    onChange={(
                      event: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
                      setCachPhong(event.target.value);
                    }}
                  ></Textarea>
                  <Textarea
                    size='md'
                    label='Cách chữa'
                    value={cachChua}
                    onChange={(
                      event: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
                      setCachChua(event.target.value);
                    }}
                  ></Textarea>
                </div>
                <Button
                  className='my-4 flex ml-auto'
                  onClick={() => {
                    setBenh((prev: benh[]) => {
                      return [{ tenbenh, cachChua, cachPhong }, ...prev];
                    });
                    setTenBenh('');
                    setCachChua('');
                    setCachPhong('');
                  }}
                >
                  Thêm bệnh
                </Button>
                <ul>
                  {benh.map((benh, index) => {
                    return (
                      <Button
                        color='red'
                        onClick={() => {
                          setBenh((prev: benh[]) => {
                            return prev.splice(index, 1);
                          });
                        }}
                        key={index}
                      >
                        Bệnh: {benh.tenbenh}
                      </Button>
                    );
                  })}
                </ul>
                <Button
                  type='button'
                  className='flex my-4 ml-auto'
                  onClick={() => {
                    setGiaiDoan((prev: giaidoanType[]) => {
                      return [
                        { tenGiaiDoan, mota, phanBon, tuoi, benh },
                        ...prev,
                      ];
                    });
                    setBenh([]);
                    setTenGiaiDoan('');
                    setMota('');
                    setPhanBon('');
                    setTuoi('');
                  }}
                >
                  Thêm giai đoạn
                </Button>
                <ul>
                  {GiaiDoan.map((giaiDoan, index) => {
                    return (
                      <Button
                        color='red'
                        onClick={() => {
                          setGiaiDoan((prev: giaidoanType[]) => {
                            return prev.splice(index, 1);
                          });
                        }}
                        key={index}
                      >
                        Giai Đoạn: {giaiDoan.tenGiaiDoan}
                      </Button>
                    );
                  })}
                </ul>
              </div>
            </div>
            <ul className='flex'></ul>
          </div>
          <div className=''></div>
        </div>

        <Button className='mt-6' fullWidth type='submit'>
          Tạo mới
        </Button>
      </form>
      {isAlert && (
        <div className='font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100'>
          Vui lòng thêm giai đoạn phát triển cây trước khi tạo mới
        </div>
      )}
    </Card>
  );
}
