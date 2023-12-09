import { ReactElement } from "react";
import { Store } from "state-range";

type RenderType = () => ReactElement
type NotchProps = {
    id: string;
    open: boolean;
    render: RenderType;
}

class Notch extends Store<NotchProps>{
    push(id: string, render: RenderType) {
        if (this.findFirst({ id })) return;
        this.insert({
            id,
            render,
            open: true
        })
    }

    close(id: string) {
        this.update({ open: false }, { id })
    }

    remove(id: string) {
        this.delete({ id })
    }
}


export default new Notch