/* eslint-disable no-undef */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//@ts-ignore
import { Message } from '@asyncapi/glee';
export default function ({ glee, connection }) {
    return __awaiter(this, void 0, void 0, function* () {
        (function myLoop(i) {
            setTimeout(() => {
                glee.send(new Message({
                    channel: '/index',
                    connection,
                    payload: { time: 1, price: 200 }
                }));
                if (--i)
                    myLoop(i);
            }, 1000);
        }(100));
    });
}
;
export const lifecycleEvent = 'onServerConnectionOpen';
