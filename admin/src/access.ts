// src/access.ts
export default function access(initialState) {
  const { currentUser } = initialState || {};

  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    roleAuth: (route) => {
      return true
      // const { menuPerm } = initialState.roleInfo;
      // return menuPerm.includes(route.path);
    },
  };
}
