import { arrayOf, exact, number, shape, string, bool, oneOf } from 'prop-types';

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

const pagesContentType = exact({
  title: string.isRequired
});

const pagesType = exact({
  type: string.isRequired,
  id: string.isRequired,
  showing: bool.isRequired,
  sidebar: bool.isRequired,
  content: pagesContentType.isRequired
});

const sidebarModulesType = exact({
  type: string.isRequired,
  content: shape({
    header: string.isRequired
  }).isRequired
});

export const projectType = exact({
  id: string.isRequired,
  title: string.isRequired,
  status: string.isRequired,
  logo: string.isRequired,
  themes: arrayOf(themeType).isRequired,
  member_count: number.isRequired,
  interested_count: number.isRequired,
  creator: userStubType.isRequired,
  start_date: string.isRequired,
  end_date: string.isRequired,
  oneliner: string.isRequired,
  discussion_id: arrayOf(string).isRequired,
  admins: arrayOf(userStubType).isRequired,
  cover_photo: string.isRequired,
  pages: arrayOf(pagesType).isRequired,
  sidebar_modules: arrayOf(sidebarModulesType).isRequired
});

export const userType = exact({
  id: string.isRequired,
  first_name: string.isRequired,
  last_name: string.isRequired,
  image: string.isRequired,
  profile_id: string.isRequired,
  bio: string.isRequired,
  link: string.isRequired,
  following_count: number.isRequired,
  followers_count: number.isRequired,
  interested: arrayOf(projectStubType).isRequired,
  contributing: arrayOf(projectStubType).isRequired,
  created_projects: arrayOf(projectStubType).isRequired
});
