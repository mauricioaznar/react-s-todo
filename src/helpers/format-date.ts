import moment from 'moment'

export const formatDate = (date: string): string => {
    return moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : ''
}
