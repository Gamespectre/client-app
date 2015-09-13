const eventNamespace = 'Spectator\\Events\\'

class PusherClient {

    constructor(channel) {
        if (__CLIENT__) {
            let pusher = require('pusher-js')
            this.pusher = new Pusher('7b618f00b94f879007fb')
        } else {
            console.error("Please only run the PusherClient clientside.")
            return false
        }

        this.channel = this.pusher.subscribe(channel)
    }

    static subscribe(channel, event, listener) {
        let client = new PusherClient(channel)
        client.listen(event, listener)
        return client
    }

    listen(event, listener) {
        this.channel.bind(eventNamespace + event, listener)
    }

    unlisten(event, listener = false) {
        if(!listener) this.channel.unbind(event)
        else this.channel.unbind(eventNamespace + event, listener)
    }
}

export default PusherClient