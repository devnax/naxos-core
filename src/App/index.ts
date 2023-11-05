import { ReactElement } from 'react';
import { Store } from 'state-range'
import { CommandType } from '../Command';
import { IconButtonProps } from 'naxui/IconButton';


type AppMetaProps = {
    runningApp: string;
}

export type ShortcutKey = {
    key: string;
    command: string;
}


export type AppProps = {
    type?: string;
    id: string;
    name: string;
    placeButtom?: boolean;
    icon: () => ReactElement;
    render?: () => ReactElement;
    appHeader?: () => ReactElement;
    appFooter?: () => ReactElement;
    onClick?: IconButtonProps['onClick'];
    // onClose?: () => void;
    shortcutKeys?: ShortcutKey[];
    commands?: CommandType[]
}

export type AppPropsPrivate = AppProps & {
    running?: boolean
}

class AppFactory extends Store<AppPropsPrivate, AppMetaProps> { }
const factory = new AppFactory()

class App {
    defaultAppType = 'osroot'
    create(props: AppProps) {
        if (factory.findFirst({ id: props.id })) {
            return
        }
        return factory.insert({
            type: this.defaultAppType,
            placeButtom: false,
            shortcutKeys: [],
            ...props,
            running: false
        })
    }

    get(id: string) {
        return factory.findFirst({ id })
    }

    getAllByType(type: string, placeButtom = false) {
        return factory.find({ type, placeButtom })
    }
    run(appId: string) {
        let app = this.get(appId)
        if (app && app.render) {
            factory.update({ running: false }, { running: true, type: app.type })
            factory.update({ running: true }, { id: appId })
        }
    }
    closeAll(type: string) {
        factory.update({ running: false }, { running: true, type })
    }
    getRunningApp(type: string) {
        return factory.findFirst({ type, running: true })
    }
}

export default new App