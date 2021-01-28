// src/access.ts
export default function access(initialState) {
  const { currentUser } = initialState || {};

  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    roleAuth: (route) => {
      const { roleInfo } = initialState;
      const menuPerm = roleInfo.menuPerm?.split(',') || [];
      return menuPerm.includes(route.path);
    },
  };
}
