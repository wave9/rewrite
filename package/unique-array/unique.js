export default function unique(arr){
    let ret = [];
    let obj = {};
    for(let i = 0 ; i < arr.length ; i ++){
        if(typeof arr[i] === "object"){
            // 这里的正则是用于替换空格
            if( !obj.hasOwnProperty(JSON.stringify(arr[i]).replace(/(\s|[\\t])/g,''))){
                obj[JSON.stringify(arr[i]).replace(/(\s|[\\t])/g,'')] = true;
                ret.push(arr[i]);
            }
        }
        else{
            if( !obj.hasOwnProperty( typeof arr[i] + arr[i])) {
                obj[typeof arr[i] + arr[i]] = true;
                ret.push(arr[i]);
            }
        }
    }
    return ret;
}