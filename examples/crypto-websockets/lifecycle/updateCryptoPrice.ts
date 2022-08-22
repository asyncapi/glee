/* eslint-disable no-undef */

//@ts-ignore
import { Message } from '@asyncapi/glee';

export default async function ({ glee, connection }) {
    ;(function myLoop(i) {
        setTimeout(() => {
            glee.send(new Message({
                channel: '/index',
                connection,
                payload: {time: '1', price: '200'}
            }))
            if (--i) myLoop(i)
        }, 1000)
    }(100))
};


export const lifecycleEvent = 'onServerConnectionOpen'