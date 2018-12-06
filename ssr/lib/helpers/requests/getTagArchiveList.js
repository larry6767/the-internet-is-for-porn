import {
    map
} from 'lodash'

export default (list, monthsNames) => map(
    list,
    ({archive_date, items_count, month, url, year}) => ({
        archiveDate: archive_date,
        itemsCount: items_count,
        month: monthsNames[Number(month) < 10 ? month.slice(1) : month],
        monthNumber: month,
        url,
        year,
    })
)
