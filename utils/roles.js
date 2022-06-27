module.exports.hasRole = (member,id) =>{
    return member.roles.cache.some(role => role.id == id);
}

module.exports.addRole = (member,id) =>{
    member.roles.add(member.guild.roles.cache.find(role => role.id == id));
}

module.exports.isAdmin = (member) => {
    return member.permissions.has('ADMINISTRATOR');
}