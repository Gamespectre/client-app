const eventNamespace = 'Spectator\\Events\\'

class PusherClient {

    constructor(channel) {
        if (__CLIENT__) {
            this.pusher = new Pusher('7b618f00b94f879007fb')
        } else {
            console.error("Please only run the PusherClient clientside.")
            return false
        }

        this.channel = this.pusher.subscribe(channel)
        this.listeners = []

    }

    static subscribe(channel) {
        let client = new PusherClient(channel)
        return client
    }

    isListening(event, listener) {
        return this.listeners.some(listenerDef => {
            return listenerDef.event === event &&
                   listenerDef.callback === listener
        })
    }

    listen(event, listener) {
        if(this.isListening(event, listener)) return false
        this.channel.bind(eventNamespace + event, listener)

        let listenerDef = {
            callback: listener,
            event: event
        }

        this.listeners.push(listenerDef)
    }

    unlisten(event, listener = false) {
        if(!listener) this.channel.unbind(event)
        else this.channel.unbind(eventNamespace + event, listener)

        delete this.listeners[event]
    }
}

export default PusherClient