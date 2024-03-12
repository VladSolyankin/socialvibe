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

const addImageFormSchema = z.object({
  title: z.string().min(1, { message: 'Название не должно быть пустым' }),
  image: z
    .instanceof(File)
    .refine(file => file.size < 1024 * 1024 * 8, {
      message: 'Размер файла не должен превышать 5Мб',
    })
    .refine(
      file =>
        ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'].includes(
          file.type
        ),
      { message: 'Файл должен быть с расширением .png/jpg/jpeg/svg' }
    ),
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
      image: new File([], ''),
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
          <Form {...addImageForm}>
            <Dialog onOpenChange={() => onAddDialogClose()}>
              <DialogTrigger>
                <Button
                  type='submit'
                  className='absolute top-5 right-5 flex gap-2'
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
                <div className='grid gap-4 py-4'>
                  <FormField
                    control={addImageForm.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem className='items-center gap-4'>
                        <Label htmlFor='title' className='text-right'>
                          Название
                        </Label>
                        <FormControl>
                          <Input
                            id='title'
                            placeholder='Название изображения...'
                            className='col-span-3'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}></FormField>
                  <div
                    className='h-64 border-4 border-dashed rounded-xl flex flex-col items-center justify-center'
                    {...getRootProps()}>
                    <FormField
                      control={addImageForm.control}
                      name='image'
                      render={({ field }) => {
                        <FormItem>
                          <FormControl>
                            <input
                              type='file'
                              id='files'
                              {...getInputProps()}
                            />
                            ;
                          </FormControl>
                        </FormItem>;
                      }}></FormField>
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
        </TabsContent>
        <TabsContent value='albums'></TabsContent>
      </Tabs>
    </div>
  );
};
