import { initializeDatabaseUser } from '@/lib/firebase';
import { HfAgent, LLMFromHub, defaultTools } from '@huggingface/agents';
import { HfInference } from '@huggingface/inference';
import { useEffect } from 'react';

export const Test = () => {
  const HF_TOKEN = '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';
  const hf = new HfInference('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');
  const agent = new HfAgent(HF_TOKEN, LLMFromHub(HF_TOKEN), [...defaultTools]);

  useEffect(() => {
    (async function () {
      const response = await hf.textGeneration({
        model: 'google/flan-t5-xxl',
        inputs: 'What is the capital of Australia nowadays (1 word)?',
      });

      console.log(response);
    })();

    initializeDatabaseUser();
  }, []);
  return <div className='flex flex-col items-center gap-10 w-[50vw]'></div>;
};
