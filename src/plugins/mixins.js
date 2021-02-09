import { DateTime } from 'luxon'

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {}
      },
      computed: {
        _id () { return this.$route.params.id },
        mixinRouteMetaGoBack () { return this.$route.meta ? this.$route.meta.goBack : false },
        mixinRouteMetaTitle () { return this.$route.meta ? this.$route.meta.title || '일일업무일지' : '일일업무일지' },
        mixinRouteMetaTag () { return this.$route.meta ? this.$route.meta.tag : false },
        mixinRouteParamTag () { return this.$route.params ? this.$route.params.tag : false },
        mixinUser () { return this.$store.getters.getUser }
      },
      methods: {
        isEmpty (value) {
          if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
            return true
          } else {
            return false
          }
        },
        goBack () { this.$router.go(-1) },
        getAddress (query, popupName = '주소 찾기') {
          return new Promise((resolve, reject) => {
            daum.postcode.load(() => {
              new daum.Postcode({
                oncomplete (data) {
                  // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                  // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                  // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                  let fullAddr = '' // 최종 주소 변수
                  let extraAddr = '' // 조합형 주소 변수

                  // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                  if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    fullAddr = data.roadAddress
                  } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    fullAddr = data.jibunAddress
                  }

                  // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                  if (data.userSelectedType === 'R') {
                    // 법정동명이 있을 경우 추가한다.
                    if (data.bname !== '') {
                      extraAddr += data.bname
                    }
                    // 건물명이 있을 경우 추가한다.
                    if (data.buildingName !== '') {
                      extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName)
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? '(' + extraAddr + ')' : '')
                  }

                  // 우편번호와 주소 정보를 해당 필드에 넣는다.
                  // document.getElementById('postCode').value = data.zonecode // 5자리 새우편번호 사용
                  // document.getElementById('address').value = fullAddr

                  // 커서를 상세주소 필드로 이동한다.
                  // document.getElementById('addressDetail').focus()

                  resolve({
                    zonecode: data.zonecode,
                    address: fullAddr
                  })
                }
                // width: window.innerWidth,
                // height: window.innerHeight
              }).open({
                q: query,
                popupName: this.$route.name
              })
            })
          })
        },
        /**
         * 사업자번호 포맷
         */
        $getBusinessNumberFormat (businessNumberObject) {
          let value = businessNumberObject.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            businessNumberObject.value = ''
            return ''
          }

          if (value.length > 3) {
            result = value.substring(0, 3) + '-' + value.substring(3, 5) + '-' + value.substring(5, 10)
          }

          if (value.length > 11) {
            result = value.substring(0, 10)
          }

          return result
        },
        /**
         * 생년월일 포맷
         */
        $getBirthdayFormat (birthdayObject) {
          let value = birthdayObject.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            birthdayObject.value = ''
            return ''
          }

          if (value.length > 4) {
            result = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8)
          }

          if (value.length > 9) {
            result = value.substring(0, 8)
          }

          return result
        },
        /**
         * 전화번호 포맷
         */
        $getTelFormat (telObject) {
          let value = telObject.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            telObject.value = ''
            return ''
          }

          if (value.length > 2) {
            if (value.substring(0, 2) === '02') {
              if (value.length > 5) {
                if (value.length > 9) {
                  result = value.substring(0, 2) + '-' + value.substring(2, 6) + '-' + value.substring(6, 10)
                } else {
                  result = value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5, value.length)
                }
              } else if (value.length > 2) {
                result = value.substring(0, 2) + '-' + value.substring(2, value.length)
              }
            } else {
              if (value.length > 3 && value.substring(0, 3) !== '010') return result

              if (value.length > 6) {
                if (value.length > 10) {
                  result = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7, 11)
                } else {
                  result = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, value.length)
                }
              } else if (value.length > 3) {
                result = value.substring(0, 3) + '-' + value.substring(3, value.length)
              }
            }
          }

          return result
        },
        /**
         * 콤마 포맷
         */
        $getComma (CommaObject) {
          let value = CommaObject.value

          if (!value) { return '' }

          const pattern = /[^\d,-]/g

          if (pattern.test(value)) {
            value = value.replace(pattern, '')
            CommaObject.value = value
            return value
          }

          if (value.substr(0, 1) === '-') {
            value = '-' + Number(value.replace(/[,-]/g, ''))
          } else {
            value = Number(value.replace(/[,-]/g, ''))
          }

          const result = value.toLocaleString('en').split('.')[0]
          return result.toString()
        },
        /**
         * 일 형식 하이픈포멧 (ex 19990101 -> 1999-01-01 )
         */
        $addHyphenDate (DateOjbect) {
          let value = DateOjbect.value.replace(/-/g, '')
          value = value.replace(/\D/gi, '')
          var result = value
          if (!result || isNaN(result)) {
            DateOjbect.value = ''
            return ''
          }

          if (result.length > 6) {
            result = result.substring(0, 4) + '-' + result.substring(4, 6) + '-' + result.substring(6, result.length)
          } else if (result.length > 4) {
            result = result.substring(0, 4) + '-' + result.substring(4, result.length)
          }
          return result
        },
        getToDate (value, format = 'yyyy-MM-dd') {
          if (!value) return '-'
          console.log(typeof value)
          switch (typeof value) {
            case 'object':
              return DateTime.fromJSDate(value).toFormat(format).toString()
            case 'string':
              return DateTime.fromISO(value).toFormat(format).toString()
            case 'number':
              return DateTime.fromMillis(value).toFormat(format).toString()
            default:
              return value
          }
        }
      }
    })
  }
}
