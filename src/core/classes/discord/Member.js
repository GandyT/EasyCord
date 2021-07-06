class Member {
    constructor(memberData) {
        this.roleIds = memberData.roles;
        this.joinDate = memberData.joined_at;
        this.user = memberData.user;
        this.id = memberData.user.id;
        this.guild = memberData.guild;
    }
}

module.exports = Member;