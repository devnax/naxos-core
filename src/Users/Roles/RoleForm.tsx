import Input from "naxui/Input";
import Label from "naxui/Label";
import Stack from "naxui/Stack";
import Select from "naxui/Select";
import Option from "naxui/Option";
import React, { useRef } from "react";
import Text from "naxui/Text";
import Button from "naxui/Button";
import Modal from "naxui/Modal";

export type RoleFormProps = {
    editId?: number;
}

const RoleForm = ({ editId }: RoleFormProps) => {
    return (
        <Stack gap={16} p={1}  >
            <Stack gap={5} mb={2}>
                <Text variant="h6">{editId ? "Update Role" : "Add New Role"}</Text>
            </Stack>
            <Stack gap={5}>
                <Label>Name</Label>
                <Input />
            </Stack>
            <Stack gap={5} >
                <Label>Status</Label>
                <Select

                >
                    <Option value="active">Active</Option>
                    <Option value="deactive">Deactive</Option>
                </Select>
            </Stack>

            <Stack gap={5} flexRow justifyContent="space-between">
                <Stack></Stack>
                <Stack flexRow gap={8}>
                    <Button
                        color="paper"
                        variant="outlined"
                        onClick={() => {
                            Modal.close("role-form")
                        }}
                    >CANCEL</Button>
                    <Button color="primary">{editId ? "UPDATE" : "CREATE"}</Button>
                </Stack>
            </Stack>

        </Stack>
    )
}


export default RoleForm