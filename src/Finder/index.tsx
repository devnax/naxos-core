import React, { ReactElement } from 'react'
import Modal from 'naxui/Modal'
import FinderView from './View'
import { Store, noDispatch } from 'state-range'

export type FinderDataType = {
    title: string;
    subtitle?: string;
    icon?: ReactElement;
    onClick: () => void;
}

type FinderStoreData = FinderDataType & {
    id: string;
    findText: string;
    active: boolean;
}
type FinderStoreMeta = {
    search: string
}
class Finder extends Store<FinderStoreData, FinderStoreMeta> {

    register(id: string, data: FinderDataType) {
        if (!this.findFirst({ id })) {
            this.insert({
                ...data,
                id,
                findText: (data.title + " " + (data.subtitle || "")).trim().toLowerCase(),
                active: false
            })
        }
    }

    deregister(id: string) {
        this.delete({ id })
    }

    getFoundedItems() {
        const searchText = this.getMeta("search", "").toLowerCase()
        if (searchText) {
            return this.find({ findText: `$search(${searchText})` })
        }
        return []
    }

    setActive(id: string) {
        this.update({ active: false }, { active: true })
        this.update({ active: true }, { id })
    }

    open() {
        Modal.open("OS_FINDER", <FinderView />, {
            transition: "zoomOver",
            rootProps: {
                bgcolor: "transparent",
                width: {
                    xs: "95%",
                    sm: 550
                },
                height: "auto",
                maxHeight: 500,
                p: 0
            }
        })
    }

    close() {
        Modal.close("OS_FINDER")
    }

}


export default new Finder