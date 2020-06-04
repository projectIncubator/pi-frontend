const projects = [
  {
    id: '111',
    title: 'Coronavirus Testing BC',
    oneliner:
      'Some description about the project, Not the project abstract. Just one or two lines!',
    startDate: new Date(2020, 4, 1).getTime(),
    endDate: new Date(2020, 11, 31).getTime(),
    state: 'ongoing',
    logo:
      'https://dailynews.mcmaster.ca/wp-content/uploads/sites/3/2020/01/coronavirus-photo-1.jpg',
    themes: ['medicine', 'healthcare', 'politics'],
    owner: {
      id: '456',
      name: 'Alexander Bergholm'
    },
    members: [
      'John Doe',
      'Jane Smith',
      'Larry Page',
      'Alex HolmBerg',
      'Henrick Yap'
    ],
    pages: {
      overview: {
        sidebarModules: [
          {
            type: 'button',
            header: '',
            text: 'Request to Join'
          },
          { type: 'membership', header: 'Membership' },
          {
            type: 'resources',
            header: 'Resources',
            content: [
              { text: 'Discord', link: 'https://discord.com/' },
              { text: 'Slack', link: 'https://slack.com/intl/en-ca/' },
              { text: 'Resource 1', link: 'https://google.com/' }
            ]
          }
        ]
      }
    }
  },
  {
    id: '222',
    title: 'Kitsilano Community Engagement',
    oneliner:
      'Some description about the project, Not the project abstract. Just one or two lines!',
    startDate: new Date(2019, 10, 15).getTime(),
    endDate: new Date(2020, 3, 30).getTime(),
    state: 'completed',
    logo:
      'https://kitscc.com/wp-content/uploads/2016/07/Kitscc_CC_Colaborative_Gardens_1269.jpg',
    themes: ['environmental', 'politics'],
    owner: {
      id: '456',
      name: 'Alexander Bergholm'
    }
  }
];

const users = [
  {
    id: '123',
    firstName: 'Kenrick',
    lastName: 'Yap',
    imgSrc:
      'https://media-exp1.licdn.com/dms/image/C4D03AQErND9yV4YlOQ/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=_UMhkaYPkMSudY_KfrkFos0XnCEAYRPK3vBftoOwmHs',
    bio: 'Student at The University of British Columbia',
    link: 'https://github.com/14yapkc1',
    username: '14yapkc1',
    following: ['456', '789'],
    followers: ['456'],
    interested: [projects[0], projects[1]],
    contributing: [projects[1]],
    createdProjects: []
  },
  {
    id: '456',
    firstName: 'Alexander',
    lastName: 'Bergholm',
    imgSrc:
      'https://media-exp1.licdn.com/dms/image/C4D03AQGs85aYF34VTw/profile-displayphoto-shrink_400_400/0?e=1595462400&v=beta&t=XlhgJCJ2zmKVK59QYuVvm4BRRZTX1rJUrsyT6NFOonU',
    bio:
      'Machine Learning enthusiast, applied in a Medical and Healthcare environment',
    link: '',
    username: 'bergholma',
    following: ['123', '789'],
    followers: ['123'],
    interested: [],
    contributing: [],
    createdProjects: [projects[0], projects[1]]
  },
  {
    id: '789',
    firstName: 'Hal',
    lastName: 'Shin',
    imgSrc: '',
    bio: 'Professional Bombergrounds Player 3k ELO',
    link: 'https://twitch.tv/thewarriorofblue',
    username: 'communitybicycle',
    following: [],
    followers: ['123', '456'],
    interested: [],
    contributing: [projects[0]],
    createdProjects: []
  }
];

export { projects, users };
