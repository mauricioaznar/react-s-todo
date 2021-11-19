import {useCallback, useEffect, useState} from "react";
import LocalStorage from "../helpers/local-storage";

interface UseGraphqlPagination {
    afterKey?: string,
    firstKey?: string,
    beforeKey?: string,
    lastKey?: string,
    limit?: number,


}

export const useGraphqlPagination = (props: UseGraphqlPagination) => {

    const {afterKey, firstKey, beforeKey, lastKey, limit = 5} = props

    const [after, setAfter] = useState<null | string | undefined>(
        afterKey ? LocalStorage.getString(afterKey) : null
    )
    const [first, setFirst] = useState<number | null | undefined>(

        firstKey ? LocalStorage.getNumber(firstKey) : null

    )
    const [before, setBefore] = useState<null | string | undefined>(
        beforeKey ? LocalStorage.getString(beforeKey) : null
    )
    const [last, setLast] = useState<number | null | undefined>(
        lastKey ? LocalStorage.getNumber(lastKey) : null
    )


    useEffect(() => {


        setBefore(null)
        if (beforeKey) {
            LocalStorage.removeItem(beforeKey)
        }
        setLast(null)
        if (lastKey) {
            LocalStorage.removeItem(lastKey)
        }

        const newFirst = limit
        setFirst(newFirst)
        if (firstKey) {
            LocalStorage.saveNumber(newFirst, firstKey)
        }

        if (afterKey) {
            if (after) {
                LocalStorage.saveString(after, afterKey)
            } else {
                LocalStorage.removeItem(afterKey)
            }

        }

    }, [after])


    useEffect(() => {


        setAfter(null)
        if (afterKey) {
            LocalStorage.removeItem(afterKey)
        }
        setFirst(null)
        if (firstKey) {
            LocalStorage.removeItem(firstKey)
        }

        const newLast = limit
        setFirst(newLast)
        if (lastKey) {
            LocalStorage.saveNumber(newLast, lastKey)
        }

        if (beforeKey) {
            if (before) {
                LocalStorage.saveString(before, beforeKey)
            } else {
                LocalStorage.removeItem(beforeKey)
            }

        }

    }, [before])


    const resetGraphqlPagination = useCallback(() => {
        setBefore(null)
        if (beforeKey) {
            LocalStorage.removeItem(beforeKey)
        }
        setLast(null)
        if (lastKey) {
            LocalStorage.removeItem(lastKey)
        }
        setFirst(limit)
        if (firstKey) {
            LocalStorage.removeItem(limit.toString())
        }
        setAfter(null)
        if (afterKey) {
            LocalStorage.removeItem(afterKey)
        }
    }, [])


    return {
        after,
        setAfter,
        first,
        before,
        setBefore,
        last,
        resetGraphqlPagination
    }

}
