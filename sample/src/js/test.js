console.log('test');
console.log('demo');

var option = {
    mehtod: "GET",
}

setTimeout(function(){
    fetch('/test', option).then(function(res){
        res.json().then(function(data){
            var ele = document.createElement('h2');
            ele.innerText = data.msg;
            console.log(data);
            document.body.appendChild(ele);
        })
    })
}, 1000)
