/* eslint-disable no-undef */

//@ts-ignore
import { Message } from '@asyncapi/glee'

export default async function ({ glee, connection }) {
    let status = 'transit'
    let currentPrice = 100
    const count = 10
    ;(function priceChange(i) {
        if (i === count) {
            status = 'started'
        }else if (i === 1) {
            status = 'finished'
        }else {
            status = 'intransit'
        }
        const date = new Date()
        setTimeout(() => {
            glee.send(new Message({
                channel: '/price',
                connection,
                payload: {time: date.getTime(), price: getPrice(), status}
            }))
            if (--i) priceChange(i)
        }, 1000)
    }(count))

    const between = (min, max) => {
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }

    const getPrice = () => {
        const HighOrLow = between(1,10)
        if (HighOrLow >= 4) {
            currentPrice = currentPrice + (between(0,5) * 10)
        }else {
            currentPrice = currentPrice - (between(0,5) * 10)
        }
        return currentPrice
    }
}


export const lifecycleEvent = 'onServerConnectionOpen'