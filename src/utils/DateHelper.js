import moment from 'moment'
import DateFormat from '../constants/date-format';
import i18next from './languages';

const timeDiffAsSeconds = (before, after) => {
  const momentBefore = moment(before)
  const momentAfter = moment(after)
  if (!momentBefore._isValid || !momentAfter._isValid) return null
  const diff = moment.duration(momentAfter.diff(momentBefore))
  return Math.floor(diff.asSeconds())
}

const timeDiffAsDays = (before, after) => {
  const momentBefore = before ? moment(before) : moment()
  const momentAfter = moment(after)
  if (!momentBefore._isValid || !momentAfter._isValid) return null
  const diff = moment.duration(momentAfter.diff(momentBefore))
  return Math.floor(diff.asDays())
}

const convertStringDateToFormat = (string, dateFormat) => {
  return moment(string).format(dateFormat)
}

const convertDateToEpochTime = (date, endOfDays) => {
  return endOfDays ? moment(date).endOf('day').unix() : moment(date).unix()
}

const compareChoosenDateAndCurrentDate = (epochTimeChoosenDate) => {
  const currentDate = new Date()
  const epochTimeCurrentDate = convertStringDateToFormat(currentDate, DateFormat.YYYY_MM_DD)
  return epochTimeChoosenDate >= convertDateToEpochTime(epochTimeCurrentDate)
}

const compareTimeChoosenLessCurrent = (epochTimeChoosenDate) => {
  const currentDate = new Date()
  const epochTimeCurrentDate = convertStringDateToFormat(currentDate, DateFormat.YYYY_MM_DD)
  return epochTimeChoosenDate <= convertDateToEpochTime(epochTimeCurrentDate)
}

const convertEpochTimeToDate = (epochTime) => {
  return moment.unix(epochTime)
}

const convertPeriodTimeToString = (time) => {
  const hour = 60
  const day = 24 * 60
  const month = 30 * 24 * 60
  const currentTime = moment()
  const compareTime = moment.unix(time)

  if (!compareTime._isValid) return ''

  let diff = Math.floor(currentTime.diff(compareTime, 'minutes'))
  if (diff < 0) diff = 0

  if (diff < hour) return `${diff}${i18next.t('MinutesAgo')}`
  if (diff >= hour && diff < day) return `${Math.floor(diff / hour)}${i18next.t('HourAgo')}`
  if (diff >= day && diff < month) return `${Math.floor(diff / day)}${i18next.t('DayAgo')}`
  if (diff >= month) return `${Math.floor(diff / month)}${i18next.t('MonthAgo')}`

  return ''
}

const convertUTCTimeToEpochTime = (time) => {
  const newTime = time.replace(' UTC', '')
  const epochTime = moment.utc(newTime) / 1000
  if (isNaN(epochTime)) return ''
  return epochTime
}

const currentEpochDay = () => {
  return convertDateToEpochTime(moment(), true)
}

export default {
  timeDiffAsSeconds,
  timeDiffAsDays,
  convertStringDateToFormat,
  convertDateToEpochTime,
  compareChoosenDateAndCurrentDate,
  convertEpochTimeToDate,
  convertPeriodTimeToString,
  compareTimeChoosenLessCurrent,
  convertUTCTimeToEpochTime,
  currentEpochDay,
}
