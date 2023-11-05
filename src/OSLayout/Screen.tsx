import React from "react";
import { OSLayoutProps } from ".";
import App from "../App";
import ViewBox from "naxui/ViewBox";

const Screen = ({ appType }: OSLayoutProps) => {
    let app = App.getRunningApp(appType)
    let Render: any = () => <></>
    let AppHeader: any = () => <></>
    let AppFooter: any = () => <></>

    if (app) {
        if (app.render) Render = app.render
        if (app.appHeader) AppHeader = app.appHeader
        if (app.appFooter) AppFooter = app.appFooter
    }

    return (
        <ViewBox
            width="100%"
            height="100%"
            header={<AppHeader />}
            footer={<AppFooter />}
        >
            <Render />
        </ViewBox>
    )
}

export default Screen