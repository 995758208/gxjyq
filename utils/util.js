import {backendServer} from "./constant";

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function getPhoneNumber(e) {
  console.log("getPhoneNumber", e);
  wx.login({
    success: res => {
      if (res.code) {
        wx.request({
          url: backendServer + "/decrypt/phoneNumber",
          method: 'GET',
          data: {
            code: res.code,
            encrypted: e.detail.encryptedData,
            iv: e.detail.iv
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (data) {
            console.log("data", data)

          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    }
  })
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getPhoneNumber: getPhoneNumber
}
