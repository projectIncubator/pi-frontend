const themes = {
  health: {
    name: 'health',
    logo: '',
    description: 'Good Health and Well-being'
  },
  education: {
    name: 'education',
    logo: '',
    description: 'Quality Education'
  },
  sustainability: {
    name: 'sustainability',
    logo: '',
    description: 'Sustainable Cities and Communities'
  }
};

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
    id: '111',
    title: 'Coronavirus Testing BC',
    status: 'ongoing',
    logo: '',
    themes: [themes['health']],
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
    pages: [],
    sidebar_modules: [
      {
        type: 'membership',
        content: {
          header: 'Membership'
        }
      },
      {
        type: 'resources',
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
        content: {
          header: 'Test Header',
          text: `Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.`
        }
      }
    ]
  },
  {
    id: '222',
    title: 'Kitsilano Community Engagement',
    status: 'completed',
    logo: '',
    themes: [themes['education'], themes['sustainability']],
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
    pages: [],
    sidebar_modules: [
      {
        type: 'membership',
        content: {
          header: 'Membership'
        }
      },
      {
        type: 'resources',
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
        content: {
          header: 'Test Header',
          text: `Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.
            Lorem ipsum dolor asit amet, consectetur adipiscing elit.`
        }
      }
    ]
  }
];

export const projectStubs = projects.map((project) => ({
  id: project.id,
  title: project.title,
  status: project.status,
  logo: project.logo,
  themes: project.themes,
  member_count: project.member_count,
  interested_count: project.interested_count,
  start_date: project.start_date,
  end_date: project.end_date,
  oneliner: project.oneliner
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
    bio:
      'Machine Learning enthusiast, applied in a Medical and Healthcare environment',
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
  '111': [userStubs[1], userStubs[2]],
  '222': [userStubs[1], userStubs[0]]
};
