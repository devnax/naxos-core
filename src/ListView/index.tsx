import React, { ReactElement, useMemo, useState } from "react";
import ViewBox, { ViewBoxProps } from 'naxui/ViewBox'
import Stack, { StackProps } from 'naxui/Stack'
import { ListItemProps } from "naxui/ListItem";
import Sidebar from "./Sidebar";
import { useMediaScreen, useWindowResize } from "naxui-manager";
import IconButton from "naxui/IconButton";
import IconMenu from 'naxui-icons/round/Menu'
import Text from "naxui/Text";
import Drawer from "naxui/Drawer";

export type ListViewListItemProps = {
    value: string | number;
    label: string | number;
    render: () => ReactElement;
    startIcon?: ListItemProps['startIcon'];
    endIcon?: ListItemProps['endIcon'];
}

export type ListViewProps = Omit<StackProps, "list" | "title"> & {
    list: ListViewListItemProps[];
    title?: string;
    centerMode?: boolean;
    sidebarPlacement?: "left" | "right";
    sidebarSize?: number;
    value?: string | number;
    onChange?: (value: string | number) => void;
    nabvarRightContent?: ReactElement;
    sidebarProps?: Omit<ViewBoxProps, "children">;
    contentProps?: Omit<ViewBoxProps, "children">;
    listItemProps?: Omit<ListItemProps, 'children' | "selected" | "startIcon" | "endIcon">
}

type StateType = {
    selectedItem: ListViewListItemProps;
}

export type ComProps = ListViewProps & {
    state: StateType;
    setState: (_state: Partial<StateType>) => void;
}

const ListView = (props: ListViewProps) => {
    let { value, onChange, list, title, sidebarSize, centerMode, sidebarProps, contentProps, sidebarPlacement, nabvarRightContent, listItemProps, ...stackProps } = props
    let [_value, _onChange] = useState<string | number>(list[0]?.value)
    value ??= _value
    onChange ??= (v: any) => _onChange(v)
    sidebarSize ??= 280

    const Render = useMemo(() => {
        const find = list.find(l => l.value === value)
        if (find) return find.render
        return () => <></>
    }, [value])

    const mediaScreen = useMediaScreen()
    const isMobile = mediaScreen.isDown('md')
    centerMode = isMobile ? false : centerMode
    let centerModWidth = sidebarSize
    if (centerMode) {
        if (mediaScreen.isUp(1170)) {
            centerModWidth = 500
        } else if (mediaScreen.isUp(1000)) {
            centerModWidth = 400
        }
    }

    useWindowResize(() => {
        Drawer.close()
    })

    return (
        <Stack
            height="100%"
            {...stackProps}
            flexDirection={sidebarPlacement === "right" ? "row-reverse" : "row"}
        >
            {!isMobile &&
                <Stack
                    width={centerModWidth}
                    height="100%"
                    flexRow
                    justifyContent="flex-end"
                >
                    <Sidebar
                        {...props}
                        centerMode={centerMode}
                        value={value}
                        onChange={onChange}
                        sidebarSize={sidebarSize}
                    />
                </Stack>
            }
            <ViewBox
                flex={1}
                {...contentProps}
                header={(
                    <>
                        {
                            isMobile && <Stack
                                flexRow
                                height={55}
                                borderBottom={1}
                                alignItems="center"
                                px={1}
                                gap={8}
                            >
                                <Stack
                                    flexRow
                                    alignItems="center"
                                    gap={8}
                                >
                                    <IconButton
                                        color="paper"
                                        onClick={() => {
                                            Drawer.open(<Sidebar
                                                {...props}
                                                value={value}
                                                onChange={onChange}
                                            />, {
                                                rootProps: {
                                                    sx: {
                                                        "& .$prefix-drawer-content": {
                                                            width: sidebarSize
                                                        }
                                                    }
                                                }
                                            })
                                        }}
                                    >
                                        <IconMenu />
                                    </IconButton>
                                    {title && <Text variant="h6" >{title}</Text>}
                                </Stack>
                                <Stack>
                                    {nabvarRightContent}
                                </Stack>
                            </Stack>
                        }
                    </>
                )}
            >
                <Render />
            </ViewBox>
        </Stack>
    )
}


export default ListView