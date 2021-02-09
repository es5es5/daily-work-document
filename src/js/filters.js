import { DateTime } from 'luxon'

export default {
  install (Vue) {
    /**
     * 숫자, 천 단위마다 콤마 필터
     */
    Vue.filter('numberWithComma', value => {
      if (value !== 0 && !value) return ''
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })
    /**
     * 날짜 포맷 필터
     */
    Vue.filter('dateFormat', (value, format = 'yyyy-MM-dd') => {
      if (!value) return '-'
      switch (typeof value) {
        case 'string':
          return DateTime.fromISO(value).toFormat(format)
        case 'number':
          return DateTime.fromMillis(value).toFormat(format)
        default:
          return '-'
      }
    })
  }
}
