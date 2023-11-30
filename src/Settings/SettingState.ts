import { Store, noDispatch } from "state-range";

export type DataType = Record<string, string | number>
class SettingFactory extends Store<any, DataType> { }

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

    getData() {
        return this.factory.getAllMeta()
    }

    setData(data: DataType) {
        noDispatch(() => {
            Object.keys(data).map(k => this.factory.setMeta(k, data[k]))
        })
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