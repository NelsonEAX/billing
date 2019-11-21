import request from '../../api/request';

const user = {
  state: {
    id: '',
    email: '',
    name: '',
    surname: '',
    wallets: [],
  },

  getters: {
    userId: state => state.id,
    userEmail: state => state.email,
    userName: state => state.name,
    userSurname: state => state.surname,
    userWallets: state => state.wallets,
  },

  mutations: {
    SET_USER_INFO: (state, payload) => {
      if (payload.logout) {
        state.id = '';
        state.email = '';
        state.name = '';
        state.surname = '';
        state.wallets = [];
      } else {
        state.id = payload.id || state.id;
        state.email = payload.email || state.email;
        state.name = payload.name || state.name;
        state.surname = payload.surname || state.surname;
      }
    },
    SET_USER_WALLETS: (state, payload) => {
      state.wallets = payload.wallets || state.wallets;
    },
  },

  actions: {
    ForAuthorized: async ({ commit, dispatch }, payload) => {
      console.log('[ForAuthorized]', payload);
      await commit('SET_USER_INFO', payload.user);
      await dispatch('UserWallets');
      await dispatch('AllWallets');
    },

    CheckSession: async ({ dispatch }) => {
      console.log('[CheckSession]');
      const response = await request('/session');
      await dispatch('ForAuthorized', response);
      console.log('[CheckSession] response: ', JSON.stringify(response));
    },

    SignIn: async ({ dispatch }, payload) => {
      console.log('[SignIn]', payload);
      const response = await request('/signin', payload);
      await dispatch('ForAuthorized', response);
      console.log('[SignIn] response: ', JSON.stringify(response));
    },

    SignUp: async ({ dispatch }, payload) => {
      console.log('[SignUp]', payload);
      const response = await request('/signup', payload);
      await dispatch('ForAuthorized', response);
      console.log('[SignUp] response: ', JSON.stringify(response));
    },

    SignOut: async ({ commit }) => {
      console.log('[SignOut]');
      const response = await request('/signout');
      await commit('SET_USER_INFO', { logout: true });
      console.log('[SignOut] response: ', JSON.stringify(response));
    },

    UserWallets: async ({ commit }) => {
      console.log('[UserWallets]');
      const response = await request('/wallets/user');
      await commit('SET_USER_WALLETS', response);
      console.log('[UserWallets] response: ', JSON.stringify(response));
    },
  },
};

export default user;
