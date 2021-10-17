import * as React from 'react'

import AddIcon from "@mui/icons-material/Add"
import {useHistory} from 'react-router-dom'
import {Fab} from "@mui/material";
import {GetUsersQuery, useGetUsersQuery} from "../../schema";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


export default function UserList() {
    const history = useHistory()
    const {data, loading} = useGetUsersQuery()

    if (loading) {
        return <h1>Loading</h1>;
    }


    function handleCreateClick() {
        history.push('/signInForm')
    }


    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <h2>
                        Users
                    </h2>
                </Grid>
                <Grid item>
                    <Fab size={'small'} color="primary" aria-label="add" onClick={handleCreateClick}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.users.map((user) => (
                                    <UserRow
                                        key={user._id}
                                        user={user}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}


function UserRow({user}: { user: GetUsersQuery["users"][number] }) {
    // const [isDisabled, setDisabled] = useState(false)
    //
    // const history = useHistory()
    //
    // function handleEditClick(User: GetUsersQuery["users"][number]) {
    //     // history.push('/UserForm', {User})
    // }
    //
    //
    // async function onDelete(User: GetUsersQuery["users"][number]) {
    //     setDisabled(true)
    // }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell>
                {user.username}
            </TableCell>
        </TableRow>
    );
}
