import { ReactElement } from 'react';
import { Store } from 'state-range'
import { IconButtonProps } from 'naxui/IconButton';
import { ContextMenyType } from './ContextMenu';
import Finder from '../Finder';
import Window from './Window';

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
    icon: ReactElement;
    render?: () => ReactElement;
    shortcutKeys?: ShortcutKey[];
    contextMenu?: ContextMenyType[];
    iconContextMenu?: ContextMenyType[];

    onRun?: () => void;
    onClose?: () => void;
    onActive?: () => void;
    onDeactive?: () => void;

    onVisible?: (isVisible: boolean) => void;
}

class App extends Store<AppProps, AppMetaProps> {
    create(props: AppProps) {
        if (this.findFirst({ id: props.id })) {
            return
        }
        Finder.register(props.id, {
            title: props.name,
            subtitle: "Application",
            icon: props.icon,
            onClick: () => {
                Window.setActiveApp(props.id)
            }
        })
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