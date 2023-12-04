import React, { useMemo } from "react";
import Stack from "naxui/Stack";
import GridContainer from "naxui/GridContainer";
import GridItem from "naxui/GridItem";
import List from "naxui/List";
import ListItem from "naxui/ListItem";
import Text from "naxui/Text";
import Transition from "naxui/Transition";
import { withStore } from "state-range";
import UsersTable from "./UsersTable";


const UsersView = () => {

    return (
        <Transition >
            <Stack bgcolor="color.paper" height="100%">
                <GridContainer height="100%">
                    <GridItem bgcolor="color.paper.light" borderRight={1} xs={12} sm={2} md={2.5} height="100%" >
                        <Stack p={1} gap={16}>
                            <Text fontWeight={600}>User & Role</Text>
                            <List >
                                <ListItem
                                    py={.8}
                                    transition={0}
                                    selected
                                >
                                    Users
                                </ListItem>
                                <ListItem
                                    py={.8}
                                    transition={0}
                                >
                                    Roles
                                </ListItem>
                            </List>
                        </Stack>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={9.5} height="100%" bgcolor="color.paper.light" >
                        <UsersTable />
                    </GridItem>
                </GridContainer>
            </Stack>
        </Transition>
    )
}

export default withStore(UsersView)