import CONSTANCE from "./CONSTANCE"
const shortcuts = [
    {
        key: "mod+right",
        listener: CONSTANCE.OS_WINDOW_NEXT,
        props: {}
    },
    {
        key: "mod+left",
        listener: CONSTANCE.OS_WINDOW_PREV,
        props: {}
    },
    {
        key: "mod+up",
        listener: CONSTANCE.OS_WINDOW_PANEL_TOGGLE,
        props: {}
    },
    // {
    //     key: "mod+r",
    //     listener: CONSTANCE.OS_WINDOW_RELOAD,
    //     props: {}
    // }
]


export default shortcuts