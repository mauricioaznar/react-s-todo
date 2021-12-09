import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from "react-hook-form";
import {ApolloError} from "@apollo/client";
import ReactHookFormFile from "../../../components/inputs/react-hook-form/ReactHookFormFile";
import {useUploadCatPhotosMutation} from "../../../schema";
import MauSnackbar from "../../../components/MauSnackbar";


interface CatPhotosDialogProps {
    handleClose: () => void,
    open: boolean,
    id: string,
}


interface CatPhotosForm {
    files: File[] | null | undefined
}


export default function CatPhotosDialog (props: CatPhotosDialogProps) {

    const {handleClose, open, id} = props

    const {handleSubmit, control} = useForm<CatPhotosForm>({
        defaultValues: {
            files: []
        }
    });

    const [ uploadCatPhotos, {error} ] = useUploadCatPhotosMutation()


    const onSubmit = async (data: CatPhotosForm) => {
        const { files } = data




        try {
            if (files && files.length > 0) {
                await uploadCatPhotos({
                    variables: {
                        files,
                        id
                    }
                })
            }
            //
        } catch (e: unknown) {
            if (e instanceof ApolloError) {
                // setMessage(e.message)
            }
        }
    };

    const onError = () => {

    }


    return (

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <ReactHookFormFile
                            rules={{
                                required: true,
                                filesize: 4000000,
                                multiple: true
                            }}

                            label={'Photos'}
                            control={control}
                            name="files"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </form>
                <MauSnackbar message={error?.message || ''} />
            </Dialog>

    )

}
