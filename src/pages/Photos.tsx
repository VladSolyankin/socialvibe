import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserImages } from '@/lib/firebase';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useDropzone } from 'react-dropzone';
import { BiLandscape, BiSolidSave } from 'react-icons/bi';

export const Photos = () => {
  const [userImages, setUserImages] = useState<Array<IUserPhotos>>([]);
  const [userAlbums, setUserAlbums] = useState<Array<IUserAlbum>>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    const fetchUserImages = async () => {
      const userImages = await getUserImages();
      setUserImages(() => userImages);
    };

    fetchUserImages();
  }, []);

  const onAddButtonClick = () => setIsDialogOpen(true);

  const onDrop = useCallback(files => {
    console.log('работает');
    setIsFileSelected(true);
    console.log(files[0].path);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='relative'>
      <Tabs defaultValue='photos' className='p-5'>
        <TabsList>
          <TabsTrigger value='photos'>Изображения</TabsTrigger>
          <TabsTrigger value='albums'>Альбомы</TabsTrigger>
        </TabsList>
        <TabsContent value='photos'>
          <Card>
            <CardHeader>
              <CardTitle>Ваши изображения</CardTitle>
              <CardDescription>
                Здесь можно просматривать и делиться фотографиями
              </CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-3 place-content-center gap-6'>
              {userImages.map(photo => (
                <div key={nanoid()} className='flex flex-col items-center'>
                  <img
                    className='w-52 h-52 rounded-xl'
                    src={photo.url}
                    alt='User photo'
                  />
                  <span>{photo.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='albums'></TabsContent>
      </Tabs>
      <Dialog>
        <DialogTrigger>
          <Button
            className='absolute top-5 right-5 flex gap-2'
            onClick={() => {}}>
            <CiCirclePlus className='w-6 h-6' />
            <span>Добавить</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>🖼️ Добавить изображение</DialogTitle>
            <DialogDescription>
              Дайте название и выберите файл (или перетащите его в выделенную
              область):
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='items-center gap-4'>
              <Label htmlFor='title' className='text-right'>
                Название
              </Label>
              <Input
                id='title'
                placeholder='Название изображения...'
                className='col-span-3'
              />
            </div>
            <div
              className='h-64 border-4 border-dashed rounded-xl flex flex-col items-center justify-center'
              {...getRootProps()}>
              <input type='file' id='files' {...getInputProps()} />

              <div
                className={`${isFileSelected ? 'hidden' : 'block'} flex flex-col items-center`}>
                <BiLandscape className='w-12 h-12' />
                Выберите или перетащите изображение
              </div>
              <img
                src={selectedFile}
                className={`${isFileSelected ? 'block' : 'hidden'} h-64 w-64`}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' className='flex gap-2 items-center'>
              <BiSolidSave />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
