import React, { useEffect } from "react";
import ViewBox from "naxui/ViewBox";
import List from "naxui/List";
import ListItem from "naxui/ListItem";
import Text from "naxui/Text";
import Input from "naxui/Input";
import SearchIcon from 'naxui-icons/round/Search'
import { withStore } from "state-range";
import Finder from ".";

const FinderView = () => {
    const foundItems = Finder.getFoundedItems()

    useEffect(() => {
        return () => {
            Finder.deleteMeta("search")
        }
    }, [])

    useEffect(() => {
        if (foundItems.length && !Finder.findFirst({ active: true })) {
            Finder.setActive(foundItems[0].id)
        }
    }, [Finder.getMeta("search")])

    return (
        <ViewBox
            bgcolor="color.paper.light"
            radius={1}
            pt={0}
            gap={8}
            header={
                <Input
                    autoFocus
                    startIcon={<SearchIcon />}
                    fontSize={18}
                    p={2}
                    placeholder="Search"
                    containerProps={{
                        radius: "8px 8px 0 0"
                    }}
                    value={Finder.getMeta("search", "")}
                    onChange={(e: any) => {
                        Finder.setActive("")
                        Finder.setMeta("search", e.target.value)
                    }}
                    onKeyDown={(e) => {
                        const items = Finder.getFoundedItems()

                        if (e.keyCode === 38) { // up
                            e.preventDefault()
                            for (let i = 0; i < items.length; i++) {
                                const item = items[i]
                                if (item.active) {
                                    const prev = items[i - 1]
                                    Finder.setActive(prev ? prev.id : items[items.length - 1].id)
                                    break;
                                }
                            }
                        } else if (e.keyCode === 40) { // down
                            e.preventDefault()
                            for (let i = 0; i < items.length; i++) {
                                const item = items[i]
                                if (item.active) {
                                    const next = items[i + 1]
                                    Finder.setActive(next ? next.id : items[0].id)
                                    break;
                                }
                            }
                        } else if (e.keyCode === 13) { // enter
                            const activeItem = Finder.findFirst({ active: true })
                            if (activeItem) {
                                activeItem.onClick()
                                Finder.close()
                            }
                        }

                    }}
                />
            }
        >
            {foundItems.length ? <List
                p={1}
                pt={0}
                sx={{
                    '& > *': {
                        mb: 0
                    }
                }}
            >
                {
                    foundItems.map(item => {
                        return (
                            <ListItem
                                key={item._id}
                                startIcon={item.icon}
                                subtitle={item.subtitle}
                                onClick={() => {
                                    item.onClick()
                                    Finder.close()
                                }}
                                p={.8}
                                selected={item.active}
                            >
                                {item.title}
                            </ListItem>
                        )
                    })
                }
            </List> : <Text opacity={.7} userSelect="none" variant="subtext" textAlign="center" p={2}>No Results</Text>}
        </ViewBox>
    )
}


export default withStore(FinderView)