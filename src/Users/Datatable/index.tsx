'use client'
import React, { ReactElement, useState } from 'react'
import { TableColumnProps } from 'naxui/TableCell'
import { IconButtonProps } from 'naxui/IconButton'
import Header from './Header'
import Table from 'naxui/Table'
import TableBody from 'naxui/TableBody'
import Row from './Row'

export type ColumnType = (Omit<TableColumnProps, "children"> & { label: string, field?: string })

export type DataTableDefaultRow = { [key: string | number]: any }

export type DataTableRow = {
    selected?: boolean
}

export type RowActionType = Omit<IconButtonProps, "children"> & {
    label: string;
    icon: ReactElement;
}

export type DatatableProps = {
    rows: DataTableDefaultRow[];
    columns: ColumnType[];
    rowAction?: (props: { row: DataTableDefaultRow | null, state: State }) => RowActionType[];
    renderRow?: (row: DataTableDefaultRow, state: State) => DataTableDefaultRow;
    disableRow?: (row: DataTableDefaultRow, state: State) => boolean | void;
    getState?: (state: State) => void;
}

export type State = {
    selectedIds: number[];
    selectAll: boolean;
}

export type DatatablePropsWithState = DatatableProps & {
    state: State,
    update: (state: Partial<State>) => void;
}

const DataTable = (props: DatatableProps) => {
    let { rows, renderRow, getState } = props
    const [state, setState] = useState<State>({
        selectedIds: [],
        selectAll: false,
    })

    const update = (s: Partial<State>) => {
        setState(o => {
            let ns = { ...o, ...s }
            getState && getState(ns)
            return ns
        })
    }

    return (
        <Table
            width="100%"
            dense
            sx={{
                '& thead': {
                    position: "sticky",
                    top: 0,
                    bgcolor: "color.paper.light",
                    zIndex: 1
                }
            }}
        >
            <Header {...props} update={update} state={state} />
            <TableBody
                sx={{
                    '& tr:last-child td': {
                        borderBottom: 0
                    }
                }}
            >
                {
                    rows?.map((row, idx) => {
                        let _row = renderRow ? renderRow({ ...row }, state) : row
                        return <Row
                            key={row.id + idx}
                            rawRow={row}
                            row={_row}
                            {...props}
                            update={update}
                            state={state}
                        />
                    })
                }
            </TableBody>
        </Table>
    )
}


export default DataTable