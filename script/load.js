const endpoint = "https://script.google.com/macros/s/AKfycbw6L0ZfghW-wvqj1dOplLUmdvCTaNNzTfMoXEwaL4e_OTUJc4luuroN8cBRkoAM9SK1kQ/exec";

function onload(){
    try{
        console.log("process started");
        const params = new URLSearchParams(window.location.search);
        const hd = params.get("hd");
        const code = params.get("code");

        if (hd != "kgi.ed.jp") {
            throw new Error("not_kgi_account");
        }

        const new_params = new URLSearchParams({
            code,
            client_id: "307579407449-16s6peb743oooe462hrp66h1rbrtedp6.apps.googleusercontent.com",
            client_secret: "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",
            redirect_uri: "http://127.0.0.1:5501/sub_page/load.html",
            grant_type: "authorization_code"
        })

        fetch("https://oauth2.googleapis.com/token", {method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new_params })
            .then(response => {
                console.log("Response status:", response.status);
                return response.json();
            })
            .then(data => {
                if (!data.access_token){
                    console.log(data)
                    throw new Error("failed_get_token");
                }

                fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${data.access_token}` } })
                    .then(response_2 => {
                        console.log("Response status:", response_2.status);
                        return response_2.json();
                    })
                    .then(data_2 => {
                        const user_info = {
                            name : data_2.name,
                            picture : data_2.picture,
                            grade : get_grade(data_2.email),
                        }
                        fetch(endpoint, {method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(user_info) })
                            .then(response => {
                                console.log("Response status:", response.status);
                                return response.json();
                            })
                            .then(data => {
                                if (data.success){
                                    window.location.assign(`success.html?user=${encode(JSON.stringify(user_info))}&result=${encode(JSON.stringify(data))}`);
                                }
                                else{
                                    window.location.assign(`error.html?type=${encode(data.message)}`);
                                }
                            })
                            .catch(error => {
                                window.location.assign(`error.html?type=${encode(error)}`);
                            });
                    })
                    .catch(error_2 => {
                        throw new Error(error_2);
                    });
            })
            .catch(error => {
                throw new Error(error);
            });
    }
    catch (e){
        window.location.assign(`error.html?type=${encode(e.message)}`);
    }
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

function encode(data){
    return btoa(encodeURIComponent(data))
}

document.addEventListener("DOMContentLoaded", onload)