import React, {useState} from 'react'
import {Box} from "@mui/material";
import {useUploadFileMutation} from "../../schema";
import {ApolloError} from "@apollo/client";
import MauSnackbar from "../../components/MauSnackbar";
import MauTextField from "../../components/inputs/MauTextField";
import MauCheckbox from "../../components/inputs/MauCheckbox";
import Button from "@mui/material/Button";
import MauFile from "../../components/inputs/MauFile";
import {useForm} from "react-hook-form";


interface FileUploadFormInputs {
    file: any;
}

export function FileUploadForm() {
    const [message, setMessage] = useState('')

    const [uploadFileMutation] = useUploadFileMutation()


    const {handleSubmit, control} = useForm<FileUploadFormInputs>({
        defaultValues: {
            file: null
        }
    });

    const onSubmit = async (data: FileUploadFormInputs) => {
        const { file } = data

        try {
            console.log(file)

            // const {data, errors} = await uploadFileMutation({
            //     variables: {
            //         file
            //     }
            // })
            // console.log(data)
            // console.log(errors)
        } catch (e) {
            if (e instanceof ApolloError) {
                setMessage(e.message)
            }
        }
    };

    const onError = () => {

    }

    return <Box justifyContent={'center'}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <MauFile
                rules={{
                    required: true,
                }}
                label={'File'}
                control={control}
                name="file"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Submit
            </Button>
        </form>
        <MauSnackbar message={ message } />
    </Box>
}
