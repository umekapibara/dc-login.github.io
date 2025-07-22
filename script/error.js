const error_id = document.getElementById("error_id");
const error_message = document.getElementById("error_message");
const error_description = document.getElementById("error_description");

const error_types = {
    not_kgi_account: {
        id : `アカウントエラー`,
        message : `アカウントが有効ではありません`,
        description : `ログインされたGoogleアカウントが工学院大学付属高校の組織アカウントではありませんでした。<br>ClassRoomのログインに使用しているアカウントを用いてログインを行ってください。`
    },
    invalid_user_data: {
        id : `ユーザーデータの取得失敗`,
        message : `ユーザーデータの取得に失敗しました`,
        description : `ユーザーデータの取得に失敗したため、結果画面の表示をできませんでした。<br>出席確認は完了しているため問題ありません。`
    },
    invalid_result: {
        id : `結果の取得失敗`,
        message : `結果の詳細の取得に失敗しました`,
        description : `結果の詳細の取得に失敗したため、結果画面の表示をできませんでした。<br>出席確認は完了しているため問題ありません。`
    }
};

function onload(){
    try{
        let url = new URL(window.location.href);
        let params = url.searchParams;
        const type = decodeURIComponent(atob(params.get("type")));
        if (params.get("type") != null){
            if (Object.keys(error_types).includes(type)){
                error_description.innerHTML = error_types[type].description;
                error_message.innerHTML = error_types[type].message;
                error_id.innerHTML = error_types[type].id;
            }
            else{
                error_description.innerHTML = type;
            }
        }
    }
    catch (e){
        error_description.innerHTML = e.message;
        error_message.innerHTML = "予期せぬエラーが発生しました";
        error_id.innerHTML = "深刻なエラー";
    }
}

document.addEventListener("DOMContentLoaded", onload)