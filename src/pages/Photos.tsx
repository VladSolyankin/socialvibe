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
import { FileWithPath, useDropzone } from 'react-dropzone';
import { BiLandscape, BiSolidSave } from 'react-icons/bi';
import { z } from 'zod';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FcGenericSortingAsc } from 'react-icons/fc';

const addImageFormSchema = z.object({
  title: z.string().min(1, { message: 'Название не должно быть пустым' }),
});

export const Photos = () => {
  const [userImages, setUserImages] = useState<Array<IUserPhotos>>([]);
  const [userAlbums, setUserAlbums] = useState<Array<IUserAlbum>>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFileURL, setSelectedFileURL] = useState('');

  useEffect(() => {
    const fetchUserImages = async () => {
      const userImages = await getUserImages();
      setUserImages(() => userImages);
    };

    fetchUserImages();
  }, []);

  const addImageForm = useForm<z.infer<typeof addImageFormSchema>>({
    resolver: zodResolver(addImageFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const onDrop = useCallback((files: FileWithPath[]) => {
    setIsFileSelected(true);
    setSelectedFileURL(URL.createObjectURL(files[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
    },
  });

  const onAddDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const onAddDialogClose = () => {
    if (!isDialogOpen) {
      setIsFileSelected(false);
      setSelectedFileURL('');
    }
  };

  return (
    <div>
      <Tabs defaultValue='photos' className='p-5'>
        <div className='w-full flex justify-between'>
          <TabsList>
            <TabsTrigger value='photos'>🖼️ Изображения </TabsTrigger>
            <TabsTrigger value='albums'>Альбомы</TabsTrigger>
          </TabsList>
          <div className='flex gap-3'>
            <Form {...addImageForm}>
              <Dialog onOpenChange={() => onAddDialogClose()}>
                <DialogTrigger>
                  <Button
                    type='submit'
                    className='flex gap-2'
                    onClick={() => {
                      onAddDialogOpen;
                    }}>
                    <CiCirclePlus className='w-6 h-6' />
                    <span>Добавить</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>🖼️ Добавить изображение</DialogTitle>
                    <DialogDescription>
                      Дайте название и выберите файл (или перетащите его в
                      выделенную область):
                    </DialogDescription>
                  </DialogHeader>
                  <div className='flex flex-col gap-4 py-4'>
                    <Input
                      id='title'
                      placeholder='Название изображения...'
                      className='col-span-3'
                    />
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
                        src={selectedFileURL}
                        className={`${isFileSelected ? 'block' : 'hidden'} w-full h-full object-fill rounded-xl p-1`}
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
            </Form>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  type='submit'
                  variant='secondary'
                  className='flex gap-2'
                  onClick={() => {}}>
                  <FcGenericSortingAsc className='w-6 h-6' />
                  <span>Сортировать</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>По дате создания</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='hover:bg-gray-300'>
                  Раньше
                </DropdownMenuItem>
                <DropdownMenuItem className='hover:bg-gray-300'>
                  Позже
                </DropdownMenuItem>
                <DropdownMenuLabel>По названию</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='hover:bg-gray-300'>
                  С начала алфавита
                </DropdownMenuItem>
                <DropdownMenuItem className='hover:bg-gray-300'>
                  С конца алфавита
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
        <TabsContent value='albums'>
          <Card>
            <CardHeader className='mb-5'>
              <CardTitle>Ваши альбомы</CardTitle>
              <CardDescription>
                Создавайте уникальные коллекции изображений и просматривайте их
                разом
              </CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-3 place-content-center gap-x-12 gap-y-16'>
              {userImages.map(photo => (
                <div
                  key={nanoid()}
                  className='relative flex flex-col items-center'>
                  <img
                    className='w-52 h-52 rounded-xl z-30'
                    src={photo.url}
                    alt='User photo'
                  />
                  <span className='z-10'>{photo.title}</span>
                  <div className='absolute z-20 -translate-x-[-35px] -translate-y-[10px] bg-blue-400 top-0 left-0 w-52 h-52 rounded-xl'></div>
                  <div className='absolute z-10 -translate-x-[-45px] -translate-y-[20px] bg-blue-500 top-0 left-0 w-52 h-52 rounded-xl'></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
