import { FormEvent, useState } from 'react';
import {
  Card,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

// type user = {
//   email: string;
//   userRole: string;
//   phone: string;
//   fullName: string;
//   id: string;
// };
// type action = {};

type gardenArea = { area: String; gardenType: String };

export function CreateGarden() {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [gardenName, setGardenName] = useState('');
  const [area, setArea] = useState('');
  const [gardenType, setGardenType] = useState('');
  const [gardenAddress, setGardenAddress] = useState('');
  const [gardenArea, setGardenArea] = useState<gardenArea[]>([]);

  // const [status, setStatus] = useState<Number>();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await fetch(`${baseurl}/garden/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gardenName, gardenArea, gardenAddress }),
    });
    navigate('/garden');
  };

  return (
    <Card
      color='transparent'
      shadow={false}
      className='py-12 mx-auto container'
    >
      <Typography variant='h4' color='blue-gray' className='capitalize'>
        Thêm khu vườn mới
      </Typography>

      <form
        className='mt-8 mb-2 w-96 max-w-screen-lg sm:w-full mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            label='Tên khu vườn'
            value={gardenName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setGardenName(event.target.value);
            }}
          />
          <Typography className='text-left text-lg' size='medium'>
            Các khu vực trong vườn
          </Typography>
          <div className=''>
            <div className='flex gap-4'>
              <Select
                variant='outlined'
                label='Khu vực'
                onChange={(value) => {
                  if (!value) return;
                  setGardenType(value);
                }}
              >
                <Option value='veges'>Rau củ</Option>
                <Option value='flower'>Hoa</Option>
                <Option value='forest'>Rừng</Option>
                <Option value='fruit'>Cây an quả</Option>
              </Select>
              <Input
                size='lg'
                label='Diện tích (m2)'
                value={area}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setArea(event.target.value);
                }}
              />
            </div>
            <Button
              className='my-4 flex ml-auto'
              onClick={() => {
                if (gardenType === '') return;
                setGardenArea((prev: gardenArea[]) => {
                  const gArea: gardenArea = { gardenType, area };
                  return [gArea, ...prev];
                });
                setGardenType('');
                setArea('');
              }}
            >
              Thêm
            </Button>
            <ul className='flex'>
              {gardenArea.map((g, index) => {
                return (
                  <li key={index}>
                    <Button
                      color='red'
                      onClick={() => {
                        setGardenArea((prev: gardenArea[]) => {
                          const newData = JSON.parse(
                            JSON.stringify(prev.splice(index, 1))
                          );
                          return newData;
                        });
                        console.log(gardenArea);
                      }}
                    >{`${g.gardenType} : ${g.area} m2`}</Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Input
          size='lg'
          label='Địa chỉ'
          value={gardenAddress}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setGardenAddress(event.target.value);
          }}
        />
        <Button className='mt-6' fullWidth type='submit'>
          Tạo mới
        </Button>
      </form>
    </Card>
  );
}
