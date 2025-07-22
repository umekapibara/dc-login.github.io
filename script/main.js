const parent = document.getElementsByClassName("login_box_outer")[0];
const child = document.getElementsByClassName("login_box")[0];
const endpoint = "https://script.google.com/macros/s/AKfycbw6L0ZfghW-wvqj1dOplLUmdvCTaNNzTfMoXEwaL4e_OTUJc4luuroN8cBRkoAM9SK1kQ/exec";

// function resize() {
//     try{
//         const pw = parent.getBoundingClientRect()["width"];
//         const ph = parent.getBoundingClientRect()["height"];
//         const cw = child.scrollWidth;
//         const ch = child.scrollHeight;

//         const scale = Math.min(pw / cw, ph / ch);
//         child.style.transform = `scale(${scale * 0.9})`;
//     }
//     catch(e) {
//         alert(e);
//     }
// }

// window.addEventListener('resize', resize);
// resize();

function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);

    // UTF-8としてデコード
    const utf8String = decodeURIComponent(
        decodedData.split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
    );

    return JSON.parse(utf8String);
}

function get_grade(email){
    const type = email.substring(0, 2);
    const year = parseInt(email.substring(2,4))
    const today = new Date()
    const ja_year = today.toLocaleDateString('ja-JP', { year: 'numeric' });
    const month = today.toLocaleDateString('ja-JP', { month: 'numeric' });
    const today_year = parseInt(month) >= 4 ? ja_year : parseInt(ja_year) - 1;
    let grade = -1;
    if (type == "hg"){
        grade = parseInt(today_year.substring(today_year.length - 3)) - year + 4;
    }
    else if (type == "jg"){
        grade = parseInt(today_year.substring(today_year.length - 3)) - year + 1;
    }
    return grade;
}

function login(){
    const clientId = '307579407449-16s6peb743oooe462hrp66h1rbrtedp6.apps.googleusercontent.com';
    const redirectUri = 'https://umekapibara.github.io/dc-login.github.io/sub_page/load.html';
    const scope = 'openid email profile';
    const state = Math.random().toString(36).substring(2);

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}` +
    `&prompt=consent`;

    // Googleの認証画面へリダイレクト
    window.location.href = authUrl;
}

document.getElementById("signin_button").addEventListener("click", login)

function encode(data){
    return btoa(encodeURIComponent(data))
}
