import React from "react";
import { ReactElement } from "react";
import { Store } from "state-range";
import Drawer from 'naxui/Drawer'
import ShareView from "./ShareView";

export type ShareProps = {
    id: string;
    type: "image" | "video" | "audio" | "doc" | "pdf" | "template";
    name: string;
    icon: ReactElement;
    onReceive: (data: any) => void;
}

export type ShareMetaProps = {
    current: {
        type: ShareProps['type'];
        data: any
    }
}


class Share extends Store<ShareProps, ShareMetaProps> {
    assign(props: ShareProps) {
        if (this.findFirst({ id: props.id })) return
        this.insert(props)
    }

    share(type: ShareProps['type'], data: any) {
        this.setMeta("current", { type, data })
    }

    send(id: ShareProps['id'], data: any) {
        const item = this.findFirst({ id })
        if (item) {
            item.onReceive(data)
        }
    }

    open() {
        Drawer.open(<ShareView />, {
            placement: "bottom",
            size: 160
        })
    }

    close() {

    }
}

export default new Share