class Role {

    constructor(roleData) {
        this.id = roleData.id;
        this.name = roleData.name;
        this.permissions = roleData.permissions;
        this.position = roleData.position;
        this.color = roleData.color;
        this.hoist = roleData.hoist;
        this.managed = roleData.managed;
        this.mentionable = roleData.mentionable;
        this.guild = roleData.guild;
    }
}

module.exports = Role;