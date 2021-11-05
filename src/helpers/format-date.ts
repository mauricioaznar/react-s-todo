import moment from 'moment'

export const formatDate = (date: string): string => {
    return moment(new Date(date)).isValid() ? moment(date).format(DATE_FORMAT) : date
}

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_MASK = '____-__-__'
