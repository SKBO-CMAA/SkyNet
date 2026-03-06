fetch("estaciones.json")
.then(r=>r.json())
.then(data=>{

mostrar(data,document.getElementById("explorador"))

})

function mostrar(lista,contenedor){

lista.forEach(item=>{

if(item.tipo==="carpeta"){

let div=document.createElement("div")

div.className="carpeta"

div.innerHTML="📁 "+item.nombre

contenedor.appendChild(div)

let sub=document.createElement("div")

sub.style.marginLeft="20px"

contenedor.appendChild(sub)

mostrar(item.contenido,sub)

}

else{

let div=document.createElement("div")

div.className="archivo"

div.innerHTML=`📄 <a href="${item.ruta}" download>${item.nombre}</a>`

contenedor.appendChild(div)

}

})

}

document.getElementById("buscar").addEventListener("input",function(){

let texto=this.value.toLowerCase()

document.querySelectorAll(".archivo").forEach(a=>{

if(a.innerText.toLowerCase().includes(texto))
a.style.display="block"
else
a.style.display="none"

})

})