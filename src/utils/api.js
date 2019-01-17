// api合集
// const host = 'https://cypg.ywping.top'
const host = 'http://localhost:4000'
module.exports = {
    host: host,
    api: {
        getAll: '/api/share/getAll',
        getDetail: '/api/share/getDetail',
        searchD: '/api/share/searchshare',
        tiaoji: '/api/share/getTj',
        getTjDetail: '/api/share/getTjDetail',
        weibo: '/api/wb/getweibo',
        wedetail: '/api/wb/getwbdetail'
    }
}