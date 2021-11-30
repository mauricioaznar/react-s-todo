import React, {useState} from 'react'
import {Box} from "@mui/material";
import {useUploadFileMutation} from "../../schema";
import {ApolloError} from "@apollo/client";
import MauSnackbar from "../../components/MauSnackbar";


export function FileUploadForm() {
    const [message, setMessage] = useState('')

    const [uploadFileMutation] = useUploadFileMutation()


    const onChange = async ({
                          target: {
                              validity,
                              files: [file]
                          }
                      }: any) => {
        try {
            console.log(file)

            const {data, errors} = await uploadFileMutation({
                variables: {
                    file
                }
            })
            console.log(data)
            console.log(errors)
        } catch (e) {
            if (e instanceof ApolloError) {
                setMessage(e.message)
            }
        }
    };


    return <Box justifyContent={'center'}>
        <input type="file" required onChange={onChange} />
        <MauSnackbar message={ message } />
    </Box>
}
