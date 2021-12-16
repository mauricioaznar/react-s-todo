import React from 'react'
import {Box, Container, Tab, Tabs, Typography} from "@mui/material";
import Explanation from "../components/explanation/Explanation";
import AnimatedDiv from "../../../components/spring-components/AnimatedDiv";
import ConsistencyProblem from "./views/ConsistencyProblem";
import ConsistencySolution from "./views/ConsistencySolution";

export default function Consistency() {


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = [
        {
            label: 'Explanation',
            component: <Explanation
                explanation={`You click on a “Like” button and the text updates:
                 “You and 3 other friends liked this post.” You click it again, and the text flips back.
                  Sounds easy. But maybe a label like this exists in several places on the screen. Maybe there 
                  is some other visual indication (such as the button background) that needs to change. 
                  The list of “likers” that was previously fetched from the server and is visible on hover should
                  now include your name. If you navigate to another screen and go back, the post shouldn’t “forget” it was 
                  liked. Even local consistency alone creates a set of challenges. But other users might also
                  modify the data we display (e.g. by liking a post we’re viewing). How do we keep the 
                  same data in sync on different parts of the screen? How and when do we make the local 
                  data consistent with the server, and the other way around?`
                }
            />
        },
        {
            label: 'Problems',
            component:  <ConsistencyProblem />
        },
        {
            label: 'The solution example',
            component:  <ConsistencySolution />
        },
    ]

    const TabItem = () => {
        return (
            <AnimatedDiv> {
                tabs.find((t, index) => index === value)?.component || null
            }
            </AnimatedDiv>
        )
    }

    return <Container>
        <Box sx={{mt: 2, mb: 4}}>
            <Typography variant={'h4'}>
                Consistency
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
                        tabs.map(t => {
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
}
