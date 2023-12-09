import React, { useMemo } from "react";
import Stack from "naxui/Stack";
import Input from "naxui/Input";
import Transition from "naxui/Transition";
import IconSearch from 'naxui-icons/round/Search';
import { noDispatch, withStore } from "state-range";
import Setting from "./Setting";
import ListView from "../ListView";

const Render = withStore(() => {
    const activeItem = Setting.getActive()
    if (!activeItem) return <></>
    const { render, state } = activeItem
    return render(state)
})

const SettingView = () => {
    const settings = Setting.getAllItems()
    let activeItem = Setting.getActive()
    useMemo(() => {
        noDispatch(() => {
            const all = Setting.getAll()
            if (!Setting.getActive() && all.length) {
                Setting.setActive(all[0].id)
            }
        })
    }, [])

    return (
        <Transition>
            <ListView
                value={activeItem?.id}
                onChange={(val) => Setting.setActive(val)}
                centerMode
                sidebarSize={250}
                list={settings.map(s => ({
                    label: s.label,
                    value: s.id,
                    startIcon: s.icon,
                    render: () => <Render />,
                }))}
                listItemProps={{
                    p: .6
                }}
                contentProps={{
                    p: 2,
                    maxWidth: {
                        lg: 600
                    }
                }}
                sidebarProps={{
                    header: <Stack mb={3} mt={1}>
                        <Input
                            p={.8}
                            placeholder="Search"
                            fontSize="fontsize.button"
                            startIcon={<IconSearch />}
                            containerProps={{
                                radius: .6
                            }}
                            value={Setting.getMeta("searchText")}
                            onChange={(e: any) => {
                                Setting.setMeta("searchText", e.target.value)
                            }}
                        />
                    </Stack>
                }}
            />
        </Transition>
    )
}

export default withStore(SettingView)