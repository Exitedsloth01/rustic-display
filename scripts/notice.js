const notice = document.getElementById('notice')
const noticeHead = document.getElementById('noticeHead')
const noticeBody = document.getElementById('noticeBody')

function showNotice(header, body) {
    notice.style.display = 'block'

    noticeHead.innerHTML = header
    noticeBody.innerHTML = body

    setTimeout(function() {
        notice.style.display = 'none'
    }, 5000)
}