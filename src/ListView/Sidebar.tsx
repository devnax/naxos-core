import ViewBox from "naxui/ViewBox";
import List from "naxui/List";
import ListItem from "naxui/ListItem";
import React from "react";
import { ComProps, ListViewProps } from ".";
import Text from "naxui/Text";
import Drawer from "naxui/Drawer";


const Sidebar = ({ onChange, value, list, title, sidebarSize, sidebarProps, sidebarPlacement, listItemProps }: ListViewProps) => {
    return (
        <ViewBox
            width={sidebarSize}
            height="100%"
            borderRight={sidebarPlacement === 'right' ? 0 : 1}
            borderLeft={sidebarPlacement === 'right' ? 1 : 0}
            p={1}
            {...sidebarProps}
        >
            {title && <Text variant="h6" mb={2}>{title}</Text>}
            <List >
                {
                    list.map((item, idx) => {
                        return (
                            <ListItem
                                key={"listviewListItem" + item.value}
                                {...listItemProps}
                                startIcon={item.startIcon}
                                endIcon={item.endIcon}
                                selected={value === item.value}
                                onClick={() => {
                                    onChange && onChange(item.value)
                                    Drawer.close()
                                }}
                            >
                                {item.label}
                            </ListItem>
                        )
                    })
                }
            </List>
        </ViewBox>
    )
}

export default Sidebar