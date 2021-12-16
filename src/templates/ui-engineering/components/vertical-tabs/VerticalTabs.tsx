import React from "react";
import AnimatedDiv from "../../../../components/spring-components/AnimatedDiv";
import {Box, Container, Tab, Tabs, Typography} from "@mui/material";


export interface VerticalTabItem {

    label: string;
    component: React.ReactElement<any, any>;

}

interface VerticalTabsProps {
    items: VerticalTabItem[];
    title: string;
}

export default function VerticalTabs (props: VerticalTabsProps) {
    const { items, title } = props

    const VERTICAL_TABS_KEY = 'vertical_tabs_key_' + title;
    const initialState = window.localStorage.getItem(VERTICAL_TABS_KEY) ? Number(window.localStorage.getItem(VERTICAL_TABS_KEY)) : 0
    const [value, setValue] = React.useState(initialState);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        window.localStorage.setItem(VERTICAL_TABS_KEY, String(newValue))
        setValue(newValue);
    };

    const TabItem = () => {
        return (
            <AnimatedDiv> {
                items.find((t, index) => index === value)?.component || null
            }
            </AnimatedDiv>
        )
    }

    return (
        <Container>
            <Box sx={{mt: 2, mb: 4}}>
                <Typography variant={'h4'}>
                    { title }
                </Typography>
            </Box>
            <Box
                sx={{display: 'flex'}}
            >
                <Box sx={{mr: 4,}}>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        indicatorColor={'secondary'}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        onChange={handleChange}
                        sx={{height: 400}}
                    >

                        {
                            items.map(t => {
                                return (
                                    <Tab wrapped={false} sx={{whiteSpace: 'nowrap', fontWeight: 'bolder'}} key={t.label}
                                         label={t.label}/>
                                )
                            })
                        }
                    </Tabs>
                </Box>
                <Box>
                    <TabItem/>
                </Box>
            </Box>
        </Container>
    )
}
