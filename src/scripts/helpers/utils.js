import $ from 'jquery';
import { OWNER_NAME } from '../constants/app.constants';

const select = name => $(name);

const isOwner = name = name === OWNER_NAME;

export default {
  select,
  isOwner,
};
