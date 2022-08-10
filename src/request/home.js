import service from "."

// 获取登录数据——接口有问题
export function getPhoneLogin(username, password) {
    return service({
        method: 'get',
        url: '/login/cellphone?phone=' + username + '&password=' + password
    })
}

// 退出登录
export function getLogout() {
    return service({
        method: 'get',
        url: '/logout'
    })
}

// 获取轮播图数据
export function getSwiper() {
    return service({
        method: 'get',
        url: '/banner?type=2'
    })
}

// 获取推荐歌单
export function getRecommendPlaylist() {
    return service({
        method: 'get',
        url: '/personalized?limit=10'
    })

}

// 获取排行榜数据
export function getRank() {
    return service({
        method: 'get',
        url: '/toplist'
    })
}

// 获取搜索结果数据
export function getSearchMusic(keywords) {
    return service({
        method: 'get',
        url: '/search?keywords=' + keywords
    })
}