class Member {
    constructor(memberData, client) {
        this.client = client;

        this.roleIds = memberData.roles;
        this.joinDate = memberData.joined_at;
        this.user = memberData.user;
        this.id = memberData.user.id;
        this.guild = memberData.guild;
    }

    get roles() {
        return this.client.roles.filter(r => this.roleIds.includes(r.id));
    }
}

module.exports = Member;