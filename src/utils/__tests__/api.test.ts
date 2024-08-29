import { Dog, getDogs, parseResponse, sendEmail } from '@/utils/api';

const SUCCESS_RESPONSE_MOCK: Dog[] = [
  {
    name: 'Affenpinscher',
    image_link: 'link',
    energy: '0',
    barking: '1',
    protectiveness: '3',
    max_life_expectancy: '12',
    good_with_children: '3',
    trainability: '2',
  },
  {
    name: 'Afghan Hound',
    image_link: 'link',
    energy: '4',
    barking: '3',
    protectiveness: '3',
    max_life_expectancy: '18',
  },
  {
    name: 'Airedale Terrier',
    image_link: 'link',
    energy: '3',
    barking: '3',
    protectiveness: '5',
    max_life_expectancy: '14',
  },
  {
    name: 'Akita',
    image_link: 'link',
    energy: '4',
    barking: '2',
    protectiveness: '5',
    max_life_expectancy: '14',
  },
  {
    name: 'Klee Kai',
    image_link: 'link',
    energy: '4',
    barking: '0',
    protectiveness: '0',
    max_life_expectancy: '16',
  },
  {
    name: 'Alaskan Malamute',
    image_link: 'link',
    energy: '4',
    barking: '3',
    protectiveness: '4',
    max_life_expectancy: '14',
  },
  {
    name: 'American Bulldog',
    image_link: 'link',
    energy: '0',
    barking: '1',
    protectiveness: '0',
    max_life_expectancy: '12',
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(SUCCESS_RESPONSE_MOCK),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe(getDogs.name, () => {
  it('should return correct data', async () => {
    const RETURNED_DATA = await getDogs();

    expect(RETURNED_DATA).toEqual(SUCCESS_RESPONSE_MOCK);
  });
});

describe(parseResponse.name, () => {
  it('should parse data correctly', () => {
    const DESCRIPTION = `Protectiveness is 3 
    and they are good with children. 
    Barking level is 1 and energy is 0.
    However they are bad to train.
  `;
    const EXPECTED_RESULT: ReturnType<typeof parseResponse> = {
      spaPackage: SUCCESS_RESPONSE_MOCK[0],
      trendingDescription: DESCRIPTION,
      collars: [SUCCESS_RESPONSE_MOCK[1], SUCCESS_RESPONSE_MOCK[2], SUCCESS_RESPONSE_MOCK[3]],
      carryOns: [SUCCESS_RESPONSE_MOCK[4], SUCCESS_RESPONSE_MOCK[5], SUCCESS_RESPONSE_MOCK[6]],
    };

    const RETURNED_DATA = parseResponse(SUCCESS_RESPONSE_MOCK);

    expect(RETURNED_DATA).toEqual(EXPECTED_RESULT);
  });
});

describe(sendEmail.name, () => {
  it('should send email with correct data', async () => {
    const MOCKED_RESPONSE = { status: 200, ok: true };

    jest.restoreAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCKED_RESPONSE),
      })
    ) as jest.Mock;

    const MOCKED_EMAIL = { email: 'address@email.com' };
    const MOCKED_DATA = {
      template_params: MOCKED_EMAIL,
    };

    await sendEmail(MOCKED_EMAIL);

    expect(fetch).toHaveBeenCalledWith('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(MOCKED_DATA),
    });
  });
});
