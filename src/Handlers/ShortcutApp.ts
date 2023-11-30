import { ReactElement } from 'react';
import { Store } from 'state-range'
import { IconButtonProps } from 'naxui/IconButton';
import Window from './Window';

type ShortcutAppMetaProps = {
    activeApp: string | null;
}

export type ShortcutKey = {
    key: string;
    listener: string;
    props?: any
}

export type ShortcutAppProps = {
    id: string;
    name: string;
    icon: ReactElement;
    render: () => ReactElement;
    shortcutKeys?: ShortcutKey[];
    onContextMenu?: () => ReactElement;
}

class ShortcutApp extends Store<ShortcutAppProps, ShortcutAppMetaProps> {
    create(props: ShortcutAppProps) {
        if (this.findFirst({ id: props.id })) {
            return
        }
        return this.insert({
            shortcutKeys: [],
            ...props
        })
    }

    get(id: string) {
        return this.findFirst({ id })
    }

    getActiveApp() {
        const id = this.getMeta("activeApp")
        if (id) {
            return this.get(id)
        }
    }

    run(id: string) {
        const app = this.findFirst({ id })
        if (app) {
            Window.deactiveAll()
            this.setMeta("activeApp", id)
        }
    }

    exit() {
        const id = this.getMeta("activeApp")
        if (id) {
            this.setMeta("activeApp", null)
        }
    }
}

export default new ShortcutApp