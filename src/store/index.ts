// store.ts
import { Resolve } from '@/api';
import { getUserMe, LoginError, LoginForm, LoginSuccess, loginUser, User } from '@/api/auth';
import { AxiosResponse } from 'axios';
import { createStore } from 'vuex'

// define your typings for the store state
export interface State {
    context_user: any
    errors: boolean
    messages: LoginError
    auth_token: string
    language: 'pt'
}

export const store = createStore<State>({
    state: {
        context_user: {
            id: 0,
            name: '',
            email: '',
            token: '',
        },
        auth_token: '',
        errors: false,
        messages: {
            email: [''],
            password: [''],
            non_field_errors: ['']
        },
        language: 'pt',
    },
    getters: {
        getLanguage(state) {
            return state.language;
        }
    },
    actions: {
        loginUser({ commit }, form: LoginForm) {

            loginUser(form).then(response => {
                if (form.remember_me) {
                    localStorage.setItem('ehub-user-auth', response.data.auth_token)
                } else {
                    localStorage.removeItem('ehub-user-auth')
                }
                commit('setLogin', response)
            }).catch(err => {
                commit('setLoginError', err.response)
            });

        },
        getContextUser({ commit }) {
            getUserMe().then(response => {
                commit('setContextUser', response.data);
            }).catch(err => {
                commit('setContextUserError', err.response);
            })
        }
    },
    mutations: {

        setLogin(state: State, param: AxiosResponse<LoginSuccess> | string) {
            if (typeof param === 'object') {
                state.auth_token = param.data.auth_token;
            } else {
                state.auth_token = param;
            }
        },

        setContextUser(state: State, param: User) {
            state.context_user = param;
        },

        setLogout(state: State) {
            state.auth_token = '';
            state.context_user = {};
        },

        setLoginError(state: State, err: AxiosResponse<LoginError>) {
            state.errors = true;
            state.messages = err.data;
        }
    }

});
