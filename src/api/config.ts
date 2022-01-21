import { store } from '@/store';
import { AxiosRequestConfig } from 'axios';


export default (formData = false) => {
  const token = store.state.auth_token;
  const contentType = formData ? 'multipart/form-data;' : 'application/json';
  const reqhead: AxiosRequestConfig = {
    headers: {
      'content-type': contentType,
      'Accept-Language': store.getters.getLanguage,
    }
  }
  if (reqhead.headers && token !== '') {
    reqhead.headers.Authorization = `Token ${token}`
  }
  return reqhead;
};