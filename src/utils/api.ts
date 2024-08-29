import { FormType } from '@/components/email-form';

export type Dog = {
  name?: string;
  image_link: string;
  minHeight?: string;
  maxHeight?: string;
  minWeight?: string;
  maxWeight?: string;
  minLifeExpectancy?: string;
  max_life_expectancy?: string;
  shedding?: string;
  barking?: string;
  energy?: string;
  protectiveness?: string;
  trainability?: string;
  good_with_children?: string;
};

export const getDogs = async () => {
  const apiKey = process.env.API_KEY;

  const response = await fetch(`https://api.api-ninjas.com/v1/dogs?min_height=1`, {
    headers: {
      'X-Api-Key': apiKey as string,
    },
  });

  return response.json();
};

export const parseResponse = (data: Dog[]) => {
  if (data.length === 0) {
    return null;
  }

  const [spaPackage] = data.splice(0, 1);
  const collars = data.splice(0, 3);
  const carryOns = data.splice(0, 3);

  const trendingDescription = `Protectiveness is ${spaPackage.protectiveness} 
    and they are ${Number(spaPackage.good_with_children) > 2 ? 'good' : 'bad'} with children. 
    Barking level is ${spaPackage.barking} and energy is ${spaPackage.energy}.
    However they are ${Number(spaPackage.trainability) > 2 ? 'good' : 'bad'} to train.
  `;

  return { spaPackage, trendingDescription, collars, carryOns };
};

export const sendEmail = async (data: FormType) => {
  const seviceId = process.env.SERVICE_ID;
  const templateId = process.env.TEMPLATE_ID;
  const userId = process.env.USER_ID;

  const dataToSend = {
    service_id: seviceId,
    template_id: templateId,
    user_id: userId,
    template_params: {
      email: data.email,
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    return response;
  } catch (error) {
    console.log(error);
  }

  return null;
};
