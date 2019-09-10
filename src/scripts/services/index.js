import axios from '../helpers/axios';

const request = axiosRequest => axiosRequest
  .then(data => Promise.resolve(data.data))
  .catch(error => Promise.reject(error));

const getCommentsList = (count, offset) =>
  request(axios.get('/comments', { count, offset }));

export default {
  getCommentsList,
};
