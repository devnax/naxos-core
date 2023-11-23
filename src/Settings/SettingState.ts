import { Store } from "state-range";

type SettingStateType = {
    [key: string]: string | number
}

class SettingFactory extends Store<any, SettingStateType> { }

export class SettingState {
    factory: SettingFactory;
    constructor() {
        this.factory = new SettingFactory
    }

    set(key: string, value: string | number) {
        this.factory.setMeta(key, value)
    }

    get(key: string) {
        return this.factory.getMeta(key)
    }

    getAll() {
        return this.factory.getAllMeta()
    }

    remove(key: string) {
        this.factory.deleteMeta(key)
    }

    clear() {
        this.factory.clearMeta()
    }
}

export default SettingState