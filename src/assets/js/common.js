function sendCode(btnCode,time) {
  // debugger
  // let time = 60
  if (time > 0) {
    time--
    btnCode.btnContent = time + 's'
    var timer = setTimeout(sendCode, 1000)
  } else if (time === 0) {
    btnCode.btnContent = '发送'
    clearTimeout(timer)
  }
}
export { sendCode }