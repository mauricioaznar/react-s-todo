import React, {useState} from 'react'
import {LoadingButton} from "@mui/lab";

interface FeedbackButtonProps {
    onClick: () => Promise<boolean>;
    loading?: boolean;
    label: string;
    icon: React.ReactElement<any, any>
}

type Variants = 'success' | 'error' | 'primary'

export default function FeedbackButton(props: FeedbackButtonProps) {
    const {
        loading = false,
        onClick,
        label,
        icon
    } = props;

    const [color, setColor] = useState<Variants>('primary')


    const runPromise = async () => {

        const val = await onClick()
        if (val) {
            await startTimeout('success')
        } else {
            await startTimeout('error')
        }
    }

    const startTimeout = async (variant: Variants) => {
        setColor(variant)
        setTimeout(() => {
            setColor('primary')
        }, 2000)
    }


    return (
        <LoadingButton
            loading={loading}
            loadingPosition={"end"}
            onClick={runPromise}
            variant={"contained"}
            endIcon={icon}
            color={color as any}
        >
            {label}
        </LoadingButton>
    )
}
