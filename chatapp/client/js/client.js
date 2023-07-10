const socket = io("http://localhost:8000")

var name = prompt("Enter the User Name :  ")
socket.emit('new-user-joined',name)


var msg = document.getElementById("msg")
var first = document.getElementById("first")

function appendMessage(message,position){
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageElement.classList.add("alert")
    messageElement.classList.add("alert-secondary") 
    messageElement.classList.add(position)
    first.append(messageElement)
}

var btn = document.getElementById("btn")
btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let message = msg.value
    appendMessage(`You:${message}`,"right")
    socket.emit("send",message)
    msg.value=""
})

socket.on("user-joined",name=>{
    appendMessage(`${name} joined the chat`,"left")
})

socket.on("receive",data=>{
    appendMessage(`${data.name} : ${data.message}`,"left")
})

socket.on("left",name=>{
    appendMessage(`${name} left the chat`,"left")
})
