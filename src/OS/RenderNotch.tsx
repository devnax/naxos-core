import Stack from "naxui/Stack";
import React, { useState } from "react";
import { withStore } from "state-range";
import Notch from "../Handlers/Notch";
import useBlurCss from "naxui/useBlurCss";
import { alpha } from "naxui-manager";
import Divider from "naxui/Divider";
import Transition from "naxui/Transition";
import Menu from "naxui/Menu";
import List from "naxui/List";
import ListItem from "naxui/ListItem";

const NotchItem = ({ notch, divider }) => {
    const { render: Render } = notch
    return (
        <>
            <Transition
                in={notch.open}
                type="zoom"
                easing="easeInOut"
                onFinish={() => {
                    if (!notch.open) {
                        Notch.remove(notch.id)
                    }
                }}
            >
                <Stack
                    height={55}
                    minWidth={250}
                    flex={1}
                    onContextMenu={(e) => {
                        Menu.openContextMenu(e, (
                            <List>
                                <ListItem
                                    onClick={() => {
                                        Menu.close()
                                        Notch.close(notch.id)
                                    }}
                                >Close</ListItem>
                            </List>
                        ))
                    }}
                >
                    <Render />
                </Stack>
            </Transition>

            {divider && <Divider direction={"verticle" as any} />}
        </>
    )
}

const RenderNotch = () => {
    const notches = Notch.getAll()
    const blurcss = useBlurCss(20)

    return (
        <Stack
            flexRow
            gap={12}
            alignItems="center"
            justifyContent="flex-end"
            bgcolor={t => alpha(t.colors.paper.light, .7)}
            {...blurcss}

            sx={{
                '& > div': {
                    radius: notches.length > 1 ? "8px 8px 0 0" : "",
                },
                '& > div:first-child': {
                    radius: notches.length > 1 ? "0 8px 0 0" : "",
                },
                '& > div:last-child': {
                    radius: notches.length > 1 ? "8px 0 0 0" : "",
                }
            }}
        >
            {
                notches.map((notch, idx) => {
                    return (
                        <NotchItem key={notch._id} notch={notch} divider={!!notches[idx + 1]} />
                    )
                })
            }
        </Stack>
    )
}

export default withStore(RenderNotch)