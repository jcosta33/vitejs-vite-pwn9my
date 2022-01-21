import axios from 'axios';

import { IData, Resolve } from '.';
import config from './config';

const url = 'http://ehub-api.beamian.com/api';

export interface LoginSuccess {
  auth_token: string;
}

export interface LoginError {
  email: [string];
  password: [string];
  non_field_errors: [string];
}

export interface LoginForm {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface ResetPasswordParams {
  email: string;
}

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  language: string;
}

export interface User {
  email: string;
  name: string;
  phone_number: string;
  language: string;
}

export const loginUser = (form: LoginForm) => new Promise((resolve: Resolve<LoginSuccess>, reject: Resolve<LoginError>) => {
  axios
    .post(`${url}/v1/token/login/`, form, config())
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      console.log(err)
      reject(err);
    });
});

export const createUser = (form: RegisterForm) => new Promise((resolve: Resolve<LoginSuccess>, reject: Resolve<LoginError>) => {
  axios
    .post(`${url}/v1/users/`, form, config())
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      console.log(err)
      reject(err);
    });
});

export const resetPassword = (params: ResetPasswordParams) => new Promise((resolve: Resolve<LoginSuccess>, reject: Resolve<LoginError>) => {
  axios
    .post(`${url}/v1/users/reset_password/`, params, config())
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      console.log(err)
      reject(err);
    });
});

export const getUserMe = () => new Promise((resolve: Resolve<User>, reject: Resolve<LoginError>) => {
  axios
    .get(`${url}/v1/users/me/`, config())
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      console.log(err)
      reject(err);
    });
});


export const getUsers = () => new Promise((resolve: Resolve<IData<User>>, reject: Resolve<LoginError>) => {
  axios
    .get(`${url}/v1/users/`, config())
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      console.log(err)
      reject(err);
    });
});

