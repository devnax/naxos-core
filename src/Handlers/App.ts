import { ReactElement } from 'react';
import { Store } from 'state-range'
import { IconButtonProps } from 'naxui/IconButton';
import Window from './Window';
import Screen from './Screen';

type AppMetaProps = {
    runningApp: string;
}

export type ShortcutKey = {
    key: string;
    listener: string;
    props?: any
}


export type AppProps = {
    type?: string;
    id: string;
    name: string;
    icon: () => ReactElement;
    render?: () => ReactElement;
    onClick?: IconButtonProps['onClick'];
    shortcutKeys?: ShortcutKey[];
    onContextMenu?: () => ReactElement;
}

class AppFactory extends Store<AppProps, AppMetaProps> { }
const factory = new AppFactory()

class App {
    defaultAppType = 'osroot'
    create(props: AppProps) {
        if (factory.findFirst({ id: props.id })) {
            return
        }
        return factory.insert({
            type: this.defaultAppType,
            shortcutKeys: [],
            ...props
        })
    }

    get(id: string) {
        return factory.findFirst({ id })
    }

    getAllByType(type: string) {
        return factory.find({ type })
    }

    getActiveApp(type: string) {
        const win = Window.getActive(type)
        if (win) {
            const screen = Screen.getActive(win._id)
            if (screen) {
                return factory.findFirst({ id: screen.appId })
            }
        }
    }
}

export default new App