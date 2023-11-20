import { ReactElement } from 'react';
import { Store } from 'state-range'
import { IconButtonProps } from 'naxui/IconButton';

type AppMetaProps = {
}

export type ShortcutKey = {
    key: string;
    listener: string;
    props?: any
}

export type AppProps = {
    id: string;
    name: string;
    icon: () => ReactElement;
    render?: () => ReactElement;
    onClick?: IconButtonProps['onClick'];
    shortcutKeys?: ShortcutKey[];
    onContextMenu?: () => ReactElement;
}

class App extends Store<AppProps, AppMetaProps> {
    create(props: AppProps) {
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

    getApps() {
        return this.getAll()
    }
}

export default new App