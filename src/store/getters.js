const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  email: state => state.user.email,
  system: state => state.user.system,
  roles: state => state.user.roles,
  power: state => state.user.power,
  permission_routes: state => state.permission.routes
}
export default getters
