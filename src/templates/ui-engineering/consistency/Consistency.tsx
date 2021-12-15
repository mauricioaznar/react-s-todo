import React from 'react'
import {Box, Container, Tab, Tabs, Typography} from "@mui/material";
import Home from "./views/Home";
import AnimatedDiv from "../../../components/spring-components/AnimatedDiv";
import TextIndicator from "./views/TextIndicator";

// interface ConsistencyProps {
//
// }

export default function Consistency () {


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = [
        {
            label: 'Explanation',
            component: <Home />
        },
        {
            label: 'Text indicator',
            component: <TextIndicator />
        }
    ]

    const TabItem = () => {
        return (
            <AnimatedDiv> {
                tabs.find((t, index) => index === value)?.component || null
            }
            </AnimatedDiv>
        )
    }

    return  <Container >
        <Box sx={{ mt: 2, mb: 4 }}>
            <Typography variant={'h4'}>
                Consistency
            </Typography>
        </Box>
        <Box
            sx={{ display: 'flex' }}
        >
            <Box sx={{ mr: 4 }}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    indicatorColor={'secondary'}
                    onChange={handleChange}
                >

                    {
                        tabs.map(t => {
                            return (
                                <Tab wrapped={false} sx={{ whiteSpace: 'nowrap', fontWeight: 'bolder' }} key={t.label} label={t.label}/>
                            )
                        })
                    }
                </Tabs>
            </Box>
            <Box>
                <TabItem />
            </Box>
        </Box>
    </Container>
}
