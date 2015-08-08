import mobservable from 'mobservable'

export default function(data: Object) {
    return mobservable.makeReactive({
        name: data.name === "Anonymous" ? false : data.name,
        avatar: data.avatar,
        registered: data.created_at,
        googleId: data.google_id,
        userId: data.id,
        roles: data.roles.map(role => {
            return {
                role: role.name,
                level: role.level
            }
        })
    })
}