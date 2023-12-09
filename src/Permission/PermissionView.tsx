import React, { useMemo } from "react";
import Stack from "naxui/Stack";
import Input from "naxui/Input";
import Transition from "naxui/Transition";
import IconSearch from 'naxui-icons/round/Search';
import { noDispatch, withStore } from "state-range";
import Permission from ".";
import ListView from "../ListView";
import Text from "naxui/Text";
import Checkbox from "naxui/Checkbox";
import ViewBox from "naxui/ViewBox";
import Button from "naxui/Button";

const Render = withStore(() => {
    const activeItem = Permission.getActive()
    if (!activeItem) return <></>
    const { state } = activeItem
    const items = state.getAll()

    return <Stack gap={8}>
        <Text variant="h6" mb={3}>{activeItem.label} Permissions</Text>
        {
            items.map((item) => {
                const value = state.getValue(item.key)
                const checked = item.value === value

                return (
                    <Stack
                        key={item._id}
                        radius={1}
                        border={1}
                        p={2}
                        py={1}
                        userSelect="none"
                        flexRow
                        alignItems="center"
                        gap={16}
                        hover={{
                            borderColor: "color.primary"
                        }}
                        cursor="pointer"
                        onClick={() => {
                            state.toggleValue(item.key, item.value)
                        }}
                    >
                        <Checkbox checked={checked} />
                        <Stack flex={1}>
                            <Text fontWeight={600}>{item.title}</Text>
                            {
                                item.subtitle && <Text variant="subtext" fontSize="fontsize.button">{item.subtitle}</Text>
                            }
                        </Stack>
                    </Stack>
                )
            })
        }
    </Stack>
})

const PermissionView = () => {
    const Permissions = Permission.getAllItems()
    let activeItem = Permission.getActive()
    useMemo(() => {
        noDispatch(() => {
            const all = Permission.getAll()
            if (!Permission.getActive() && all.length) {
                Permission.setActive(all[0].id)
            }
        })
    }, [])

    return (
        <Transition>
            <ViewBox
                height="100%"
                footer={(
                    <Stack
                        px={2}
                        height={60}
                        bgcolor="color.paper"
                        flexRow
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Stack></Stack>
                        <Stack
                            flexRow
                            gap={8}
                        >
                            <Button
                                variant="outlined"
                                color='paper'
                                onClick={() => {
                                    Permission.close()
                                }}
                            >Cancel</Button>
                            <Button>Save</Button>
                        </Stack>
                    </Stack>
                )}
            >
                <ListView
                    bgcolor="color.paper.light"
                    value={activeItem?.id}
                    onChange={(val) => Permission.setActive(val)}
                    centerMode
                    sidebarSize={250}
                    list={Permissions.map(s => ({
                        label: s.label,
                        value: s.id,
                        render: () => <Render />,
                    }))}

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
                                value={Permission.getMeta("searchText")}
                                onChange={(e: any) => {
                                    Permission.setMeta("searchText", e.target.value)
                                }}
                            />
                        </Stack>
                    }}
                />
            </ViewBox>
        </Transition>
    )
}

export default withStore(PermissionView)