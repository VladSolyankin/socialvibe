import React, { useEffect, useState } from 'react';
import { HfInference } from '@huggingface/inference';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
export const Profile = () => {
  const hf = new HfInference('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');
  const [image, setImage] = useState('');
  const [prompt, setPrompt] = useState('');

  const onPromptChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value as string);
  };

  const onGenerateImage = async () => {
    const res = await hf.textToImage({
      inputs: `${prompt}`,
      model: 'stabilityai/stable-diffusion-2',
      parameters: {
        height: 640,
        width: 960,
      },
    });
    setImage(URL.createObjectURL(res));
  };

  return (
    <div className='flex flex-col items-center gap-10 w-[50vw]'>
      <img src={image} alt='' />
      <Input type='text' onChange={e => onPromptChange(e)} />
      <Button onClick={() => onGenerateImage()}>Сгенерировать</Button>
    </div>
  );
};
