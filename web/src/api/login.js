
export function loginByUsernamel(username, password) {
    const data = {
        username,
      password
    };
    return fetch({
      url: '/login/loginByUsername ',
      method: 'post',
      params:{data}
    });
  }