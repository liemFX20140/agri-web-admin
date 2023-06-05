import { FormEvent, useEffect, useState } from 'react';
import {
  Card,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { useLocation, useNavigate } from 'react-router-dom';

type user = {
  email: string;
  userRole: string;
  phone: string;
  fullName: string;
  _id: string;
};
// type action = {};

type gardenArea = { area: String; gardenType: String };

export function EditGarden() {
  const baseurl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const gardenState = location.state;
  const [gardenName, setGardenName] = useState(gardenState.gardenName);
  const [area, setArea] = useState('');
  const [gardenType, setGardenType] = useState('');
  const [gardenAddress, setGardenAddress] = useState(gardenState.address);
  const [gardenArea, setGardenArea] = useState<gardenArea[]>(
    gardenState.gardenArea
  );
  const [owner, setOwner] = useState<string>();
  const [options, setOptions] = useState<user[]>([]);
  const [isAlert, setIsAlert] = useState(false);
  const [farmers, setFarmers] = useState<user[]>(gardenState.farmer);
  const [selectedFarmers, setSelectedFarmer] = useState<user[]>(
    gardenState.farmer
  );

  const [farmer, setFarmer] = useState<user>();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (gardenArea.length === 0) {
      setIsAlert(true);
      return;
    }
    const mappedFarmer = selectedFarmers.map((fammer) => fammer._id);
    await fetch(`${baseurl}/garden/edit/${gardenState._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gardenName,
        gardenArea,
        gardenAddress,
        owner,
        mappedFarmer,
      }),
    });
    navigate('/garden');
  };
  const getUsers = async () => {
    const res = await fetch(`${baseurl}/user/all`, {
      credentials: 'include',
    });
    let data = await res.json();
    data = data.sort((user1: user, user2: user) => {
      if (user1.fullName > user2.fullName) return 1;
      if (user2.fullName > user1.fullName) return -1;
      return 0;
    });
    setOptions(data);
  };
  const getFarmer = async () => {
    const res = await fetch(`${baseurl}/user/farmer`, {
      credentials: 'include',
    });
    let data = await res.json();
    data = data.sort((user1: user, user2: user) => {
      if (user1.fullName > user2.fullName) return 1;
      if (user2.fullName > user1.fullName) return -1;
      return 0;
    });
    setFarmers(data);
  };

  useEffect(() => {
    getUsers();
    getFarmer();
  }, []);
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

          <Select
            variant='outlined'
            label='Chủ vườn'
            onChange={(value) => {
              setOwner(value);
            }}
          >
            {options?.map((user, index) => {
              return (
                <Option
                  key={index}
                  value={`${user._id}`}
                >{`${user.fullName}`}</Option>
              );
            })}
          </Select>
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
                      className='mx-4'
                      onClick={() => {
                        setGardenArea((prev: gardenArea[]) => {
                          const newData = JSON.parse(
                            JSON.stringify(prev.splice(index, 1))
                          );
                          return newData;
                        });
                      }}
                    >{`${g.gardenType} : ${g.area} m2`}</Button>
                  </li>
                );
              })}
            </ul>
          </div>

          <Typography className='text-left text-lg' size='medium'>
            Nông dân tại vườn
          </Typography>
          <div className=''>
            <div className='flex gap-4'>
              <Select
                variant='outlined'
                label='Nông dân'
                onChange={(value) => {
                  if (!value) return;
                  const farmmerObj = options.find((user) => {
                    user._id === value;
                  });
                  if (!farmmerObj) return;
                  setFarmer(farmmerObj);
                }}
              >
                {farmers.map((farmer, index) => {
                  return (
                    <Option value={farmer._id} key={index}>
                      {farmer.fullName} : {farmer.phone}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <Button
              className='my-4 flex ml-auto'
              onClick={() => {
                if (!farmer) return;
                setSelectedFarmer((prev: user[]) => {
                  return [farmer, ...prev];
                });
              }}
            >
              Thêm
            </Button>
          </div>
          <ul className='flex'>
            {selectedFarmers.map((farmer, index) => {
              return (
                <li key={index}>
                  <Button
                    color='red'
                    className='mx-2'
                    onClick={() => {
                      setSelectedFarmer((prev: user[]) => {
                        return prev.splice(index, 1);
                      });
                    }}
                  >{`${farmer.fullName} : ${farmer.phone}`}</Button>
                </li>
              );
            })}
          </ul>
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
          Cập nhật
        </Button>
      </form>
      {isAlert && (
        <div className='font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100'>
          Vui lòng thêm khu vực vườn trước khi tạo mới
        </div>
      )}
    </Card>
  );
}
