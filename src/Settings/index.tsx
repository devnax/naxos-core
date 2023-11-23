import React, { useMemo } from "react";
import Stack from "naxui/Stack";
import GridContainer from "naxui/GridContainer";
import GridItem from "naxui/GridItem";
import List from "naxui/List";
import ViewBox from "naxui/ViewBox";
import ListItem from "naxui/ListItem";
import Input from "naxui/Input";
import Transition from "naxui/Transition";
import IconSearch from 'naxui-icons/round/Search';
import { noDispatch, withStore } from "state-range";
import Setting from "./Setting";

const Render = withStore(() => {
    const activeItem = Setting.getActive()
    const { render, state } = activeItem as any
    return render(state)
})

const SettingView = () => {

    useMemo(() => {
        noDispatch(() => {
            const all = Setting.getAll()
            if (!Setting.getActive() && all.length) {
                Setting.setActive(all[0].id)
            }
        })

    }, [])

    const settings = Setting.getAllItems()
    const { id: activeId } = Setting.getActive() || {}


    return (
        <Transition >
            <Stack bgcolor="color.paper" height="100%">
                <GridContainer height="100%">
                    <GridItem bgcolor="color.paper.light" xs={12} sm={4} md={4} height="100%" flexBox flexRow justifyContent="flex-end">
                        <ViewBox
                            width={250}
                            p={1}
                            header={
                                <Stack mb={3} mt={1}>
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
                            }
                        >
                            <List>
                                {
                                    settings.map(s => {
                                        return (
                                            <ListItem
                                                key={s.id}
                                                p={.6}
                                                selected={activeId === s.id}
                                                startIcon={s.icon}
                                                onClick={() => Setting.setActive(s.id)}
                                                transition={0}

                                            >{s.label}</ListItem>
                                        )
                                    })
                                }
                            </List>
                        </ViewBox>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={8} height="100%">
                        <ViewBox flex={1} maxWidth={500} p={1} px={2}>
                            {activeId && <Render />}
                        </ViewBox>
                    </GridItem>
                </GridContainer>
            </Stack>
        </Transition>
    )
}

export default withStore(SettingView)