console.log('test');
console.log('demo');

var d = {
    x: 1
}
var option = {
    mehtod: "POST",
}

setTimeout(function(){
    fetch('/test?x=1', option).then(function(res){
        res.json().then(function(data){
            var ele = document.createElement('h2');
            ele.innerText = data.msg;
            console.log(data);
            document.body.appendChild(ele);
        })
    })
}, 1000)
