const STORAGE_KEY = 'loginInfo'
export function SetStorage (data){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}
export function GetStorage(){
    if(localStorage.getItem(STORAGE_KEY)){
        return JSON.parse(localStorage.getItem(STORAGE_KEY))
    }else{
        return false
    }
}
export function ClearStorggeKey(){
    localStorage.removeItem(STORAGE_KEY)
}

export function GetStorageInfo(){
    if(localStorage.getItem(STORAGE_KEY)){
        return true
    }
    else return false;
}