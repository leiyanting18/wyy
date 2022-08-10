// 移动端适配

function reSize() {
    const deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    // 根据设备宽度调节字体
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    document.querySelector('body').style.fontSize = 0.3 + 'rem'

}
// 调用函数
reSize()

// onresize——监听窗口的变化
window.onresize = function () {
    reSize()
}