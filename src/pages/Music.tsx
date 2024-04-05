import {
  getAllArtists,
  getPlaylistTracks,
  getPlaylists,
  getPopularTracks,
} from '@/lib/spotify';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useRef, useState } from 'react';
import Emoji from 'react-emoji-render';
import 'react-h5-audio-player/lib/styles.css';
import { nanoid } from 'nanoid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  IoIosSkipBackward,
  IoMdPause,
  IoMdPlay,
  IoIosSkipForward,
  IoMdClose,
} from 'react-icons/io';

export const Music = () => {
  const [playlists, setPlaylists] = useState({});
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [popularTracks, setPopularTracks] = useState({});
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState({});
  const audioRef = useRef<HTMLAudioElement>(new Audio(''));

  useEffect(() => {
    fetchPlaylists();
    fetchPopularTracks();
  }, []);
  const fetchPlaylists = async () => {
    const playlists = await getPlaylists('playlists');
    setPlaylists(playlists);
  };

  const fetchPlaylistTracks = async (index: number) => {
    const playlistTracks = await getPlaylistTracks(
      playlists.items[index].tracks.href
    );
    await setPlaylistTracks(playlistTracks);
    console.log(playlistTracks);
  };

  const fetchPopularTracks = async () => {
    const tracks = await getPopularTracks();
    setPopularTracks(tracks);
  };

  const onPlaylistOpen = (playlist, index) => {
    fetchPlaylistTracks(index);
    setIsPlaylistOpen(true);
    setCurrentPlaylist(playlist);
  };

  const onTrackPlay = track => {
    setCurrentTrack(track);
    setIsPlayerVisible(true);
    setIsPlaylistOpen(false);
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNextTrack = () => {};
  const handlePrevTrack = () => {};
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOnClose = () => {
    setIsPlaylistOpen(false);
    setIsPlayerVisible(false);
    setIsPlaying(false);
    setCurrentTrackIndex(0);
  };

  return (
    <div className='min-w-[700px] min-h-screen mx-3 max-w-xl'>
      <div className='flex flex-col items-center justify-center gap-3 py-5'>
        <Emoji className='text-3xl'>🎧</Emoji>
        <Label>Музыка</Label>
      </div>
      <div className='flex flex-col'>
        <Tabs defaultValue='my-music'>
          <TabsList className='flex px-1 space-x-1'>
            <TabsTrigger value='my-music'>Моя музыка</TabsTrigger>
            <TabsTrigger value='search'>Поиск</TabsTrigger>
          </TabsList>
          <TabsContent
            value='my-music'
            className='h-full flex-1 mt-5 mx-2'></TabsContent>
          <TabsContent
            value='search'
            className='h-full flex flex-col flex-1 gap-5 mx-3 mt-5'>
            <Input placeholder='🔎 Найти музыку...' className='w-full' />
            <Label>Плейлисты</Label>
            <Carousel className='w-full'>
              <CarouselContent>
                {playlists.items ? (
                  playlists.items.map((playlist, index) => (
                    <CarouselItem
                      key={nanoid()}
                      className='flex flex-col text-center basis-1/3'
                      onClick={() => onPlaylistOpen(playlist, index)}>
                      <Card>
                        <CardContent className='flex items-center justify-center'>
                          <img
                            src={`${playlist.images[0].url}`}
                            alt=''
                            className='w-64 h-52 object-cover rounded-xl'
                          />
                        </CardContent>
                      </Card>
                      <div className='flex flex-col mt-2'>
                        <Label>
                          {playlist.name ? playlist.name : `Плейлист ${index}`}
                        </Label>
                        <span className='text-gray-400'>
                          {playlist.tracks.total > 100
                            ? '100+'
                            : playlist.tracks.total}{' '}
                          треков
                        </span>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <Skeleton className='w-full h-52 basis-1/3 bg-slate-800' />
                )}
              </CarouselContent>
            </Carousel>

            <Label>Популярные треки</Label>
            <Carousel className='w-full'>
              <CarouselContent>
                {popularTracks.tracks ? (
                  popularTracks.tracks.items.map((track, i) => (
                    <CarouselItem
                      key={nanoid()}
                      className='flex flex-col items-center gap-2'>
                      <Card className='w-full'>
                        {popularTracks.tracks.items
                          .slice(i, i + 3)
                          .map(track => {
                            return (
                              <CardContent
                                key={nanoid()}
                                className='flex gap-x-2 items-center text-center hover:bg-slate-800 hover:rounded-xl p-2'>
                                <div className='flex basis-1/6'>
                                  <img
                                    src={`${track.album.images[0].url}`}
                                    alt=''
                                    className='w-12 h-12 object-cover rounded-xl'
                                  />
                                </div>
                                <span className='break-words basis-3/6'>
                                  {track.name}
                                </span>
                                <span className='text-gray-400 basis-2/6'>
                                  {track.artists
                                    .map(artist => artist.name)
                                    .join(', ')}
                                </span>
                              </CardContent>
                            );
                          })}
                      </Card>
                    </CarouselItem>
                  ))
                ) : (
                  <Skeleton className='w-full h-[120px] bg-slate-800' />
                )}
              </CarouselContent>
            </Carousel>
          </TabsContent>
          <Dialog open={isPlaylistOpen} onOpenChange={setIsPlaylistOpen}>
            <DialogContent className=' min-w-[50vw] h-[calc(100vh-64px)] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>
                  {currentPlaylist.name ? currentPlaylist.name : `Плейлист 🔥`}
                </DialogTitle>
                <DialogDescription>
                  Треки текущего плейлиста:{' '}
                </DialogDescription>
              </DialogHeader>

              <Card className='w-full'>
                {playlistTracks.length > 0 &&
                  playlistTracks.map(track => {
                    return (
                      <CardContent
                        key={nanoid()}
                        className='flex gap-x-2 items-center text-center hover:bg-slate-800 hover:rounded-xl p-2'
                        onClick={() => onTrackPlay(track.track)}>
                        <div className='flex basis-1/6'>
                          <img
                            src={`${track.track.album.images[0].url}`}
                            alt=''
                            className='w-12 h-12 object-cover rounded-xl'
                          />
                        </div>
                        <span className='break-words basis-3/6'>
                          {track.track.name}
                        </span>
                        <span className='text-gray-400 basis-2/6'>
                          {track.track.artists
                            .map(artist => artist.name)
                            .join(', ')}
                        </span>
                      </CardContent>
                    );
                  })}
              </Card>
            </DialogContent>
          </Dialog>
          {isPlayerVisible ? (
            <div className='fixed flex justify-evenly items-center text-center inset-x-0 bottom-0 h-20 w-full bg-black rounded-b-lg shadow-md overflow-hidden z-50'>
              <audio
                ref={audioRef}
                src={`${playlistTracks[currentTrackIndex]?.track.preview_url}`}
                onEnded={() => handleNextTrack()}></audio>
              <img
                src={`${playlistTracks[currentTrackIndex]?.track.album.images[0].url}`}
                alt=''
                className='w-16 h-16 object-cover rounded-xl'
              />
              <div className='flex flex-col justify-center h-full p-4 space-y-2'>
                <span className='break-words'>
                  {playlistTracks[currentTrackIndex]?.track.name}
                </span>
                <span className='text-gray-500'>
                  {playlistTracks[currentTrackIndex]?.track.artists
                    .map(artist => artist.name)
                    .join(', ')}
                </span>
              </div>
              {/* audio элемент с текущим треком */}
              <audio
                ref={audioRef}
                src={`${currentTrack?.preview_url || ''}`}></audio>
              <div className='flex justify-center space-x-4'>
                <button
                  onClick={() => handlePrevTrack()}
                  className='p-2 bg-slate-900 rounded-full border-2 border-blue-300'>
                  <IoIosSkipBackward className='text-white' />
                </button>
                <button
                  onClick={() => handlePlayPause()}
                  className='p-2 bg-blue-500 rounded-full'>
                  {isPlaying ? (
                    <IoMdPause className='text-white' />
                  ) : (
                    <IoMdPlay className='text-white' />
                  )}
                </button>
                <button
                  onClick={() => handleNextTrack()}
                  className='p-2 rounded-full border-2 border-blue-300'>
                  <IoIosSkipForward className='text-white' />
                </button>

                {/* Кнопка закрытия плеера */}
                <button
                  onClick={() => handleOnClose()}
                  className='p-2 rounded-full border-2 border-blue-300 hover:bg-red-600'>
                  <IoMdClose className='text-white' />
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Tabs>
      </div>
    </div>
  );
};
