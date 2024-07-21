type Queue = {
    interval: NodeJS.Timeout | null
    messages: string[]
}

const queue: Queue = {
    interval: null,
    messages: []
}

export const pushToQueue = (msg: string) => {
    queue.messages.push(msg)
    if (queue.messages.length < 5) {
        queue.interval?.refresh()
    }
}

export const startQueue = function(callback: (messages: string[]) => void) {
    queue.interval = setInterval(processQueue, 10 * 1000)

    function processQueue () {
        if (queue.messages.length) {
            const messages = [...queue.messages]
            queue.messages = []
            callback.apply(null, [messages])
        }
    }
}