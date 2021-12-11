import * as React from 'react';
import {useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {ApolloError} from "@apollo/client";
import {Form, Formik} from 'formik';

// mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {IconButton, TableCell, TableRow} from "@mui/material";
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

// components
import {Query, useCreateTodoMutation, useUpdateTodoMutation} from "../../services/schema";
import {nameof} from "../../helpers/nameof";
import MauSnackbar from "../../components/MauSnackbar";
import {TodoNode} from "../../types/todo";
import * as yup from "yup";
import FormikTextField from "../../components/inputs/formik/FormikTextField";
import FormikCheckbox from "../../components/inputs/formik/FormikCheckbox";
import FormikDate from "../../components/inputs/formik/FormikDate";
import FormikTable from "../../components/inputs/formik/FormikTable";
import {Delete} from "@mui/icons-material";

interface TodoFormLocationProps {
    todo?: TodoNode
}

export default function TodoForm() {

    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const history = useHistory()

    const location = useLocation<TodoFormLocationProps>()
    const todo = location.state?.todo


    const [createTodoMutation] = useCreateTodoMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('todos')
            })
        },
    });

    const [updateTodoMutation] = useUpdateTodoMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('todos')
            })
        },
    });

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <PetsIcon/>
                </Avatar>
                <Typography variant="h4">
                    Todo
                </Typography>
                <Box sx={{mt: 1}}>
                    <Formik
                        initialValues={{
                            description: todo ? todo.description : '',
                            due: todo ? todo.due : '',
                            archived: todo ? todo.archived : false,
                            locked: todo ? todo.locked : false,
                            items: todo ? todo.items : [{description: '12341234', completed: false}]
                        }}
                        validationSchema={yup.object({
                            description: yup
                                .string()
                                .required('Description is required'),
                            due: yup
                                .string()
                                .required('Date is required'),
                            file: yup
                                .string()
                                .nullable(),
                            items: yup
                                .array()
                                .min(1, 'array required minimum 1 item')
                                .of(
                                    yup
                                        .object()
                                        .shape({
                                            description: yup
                                                .string()
                                                .required('description is required'),
                                            completed: yup
                                                .boolean()
                                        })
                                )
                                .required('Required')

                        })}
                        onSubmit={async (data) => {
                            const {description, due, locked, archived, items} = data

                            setIsDisabled(true)

                            const options = {
                                todoInput: {
                                    description: description,
                                    locked: locked,
                                    archived: archived,
                                    due: due ? due.toString() : '',
                                    items: items.map(i => {
                                        return {
                                            description: i.description,
                                            completed: i.completed
                                        }
                                    })
                                }
                            }

                            try {
                                if (todo) {
                                    await updateTodoMutation(
                                        {
                                            variables: {
                                                id: todo._id,
                                                ...options
                                            }
                                        }
                                    )
                                } else {
                                    await createTodoMutation({
                                        variables: {
                                            ...options
                                        }
                                    })
                                }

                                history.push('/todos')

                            } catch (e) {
                                if (e instanceof ApolloError) {
                                    setMessage(e.message)
                                }
                            }

                            setMessage('')
                            setIsDisabled(false)
                        }}
                    >
                        <Form>
                            <FormikTextField
                                name="description"
                                label="Description"
                            />
                            <FormikDate
                                label={'Due'}
                                name="due"
                            />
                            <FormikCheckbox
                                name={'locked'}
                                label={'Locked'}
                                uncheckedIcon={LockOpenRoundedIcon}
                                checkedIcon={LockRoundedIcon}
                            />
                            <FormikCheckbox
                                name={'archived'}
                                label={'Archived'}
                                checkedIcon={ArchiveIcon}
                                uncheckedIcon={UnarchiveOutlinedIcon}
                            />

 
                            <FormikTable
                                renderHeader={
                                    () => {
                                        return <TableRow>
                                            <TableCell width={'60%'}>Description</TableCell>
                                            <TableCell width={'20%'}>Completed</TableCell>
                                            <TableCell width={'20%'}>&nbsp;</TableCell>
                                        </TableRow>
                                    }
                                }
                                renderRow={
                                    (i, index, deleteItem) => {
                                        return <TableRow key={index}>
                                            <TableCell>
                                                <FormikTextField
                                                    name={`items[${index}].description`}
                                                    label="Description"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormikCheckbox
                                                    name={`items[${index}].completed`}
                                                    label="Completed"
                                                />
                                            </TableCell>
                                            <TableCell align={'right'}>
                                                <IconButton onClick={deleteItem}>
                                                    <Delete/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    }}
                                defaultItem={{
                                    description: '',
                                    completed: false
                                }}
                                name={'items'}
                                label={'Items'}
                            />

                            <Button
                                disabled={isDisabled}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Formik>

                </Box>
            </Box>
            <MauSnackbar
                message={message}
            />
        </Container>
    );
}
