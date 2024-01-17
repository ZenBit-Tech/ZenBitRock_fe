const propertiesMockData = {
  data: [
    {
      id: '1',
      saleRent: 'for_sale',
      status: 'available',
      country: 'US',
      city: 'New York',
      price: 1000000,
      photo: '/api/v2/files/download/media/public/original/16e9feb4-c8ce-480f-a6e0-f70ef7dfd308',
      name: 'City view beautiful apartment',
    },
    {
      id: '2',
      saleRent: 'for_sale',
      status: 'available',
      country: 'US',
      city: 'New York',
      price: 2000000,
      photo: '/api/v2/files/download/media/public/original/be3230e9-3dfe-4a50-82f7-9db9c4678264',
      name: 'Central Park view beautiful apartment',
    },
    {
      id: '3',
      saleRent: 'for_sale',
      status: 'available',
      country: 'US',
      city: 'New York',
      price: 3000000,
      photo: '/api/v2/files/download/media/public/original/ab6d4b51-f324-46d7-8c85-213a36020930',
      name: 'Downtown view beautiful apartment',
    }
  ],
  pagination: {
    page_count: 1,
    current_page: 1,
    has_next_page: false,
    has_prev_page: false,
    count: 3,
    limit: 10
  }
}

const leadMockData = {
  data: [
    {
      id: '1',
      status: 'asleep',
      source: 'direct',
      contactName: 'Joe Black',
      contactPhone: '+1 123 456 7890',
    },
    {
      id: '1',
      status: 'asleep',
      source: 'direct',
      contactName: 'John Smith',
      contactPhone: '+1 123 456 7890',
    },
    {
      id: '1',
      status: 'asleep',
      source: 'direct',
      contactName: 'Lucy Brown',
      contactPhone: '+1 123 456 7890',
    },

  ],
  pagination: {
    page_count: 1,
    current_page: 1,
    has_next_page: false,
    has_prev_page: false,
    count: 3,
    limit: 10
  }
}

const agentsMockData = [
  {
    firstName: 'Brad ',
    lastName: 'Pitt',
    country: 'US',
    city: 'New York',
    avatarUrl: 'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1705343929/ZenBitRock/qfncuvyrj3wgxxgppmmz.jpg',
    email: '',
    id: '1',
    isVerified: true,
    role: '',
    phone: '+1 123 456 7890',
    qobrixContactId: '1',
    agencyName: '',
    description: '',
    avatarPublicId: '',
    qobrixAgentId: '',
  },
  {
    firstName: 'Frank ',
    lastName: 'Sinatra',
    country: 'US',
    city: 'New York',
    avatarUrl: 'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1704393365/ZenBitRock/jyr6skdun0qlaklun3nr.jpg',
    email: '',
    id: '2',
    isVerified: true,
    role: '',
    phone: '+1 123 456 7890',
    qobrixContactId: '1',
    agencyName: '',
    description: '',
    avatarPublicId: '',
    qobrixAgentId: '',
  },
]

const chatsMockData = [
  {
    id: '3834d306-2874-4fbd-9d28-359bc7084d32',
    createdAt: '2024-01-07T19:15:11.602Z',
    updatedAt: '2024-01-07T19:15:11.602Z',
    title: 'First chat',
    isPrivate: false,
    members: [
      {
        id: '38c90a3e-6674-41c8-a177-2a096d5c5e38',
        createdAt: '2024-01-07T19:13:24.325Z',
        updatedAt: '2024-01-07T19:43:01.251Z',
        email: 'bob1@gmail.com',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$UVY/q39FqpfpcCmQI3mUgw$z/r4qDMA1F8n6ojtE1ee3MqO4aTOjuSR8o17vnQ43F0',
        isVerified: true,
        verificationCode: '',
        firstName: 'Bill',
        lastName: 'Gates',
        role: 'agency',
        gender: 'Male',
        dateOfBirth: '1998-01-07',
        nationality: 'US',
        identity: 'Passport',
        status: 'Resident Individual',
        street: 'Wall str',
        city: 'New York',
        state: 'New York',
        zip: '10005',
        country: 'US',
        phone: '+1 231 231 3132',
        userDocumentUrl: null,
        userDocumentPublicId: null,
        avatarUrl: null,
        avatarPublicId:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdpP2YDIUfSMoozt5L2773XxWkMv-4IOYNLA&usqp=CAU',
        qobrixContactId: null,
        qobrixAgentId: null,
        agencyName: null,
        description: null,
      },
      {
        id: '8bf28fcd-5259-45d7-8e1e-aae49b100dd9',
        createdAt: '2024-01-07T17:26:36.799Z',
        updatedAt: '2024-01-07T19:38:55.000Z',
        email: 'peeetyaivanov@gmail.com',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$J0Q09huuoI7N6zDBqKzLjg$aPDPhyeCuAQKpVfvuB9MtNUygCta95maAiJd6M2nqto',
        isVerified: true,
        verificationCode: '200994',
        firstName: 'John',
        lastName: 'Smith',
        role: 'individual_agent',
        gender: 'Male',
        dateOfBirth: '1998-01-07',
        nationality: 'US',
        identity: 'Passport',
        status: 'Resident Individual',
        street: 'Wall str',
        city: 'New York',
        state: 'New York',
        zip: '10005',
        country: 'US',
        phone: '+1 231 231 3132',
        userDocumentUrl:
          'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1704656333/ZenBitRock/raqtkkatie6fgmpy3mel.jpg',
        userDocumentPublicId: 'ZenBitRock/raqtkkatie6fgmpy3mel',
        avatarUrl: null,
        avatarPublicId: null,
        qobrixContactId: '31ffa96a-b739-4d8b-838f-46a5cf03aa6c',
        qobrixAgentId: 'd26b8f30-a3e2-4522-9166-e75eeb4923e9',
        agencyName: null,
        description: null,
      },
    ],
  },
  {
    id: 'f20c04d5-b701-4d75-9fdc-885207a41961',
    createdAt: '2024-01-07T21:12:17.766Z',
    updatedAt: '2024-01-07T21:12:17.766Z',
    title: 'Second chat',
    isPrivate: false,
    members: [
      {
        id: '38c90a3e-6674-41c8-a177-2a096d5c5e38',
        createdAt: '2024-01-07T19:13:24.325Z',
        updatedAt: '2024-01-07T19:43:01.251Z',
        email: 'bob1@gmail.com',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$UVY/q39FqpfpcCmQI3mUgw$z/r4qDMA1F8n6ojtE1ee3MqO4aTOjuSR8o17vnQ43F0',
        isVerified: true,
        verificationCode: '',
        firstName: 'Bill',
        lastName: 'Gates',
        role: 'agency',
        gender: 'Male',
        dateOfBirth: '1998-01-07',
        nationality: 'US',
        identity: 'Passport',
        status: 'Resident Individual',
        street: 'Wall str',
        city: 'New York',
        state: 'New York',
        zip: '10005',
        country: 'US',
        phone: '+1 231 231 3132',
        userDocumentUrl: null,
        userDocumentPublicId: null,
        avatarUrl: null,
        avatarPublicId:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdpP2YDIUfSMoozt5L2773XxWkMv-4IOYNLA&usqp=CAU',
        qobrixContactId: null,
        qobrixAgentId: null,
        agencyName: null,
        description: null,
      },
      {
        id: '8bf28fcd-5259-45d7-8e1e-aae49b100dd9',
        createdAt: '2024-01-07T17:26:36.799Z',
        updatedAt: '2024-01-07T19:38:55.000Z',
        email: 'peeetyaivanov@gmail.com',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$J0Q09huuoI7N6zDBqKzLjg$aPDPhyeCuAQKpVfvuB9MtNUygCta95maAiJd6M2nqto',
        isVerified: true,
        verificationCode: '200994',
        firstName: 'John',
        lastName: 'Smith',
        role: 'individual_agent',
        gender: 'Male',
        dateOfBirth: '1998-01-07',
        nationality: 'US',
        identity: 'Passport',
        status: 'Resident Individual',
        street: 'Wall str',
        city: 'New York',
        state: 'New York',
        zip: '10005',
        country: 'US',
        phone: '+1 231 231 3132',
        userDocumentUrl:
          'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1704656333/ZenBitRock/raqtkkatie6fgmpy3mel.jpg',
        userDocumentPublicId: 'ZenBitRock/raqtkkatie6fgmpy3mel',
        avatarUrl: null,
        avatarPublicId: null,
        qobrixContactId: '31ffa96a-b739-4d8b-838f-46a5cf03aa6c',
        qobrixAgentId: 'd26b8f30-a3e2-4522-9166-e75eeb4923e9',
        agencyName: null,
        description: null,
      },
    ],
  },
];


export { propertiesMockData, leadMockData, agentsMockData, chatsMockData }