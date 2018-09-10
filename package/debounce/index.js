import debounce from './debounce';

// 这里假设我们已有的用户名
let usernameCollection = ['wave'];

let $inputBox = document.querySelector('.input-box');
let $tipText = document.querySelector('.tips');
let $btnCancel = document.querySelector('.cancel');


let deb = debounce(function (ev) {
    console.log(ev);
    $tipText.innerHTML = (
        usernameCollection.indexOf($inputBox.value) === -1
            ? `该用户名不存在: <br/>您输入的是：${$inputBox.value}`
            : "该用户名存在!"
    )
}, 1000);

$inputBox.addEventListener('keyup', deb);

// 点击取消 防抖
$btnCancel.addEventListener('click', function (ev) {
    console.log(ev);
    deb.cancel();
});



