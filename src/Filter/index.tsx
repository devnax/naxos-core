import React, { ReactElement } from "react";
import { Store } from "state-range";

export type FilterTypes = {
    objectKey: string;
    key: string;
    callback: () => ReactElement
}

class FilterFactory extends Store<FilterTypes> { }
const factory = new FilterFactory

class Filter {

    add(objectKey: string, key: string, callback: () => ReactElement) {
        if (!factory.findFirst({ objectKey, key })) {
            factory.insert({
                objectKey,
                key,
                callback
            })
        }
    }

    renderObject(objectKey: string) {
        let items = factory.find({ objectKey })
        return items.map((item, idx) => {
            let Component = item.callback
            return <Component key={item.key + idx} />
        })
    }

    render(objectKey: string, key: string) {
        let item = factory.findFirst({ objectKey, key })
        if (item) {
            let Component = item.callback
            return <Component />
        }
    }

    remove(objectKey: string, key: string) {
        factory.delete({ objectKey, key })
    }

}

export default new Filter