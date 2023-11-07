import React, { Fragment, isValidElement } from "react";
import { Store } from "state-range";

type PropsType = { [key: string]: any }
type CallbackType = (props?: PropsType) => any;

type ListenerType = {
    name: string;
    callback: CallbackType
}
class Factory extends Store<ListenerType> { }
const factory = new Factory


class Listener {

    on(name: string, callback: CallbackType) {
        const has = factory.find({ name }).find(i => i.callback.toString() == callback.toString())
        if (has) return
        factory.insert({ name, callback })
    }

    listen(name: string, props?: PropsType) {
        const items = factory.find({ name })
        const vals: any[] = []
        for (let item of items) {
            const val = item.callback(props)
            if (isValidElement(val)) {
                vals.push(<Fragment key={item._id}>{val}</Fragment>)
            } else {
                vals.push(val)
            }
        }
        return vals.length ? vals : undefined
    }

    off(name: string, callback: CallbackType) {
        const items = factory.find({ name })
        items.forEach((item) => {
            if (item.callback.toString() === callback.toString()) {
                factory.delete({ _id: item._id })
            }
        })
    }
}


export default new Listener