import React, { ReactElement } from 'react';
import Menu from 'naxui/Menu'
import List from 'naxui/List'
import ListItem from 'naxui/ListItem'
import Divider from 'naxui/Divider';

export type ContextMenyType = {
    label: string;
    onClick: () => void;
    icon?: ReactElement;
    divider?: boolean;
}

const Item = ({ label, onClick, divider, icon }: ContextMenyType) => {
    return (
        <>
            {divider && <Divider />}
            <ListItem
                startIcon={icon}
                p={.4}
                px={1}
                onClick={() => {
                    Menu.close()
                    onClick()
                }}
            >{label}</ListItem>
        </>
    )
}

const ContextMenu = (event: React.MouseEvent<any, MouseEvent>, items: ContextMenyType[]) => {
    event.preventDefault()
    Menu.openContextMenu(event, (
        <List
            minWidth={150}
            p={.6}
            sx={{
                "& svg": {
                    fontSize: "20px!important"
                }
            }}
        >
            {
                items.map((item, idx) => <Item key={"contextmenu" + idx} {...item} />)
            }

        </List>
    ), {
        placement: "right-top",
        transitionProps: {
        }
    })
}

export default ContextMenu