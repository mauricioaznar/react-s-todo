import * as React from 'react'
import {useState} from 'react'

// icons
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';


// components
import {useHistory} from 'react-router-dom'
import {Fab, IconButton} from "@mui/material";
import {GetCatsQuery, namedOperations, useDeleteCatMutation, useGetCatsQuery} from "../../schema";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CatPhotosDialog from "./components/CatPhotosDialog";


export default function CatList() {
    const history = useHistory()
    const {data, loading} = useGetCatsQuery()

    if (loading) {
        return null;
    }


    function handleCreateClick() {
        history.push('/catForm')
    }


    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <h2>
                        Cats
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
                                    <TableCell>Description</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Coat</TableCell>
                                    <TableCell>Lifespan</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.cats.map((cat) => (
                                    <CatRow
                                        key={cat._id}
                                        cat={cat}
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


function CatRow({cat}: { cat: GetCatsQuery["cats"][number] }) {
    const [isDisabled, setDisabled] = useState(false)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [deleteCatMutation] = useDeleteCatMutation({
        refetchQueries: [namedOperations.Query.GetCats]
    })

    const history = useHistory()

    function handleEditClick(cat: GetCatsQuery["cats"][number]) {
        history.push('/catForm', {cat})
    }


    async function onDelete(cat: GetCatsQuery["cats"][number]) {
        setDisabled(true)
        await deleteCatMutation({
            variables: {
                id: cat._id
            }
        })
    }
    
    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    {cat.breed}
                </TableCell>
                <TableCell>
                    {cat.characteristics.color}
                </TableCell>
                <TableCell>{cat.characteristics.coat}</TableCell>
                <TableCell>

                    {cat.characteristics.lifespan}
                </TableCell>
                <TableCell>
                    {cat.characteristics.size}
                </TableCell>
                <TableCell>
                    <IconButton
                        size={'small'}
                        onClick={() => {
                            handleEditClick(cat)
                        }}>
                        <CreateIcon fontSize={'small'}/>
                    </IconButton>
                    <IconButton
                        disabled={isDisabled}
                        size={'small'}
                        onClick={() => {
                            onDelete(cat)
                        }}>
                        <DeleteIcon fontSize={'small'}/>
                    </IconButton>
                    <IconButton
                        disabled={isDisabled}
                        size={'small'}
                        onClick={() => {
                            handleClickOpen()
                        }}>
                        <FileUploadIcon fontSize={'small'}/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <CatPhotosDialog handleClose={handleClose} open={open} />
        </>
    );
}

