function load(){
    try{
        let url = new URL(window.location.href);
        let params = url.searchParams;
        try{
            const user = JSON.parse(decode(params.get("user")));
            document.getElementById("icon").setAttribute("src", user.picture);
            document.getElementById("name").innerText = user.name;
        }
        catch{
            throw new Error("invalid_user_data");
        }
        try{
            const result = JSON.parse(decode(params.get("result")));
            if (result.type == 0){
                document.getElementById("text").innerHTML = "出席の確認が完了しました";
            }
            else if (result.type == 1){
                document.getElementById("text").innerHTML = "すでに出席を確認済みです";
            }
            else {
                throw new Error("invalid_result");
            }
        }
        catch{
            throw new Error("invalid_result");
        }
    }
    catch (e){
        window.location.assign(`error.html?type=${encode(e.message)}`);
    }
}

function encode(data){
    return btoa(encodeURIComponent(data))
}

function decode(data){
    return decodeURIComponent(atob(data));
}

document.addEventListener("DOMContentLoaded", load)