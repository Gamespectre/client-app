export default {
    user(data) {
        return data !== false &&
               data.roles.length > 0 &&
               typeof data.name === "string" &&
               data.name.length > 0
    }
}