import {
  arrayOf,
  objectOf,
  bool,
  exact,
  number,
  shape,
  string,
  object
} from 'prop-types';
import { themeType, userStubType } from './index';

const pagesContentType = exact({
  type: string.isRequired,
  content: object.isRequired // to be updated
});

const pagesMetaType = exact({
  type: string.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  showing: bool.isRequired,
  sidebar: bool.isRequired
});

const pagesModulesType = exact({
  pages: objectOf(pagesContentType)
});

const projectMetaType = exact({
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
  pages_order: arrayOf(pagesMetaType).isRequired
});

const sidebarModulesType = exact({
  type: string.isRequired,
  content: shape({
    header: string.isRequired
  }).isRequired
});

export const projectType = exact({
  meta: projectMetaType.isRequired,
  sidebar_modules: arrayOf(sidebarModulesType).isRequired,
  pages_modules: pagesModulesType,
  members: object.isRequired, // TODO
  events: object.isRequired, // TODO
  tasks: object.isRequired // TODO
});
