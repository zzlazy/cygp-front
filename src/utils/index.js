import { resolve } from "url";

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function request (requestOption) {
  const promise = new Promise((resolve,reject) => {
    wx.request({
      ...requestOption,
      success (res) {
        if (res && res.statusCode === 200) {
          resolve(res.data)
          return
        }
        reject(res && res.data)
      },
      fail (error) {
        reject(error)
      }
    })
  });
  return promise
}
export default {
  formatNumber,
  formatTime,
  request
}
