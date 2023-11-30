import { ReactElement } from "react";
import { Store } from "state-range";
import SettingState, { DataType } from "./SettingState";

export type SettingType = {
    id: string;
    icon: ReactElement;
    label: string;
    render: (state: SettingState) => ReactElement;
}


type SettingTypePrivate = SettingType & {
    state: SettingState;
    active: boolean;
}

type SettngMetaType = {
    searchText: string;
}



class Setting extends Store<SettingTypePrivate, SettngMetaType> {
    create(props: SettingType) {
        if (this.findFirst({ id: props.id })) return
        let state = new SettingState
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

    getStates() {
        const items = this.getAll()
        let state: Record<string, DataType> = {}
        for (let item of items) {
            state[item.id] = item.state.getData()
        }
    }

    setStates(states: Record<string, DataType>) {
        for (let id in states) {
            const item = this.findFirst({ id })
            if (item) {
                item.state.setData(states[id])
            }
        }
    }
}

export default new Setting