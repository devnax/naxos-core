import { Store } from "state-range";

export type PermissionStateProps = {
    key: string;
    value: string;
    title: string;
    subtitle: string;
}


class PermissionFactory extends Store<PermissionStateProps, Record<string, string>> { }

export class PermissionState {
    factory: PermissionFactory;
    constructor() {
        this.factory = new PermissionFactory
    }

    add(props: PermissionStateProps) {
        this.factory.insert(props)
    }

    setValue(key: string, value: string) {
        this.factory.setMeta(key, value)
    }

    getValue(key: string) {
        return this.factory.getMeta(key)
    }

    deleteValue(key: string) {
        this.factory.deleteMeta(key)
    }

    toggleValue(key: string, value: string) {
        const val = this.factory.getMeta(key)
        if (val === value) {
            this.deleteValue(key)
        } else {
            this.setValue(key, value)
        }
    }

    getAll() {
        return this.factory.getAll()
    }

    remove(key: string) {
        this.factory.delete({ key })
    }

    clear() {
        this.factory.deleteAll()
    }
}

export default PermissionState