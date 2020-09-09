import { arrayOf, bool, exact, number, shape, string } from 'prop-types';

export const themeType = exact({
  name: string.isRequired,
  logo: string.isRequired,
  description: string.isRequired
});

export const projectStubType = exact({
  id: string.isRequired,
  title: string.isRequired,
  status: string.isRequired,
  logo: string.isRequired,
  themes: arrayOf(themeType).isRequired,
  member_count: number.isRequired,
  interested_count: number.isRequired,
  start_date: string.isRequired,
  end_date: string.isRequired,
  oneliner: string.isRequired
});

export const userStubType = exact({
  id: string.isRequired,
  first_name: string.isRequired,
  last_name: string.isRequired,
  image: string.isRequired,
  profile_id: string.isRequired
});

export const userType = exact({
  id: string.isRequired,
  first_name: string.isRequired,
  last_name: string.isRequired,
  image: string.isRequired,
  profile_id: string.isRequired,
  email: string.isRequired,
  deactivated: bool.isRequired,
  banned: bool.isRequired,
  bio: string.isRequired,
  link: string,
  following_count: number.isRequired,
  followers_count: number.isRequired,
  interested: arrayOf(projectStubType).isRequired,
  contributing: arrayOf(projectStubType).isRequired,
  created: arrayOf(projectStubType).isRequired,
  interested_themes: arrayOf(themeType).isRequired
});

export const matchType = exact({
  isExact: bool.isRequired,
  params: shape({
    projectId: string,
    0: string
  }),
  path: string.isRequired,
  url: string.isRequired
});
