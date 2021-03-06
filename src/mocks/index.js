import { v4 as uuid } from 'uuid';

export const themes = [
  {
    name: 'health',
    logo: '',
    description: 'Good Health and Well-being'
  },
  {
    name: 'education',
    logo: '',
    description: 'Quality Education'
  },
  {
    name: 'sustainability',
    logo: '',
    description: 'Sustainable Cities and Communities'
  }
];

const userStubs = [
  {
    id: '123',
    first_name: 'Kenrick',
    last_name: 'Yap',
    image:
      'https://media-exp1.licdn.com/dms/image/C4D03AQErND9yV4YlOQ/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=_UMhkaYPkMSudY_KfrkFos0XnCEAYRPK3vBftoOwmHs',
    profile_id: '14yapkc1'
  },
  {
    id: '456',
    first_name: 'Alexander',
    last_name: 'Bergholm',
    image:
      'https://media-exp1.licdn.com/dms/image/C4D03AQGs85aYF34VTw/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=XlhgJCJ2zmKVK59QYuVvm4BRRZTX1rJUrsyT6NFOonU',
    profile_id: 'bergholma'
  },
  {
    id: '789',
    first_name: 'Hal',
    last_name: 'Shin',
    image: '',
    profile_id: 'communitybicycle'
  }
];

export const projects = [
  {
    meta: {
      id: '111',
      title: 'Coronavirus Testing BC',
      status: 'ongoing',
      logo: '',
      themes: [
        {
          name: 'health',
          logo: '',
          description: 'Good Health and Well-being'
        }
      ],
      member_count: 2,
      interested_count: 2,
      creator: userStubs[1],
      start_date: new Date(2020, 4, 1).toISOString(),
      end_date: new Date(2020, 11, 31).toISOString(),
      oneliner:
        'Some description about the project, Not the project abstract. Just one or two lines!',
      discussion_id: [],
      admins: [userStubs[1]],
      cover_photo:
        'https://dailynews.mcmaster.ca/wp-content/uploads/sites/3/2020/01/coronavirus-photo-1.jpg',
      pages_order: [
        {
          type: 'overview',
          id: '4e150e27',
          showing: true,
          sidebar: true,
          title: 'Overview'
        },
        {
          type: 'general',
          id: '6f3077a5',
          showing: true,
          sidebar: true,
          title: 'About'
        },
        {
          type: 'tasks',
          id: '8p12k0q0',
          showing: true,
          sidebar: false,
          title: 'Tasks'
        },
        {
          type: 'discussions',
          id: '01cb7854',
          showing: true,
          sidebar: false,
          title: 'Discussions'
        }
      ]
    },
    pages_modules: {
      pages: {
        '4e150e27': {
          type: 'overview',
          content: {
            modules: [
              {
                type: 'description',
                subtext: 'A short summary of what this project is about.',
                id: uuid(),
                unique: true,
                content: {
                  header: '',
                  text: 'This project serves to inform and educate the public regarding the novel virus, COVID-19.'
                }
              },
              {
                type: 'general',
                subtext: 'A multi-purpose component with rich text editing.',
                id: uuid(),
                unique: false,
                content: {
                  header: 'Welcome to the Coronavirus Testing BC Project!',
                  contentState:
                    '{"blocks":[{"key":"c7clc","text":"Coronavirus testing is dedicated to spreading the good word and the truth about the testing procedures of the COVID-19. You can find more resources on our website.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"73kfd","text":"It\'s important that we stay positive throughout this pandemic. If you need resources for your mental health, please check out www.mentalhealth.com.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9qbpr","text":"We are looking for helpers!","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1acnb","text":"If you are interested in joining us, please don\'t hesitate to click the join us button on the top right of this page.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":72,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"656c9","text":"Tips for staying healthy","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c0l4n","text":"Wash your hands often and thoroughly.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7nhtl","text":"Stay 6 feet away from others.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"495bv","text":"Stay home.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
                }
              }
            ]
          }
        },
        '8p12k0q0': {
          type: 'tasks',
          content: {}
        },
        '01cb7854': {
          type: 'discussions',
          content: {}
        },
        '6f3077a5': {
          type: 'general',
          content: { contentState: {} }
        }
      }
    },
    sidebar_modules: [
      {
        type: 'membership',
        id: uuid(),
        content: {
          header: 'Membership'
        }
      },
      {
        type: 'resources',
        id: uuid(),
        content: {
          header: 'Resources',
          resources: [
            { text: 'Discord', link: 'https://discord.com/' },
            { text: 'Slack', link: 'https://slack.com/intl/en-ca/' },
            { text: 'Resource 1', link: 'https://google.com/' }
          ]
        }
      },
      {
        type: 'text',
        id: uuid(),
        content: {
          header: 'Test Header',
          text: `Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.`
        }
      }
    ],
    members: {
      789: {
        role: 'admin',
        contributions: {}
      }
    },
    events: {},
    tasks: {
      lastTaskId: 4,
      milestones: {
        1555: {
          text: 'Enforce mask usage',
          description:
            'Masks are an important aspect of keeping everyone safe.',
          id: 1555,
          tasks: [3],
          members: [],
          status: 'To do',
          createdDate: new Date()
        },
        2215: {
          text: 'Advertise on Google',
          description:
            'Google is a great platform to advertise on. We need more leads!',
          id: 2215,
          tasks: [],
          members: [],
          status: 'To do',
          createdDate: new Date()
        }
      },
      statuses: {
        abcd: {
          id: 'abcd',
          title: 'To do',
          tasks: [3]
        },
        uuidgoeshere: {
          id: 'uuidgoeshere',
          title: 'In progress',
          tasks: []
        },
        qwerty: {
          id: 'qwerty',
          title: 'Complete',
          tasks: [4]
        }
      },
      statusOrder: ['abcd', 'uuidgoeshere', 'qwerty'],
      tasks: {
        3: {
          text: 'Buy a bunch of masks laksdf alokdjf opiawjfe poiasfo pijaesfoi jaseofi jasoifj asoiejoiajf oijefoij',
          description:
            'We need to buy some masks, but we have to keep track of our expenses since we have a tight budget.',
          id: 3,
          milestone: 1555,
          subtasks: [
            {
              id: uuid(),
              text: 'Assign someone to buy the masks',
              assigned: [],
              dueDate: new Date()
            }
          ],
          comments: [
            {
              user: {
                username: 'hal.shin@alumni.ubc.ca',
                nickname: 'Hal Shin'
              },
              createdDate: new Date('2020-08-10'),
              text: 'This is a test comment... or is it?'
            },
            {
              user: {
                username: 'hal.shin@alumni.ubc.ca',
                nickname: 'Hal Shin'
              },
              createdDate: new Date(),
              text: 'Did I make this comment just now?'
            }
          ],
          members: [],
          status: 'In progress',
          createdDate: new Date()
        },
        4: {
          text: 'This is a completed task',
          description: '',
          id: 4,
          milestone: 2215,
          subtasks: [],
          comments: [],
          members: [],
          status: 'Complete',
          createdDate: new Date()
        }
      }
    }
  },
  {
    meta: {
      id: '222',
      title: 'Kitsilano Community Engagement',
      status: 'completed',
      logo: '',
      themes: [
        {
          name: 'education',
          logo: '',
          description: 'Quality Education'
        },
        {
          name: 'sustainability',
          logo: '',
          description: 'Sustainable Cities and Communities'
        }
      ],
      member_count: 2,
      interested_count: 2,
      creator: userStubs[1],
      start_date: new Date(2019, 10, 15).toISOString(),
      end_date: new Date(2020, 3, 30).toISOString(),
      oneliner:
        'Some description about the project, Not the project abstract. Just one or two lines!',
      discussion_id: [],
      admins: [userStubs[1]],
      cover_photo:
        'https://kitscc.com/wp-content/uploads/2016/07/Kitscc_CC_Colaborative_Gardens_1269.jpg',
      pages_order: [
        {
          type: 'overview',
          id: 'effcc25e',
          showing: true,
          sidebar: true,
          title: 'Overview'
        },
        {
          type: 'discussions',
          id: 'b7fc5b30',
          showing: true,
          sidebar: false,
          title: 'Discussions'
        }
      ]
    },
    pages_modules: {
      pages: {
        effcc25e: {
          type: 'overview',
          content: {
            modules: []
          }
        },
        b7fc5b30: {
          type: 'discussions',
          content: {}
        }
      }
    },
    sidebar_modules: [
      {
        type: 'membership',
        id: uuid(),
        content: {
          header: 'Membership'
        }
      },
      {
        type: 'resources',
        id: uuid(),
        content: {
          header: 'Resources',
          resources: [
            { text: 'Discord', link: 'https://discord.com/' },
            { text: 'Slack', link: 'https://slack.com/intl/en-ca/' },
            { text: 'Resource 1', link: 'https://google.com/' }
          ]
        }
      },
      {
        type: 'text',
        id: uuid(),
        content: {
          header: 'Test Header',
          text: `Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.`
        }
      }
    ],
    members: {
      789: {
        role: 'admin',
        contributions: {}
      }
    },
    events: {},
    tasks: {}
  }
];

export const projectStubs = projects.map((project) => ({
  id: project.meta.id,
  title: project.meta.title,
  status: project.meta.status,
  logo: project.meta.logo,
  themes: project.meta.themes,
  member_count: project.meta.member_count,
  interested_count: project.meta.interested_count,
  start_date: project.meta.start_date,
  end_date: project.meta.end_date,
  oneliner: project.meta.oneliner
}));

export const projectStubsFeatured = projects.map((project) => ({
  id: project.meta.id,
  title: project.meta.title,
  status: project.meta.status,
  logo: project.meta.logo,
  themes: project.meta.themes,
  member_count: project.meta.member_count,
  interested_count: project.meta.interested_count,
  oneliner: project.meta.oneliner,
  cover_photo: project.meta.cover_photo
}));

export const users = [
  {
    id: '123',
    first_name: 'Kenrick',
    last_name: 'Yap',
    image:
      'https://media-exp1.licdn.com/dms/image/C4D03AQErND9yV4YlOQ/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=_UMhkaYPkMSudY_KfrkFos0XnCEAYRPK3vBftoOwmHs',
    profile_id: '14yapkc1',
    bio: 'Student at The University of British Columbia',
    link: 'https://github.com/14yapkc1',
    following_count: 2,
    followers_count: 1,
    interested: [projectStubs[0], projectStubs[1]],
    contributing: [projectStubs[1]],
    created_projects: []
  },
  {
    id: '456',
    first_name: 'Alexander',
    last_name: 'Bergholm',
    image:
      'https://media-exp1.licdn.com/dms/image/C4D03AQGs85aYF34VTw/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=XlhgJCJ2zmKVK59QYuVvm4BRRZTX1rJUrsyT6NFOonU',
    profile_id: 'bergholma',
    bio: 'Machine Learning enthusiast, applied in a Medical and Healthcare environment',
    link: '',
    following_count: 2,
    followers_count: 1,
    interested: [projectStubs[0], projectStubs[1]],
    contributing: [projectStubs[0], projectStubs[1]],
    created_projects: [projectStubs[0], projectStubs[1]]
  },
  {
    id: '789',
    first_name: 'Hal',
    last_name: 'Shin',
    image: '',
    profile_id: 'communitybicycle',
    bio: 'Professional Bombergrounds Player 3k ELO',
    link: 'https://twitch.tv/thewarriorofblue',
    following_count: 0,
    followers_count: 2,
    interested: [],
    contributing: [projectStubs[0]],
    created_projects: []
  }
];

export const members = {
  111: [userStubs[1], userStubs[2]],
  222: [userStubs[1], userStubs[0]]
};

export const AVAILABLE_SIDEBAR_COMPONENTS = [
  {
    type: 'join',
    subtext: 'Show a button to recruit new members.',
    id: uuid(),
    open: false,
    unique: true,
    content: {
      header: ''
    }
  },
  {
    type: 'membership',
    subtext: 'Show your list of members.',
    id: uuid(),
    open: false,
    unique: true,
    content: {
      header: ''
    }
  },
  {
    type: 'resources',
    subtext: 'Set useful external links.',
    id: uuid(),
    open: false,
    unique: true,
    content: {
      header: '',
      resources: [
        { type: 'Facebook', link: '' },
        { type: 'Twitter', link: '' },
        { type: 'Facebook', link: '' },
        { type: 'Discord', link: '' },
        { type: 'Slack', link: '' },
        { type: 'Custom', text: 'Resource 1', link: '' }
      ]
    }
  },
  {
    type: 'text',
    subtext: 'Display custom text.',
    id: uuid(),
    open: false,
    unique: false,
    content: {
      header: '',
      text: ''
    }
  },
  {
    type: 'positions',
    subtext: 'Show a progress bar of positions you are looking for.',
    id: uuid(),
    open: false,
    unique: true,
    content: {
      header: '',
      text: ''
    }
  }
];

export const AVAILABLE_PAGES = [
  {
    type: 'overview',
    subtext: 'Shows the overview of the project',
    id: uuid(),
    open: false,
    unique: true,
    showing: true,
    sidebar: true,
    title: 'Overview'
  },
  {
    type: 'discussions',
    subtext: 'A forum for discussing project-related ideas',
    id: uuid(),
    open: false,
    unique: true,
    showing: true,
    sidebar: false,
    title: 'Discussions'
  },
  {
    type: 'tasks',
    subtext: 'A page detailing the tasks pertinent to the project',
    id: uuid(),
    open: false,
    unique: true,
    showing: true,
    sidebar: false,
    title: 'Tasks'
  },
  {
    type: 'general',
    subtext: 'A generic page template for various uses',
    id: uuid(),
    open: false,
    unique: false,
    showing: true,
    sidebar: true,
    title: 'General',
    content: {
      contentState: {}
    }
  }
];

export const AVAILABLE_COMPONENTS = [
  {
    type: 'general',
    subtext: 'A multi-purpose component with rich text editing.',
    id: uuid(),
    unique: false,
    content: {
      header: 'General',
      contentState: ''
    }
  },
  {
    type: 'description',
    subtext: 'A short summary of what this project is about.',
    id: uuid(),
    unique: true,
    content: {
      header: '',
      text: ''
    }
  },
  {
    type: 'milestones',
    subtext: 'Shows a list of milestone cards.',
    id: uuid(),
    unique: true,
    content: {
      header: 'Milestones'
    }
  }
];

export const getProjectIndexById = (id) => {
  return projects.findIndex((el) => el.meta.id === id);
};

export const getPageMetaById = (projectId, pageId) => {
  const foundIndex = getProjectIndexById(projectId);
  if (foundIndex === -1) return null;
  return projects[foundIndex].meta.pages_order.find((el) => el.id === pageId);
};

export const getPageContentById = (projectId, pageId) => {
  const foundIndex = getProjectIndexById(projectId);
  if (foundIndex === -1) return null;
  return projects[foundIndex].pages_modules.pages[pageId].content;
};
