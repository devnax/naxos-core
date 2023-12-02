import React from "react";
import { Store } from "state-range";
import Drawer from 'naxui/Drawer'
import Toast from 'naxui/Toast'
import NotificatioView, { NotificationItem } from "./View";

type ButtonsType = {
    text: string;
    onClick: (data: NotificatoinProps['data']) => void;
    filled?: boolean;
}

export type NotificatoinProps = {
    type: string;
    id: number;
    content: string; // html can be include
    time: string;
    image: string;
    data: { [key: string]: string | number };
    view: boolean;
    read: boolean;
}

export type NotificationRegisteredType = {
    onClick?: (data: NotificatoinProps['data']) => void;
    buttons?: ButtonsType[]
}

type RegisterCallback = (data: NotificatoinProps['data']) => NotificationRegisteredType

class Notification extends Store<NotificatoinProps> {
    registered_props = new Map<string, RegisterCallback>()

    register(type: string, callback: RegisterCallback) {
        this.registered_props.set(type, (d) => {
            return {
                buttons: [],
                ...callback(d)
            }
        })
    }

    getRegister(type: string) {
        return this.registered_props.get(type)
    }

    push(type: string, info: Omit<NotificatoinProps, "type" | "view" | "read">) {
        if (!this.registered_props.has(type) || this.findFirst({ id: info.id })) return
        this.insert({
            data: {},
            ...info as any,
            type,
            view: false,
            read: false,
        })

        Toast.open(info.id.toString(), <NotificationItem id={info.id} />)
    }

    open() {
        const unviewItems = this.find({ view: false })
        unviewItems.forEach(item => {
            Toast.close(item.id.toString())
        })
        this.update({ view: true }, { view: false })
        Drawer.open(<NotificatioView />, {
            placement: "right",
            width: 350,
        } as any)
    }
}


export default new Notification