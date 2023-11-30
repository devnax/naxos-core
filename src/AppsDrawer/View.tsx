import React from "react"
import Stack from 'naxui/Stack'
import Transition from 'naxui/Transition'
import Scrollbar from 'naxui/Scrollbar'
import { withStore } from "state-range"
import App from '../Handlers/App'
import AppCard from "./AppCard"

const AppsDrawerView = ({ open }) => {
    const apps = App.getApps()
    return (
        <Scrollbar
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Transition in={open} type="zoom">
                <Stack
                    flexRow
                    flexWrap="wrap"
                    gap={16}
                >

                    {
                        apps.map(app => {
                            return (
                                <AppCard key={app._id} icon={app.icon} appId={app.id} />
                            )
                        })
                    }
                </Stack>
            </Transition>
        </Scrollbar>
    )
}

export default withStore(AppsDrawerView)