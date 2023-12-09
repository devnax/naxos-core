import React from "react";
import { Store } from "state-range";
import PermissionState from "./PermissionState";
import Layer from "naxui/Layer";
import PermissionView from './PermissionView'

export type PermissionType = {
    id: string;
    label: string;
}


type PermissionTypePrivate = PermissionType & {
    state: PermissionState;
    active: boolean;
}

type PermissionMetaType = {
    searchText: string;
}


class Permission extends Store<PermissionTypePrivate, PermissionMetaType> {
    create(props: PermissionType) {
        const has = this.findFirst({ id: props.id })
        if (has) return has.state
        let state = new PermissionState
        this.insert({
            ...props,
            state,
            active: false
        })
        return state
    }

    getAllItems() {
        const searchText = this.getMeta("searchText")
        if (searchText) {
            return this.find({ label: `$search(${searchText})` })
        }
        return this.getAll()
    }

    getActive() {
        return this.findFirst({ active: true })
    }

    setActive(id: string) {
        this.update({ active: false }, { active: true })
        this.update({ active: true }, { id })
    }

    getState(id: string) {
        const item = this.findFirst({ id })
        if (item) {
            return item.state
        }
    }

    open() {
        Layer.open("os-permission", <PermissionView />, {
        })
    }

    close() {
        Layer.close("os-permission")
    }
}

export default new Permission