import React from "react";
import Transition from "naxui/Transition";
import { withStore } from "state-range";
import UsersTable from "./UsersTable";
import ListView from "../ListView";
import RoleTable from "./Roles";
import IconUser from 'naxui-icons/round/People'
import IconRole from 'naxui-icons/round/VerifiedUser'

const UsersView = () => {
    return (
        <Transition>
            <ListView

                title="User & Role"
                sidebarSize={270}
                list={[
                    {
                        label: "Users",
                        value: "users",
                        render: UsersTable,
                        startIcon: <IconUser />
                    },
                    {
                        label: "Roles",
                        value: "Roles",
                        render: RoleTable,
                        startIcon: <IconRole />
                    }
                ]}


            />
        </Transition>
    )
}

export default withStore(UsersView)