import React, { Fragment, isValidElement } from "react";
import { Store } from "state-range";

type PropsType = { [key: string]: any }
type CallbackType = (props?: PropsType) => any;

type ListenerType = {
    name: string;
    callback: CallbackType;
    single?: boolean;
}
class Factory extends Store<ListenerType> { }

class Listener {
    factories: { [key: string]: Factory } = {}

    on(name: string, callback: CallbackType, single = false) {
        let factory = this.factories[name]
        if (!factory) {
            this.factories[name] = new Factory
            factory = this.factories[name]
        }

        const has = factory.find({ name }).find(i => i.callback.toString() == callback.toString())
        if (has) return
        let isSingle = factory.findFirst({ name, single: true })

        if (isSingle) return
        factory.insert({ name, callback, single })
    }

    listen(name: string, props?: PropsType) {
        let factory = this.factories[name]
        if (!factory) return
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
        let factory = this.factories[name]
        if (!factory) return
        const items = factory.find({ name })
        items.forEach((item) => {
            if (item.callback.toString() === callback.toString()) {
                factory.delete({ _id: item._id })
            }
        })
    }
}


export default new Listener