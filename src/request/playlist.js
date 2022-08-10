import service from ".";

// 获取歌单详情数据
export function getPlaylistDetail(data) {
    return service({
        method: 'get',
        url: '/playlist/detail?id=' + data
    })
}

// 获取歌词
export function getMusicLyric(data) {
    return service({
        method: 'get',
        url: '/lyric?id=' + data
    })
}