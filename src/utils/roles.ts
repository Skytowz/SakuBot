//FIXME
export const hasRole = (member: any, id: string) => {
  return member.roles.cache.some((role: { id: string }) => role.id == id);
};

//FIXME
export const addRole = (member: any, id: string) => {
  member.roles.add(
    member.guild.roles.cache.find((role: { id: string }) => role.id == id)
  );
};

//FIXME
export const isAdmin = (member: any) => {
  return member.permissions.has('ADMINISTRATOR');
};
