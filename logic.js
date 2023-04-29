let writer = true

let products = []
let creators = []
let entities = []

if(window.localStorage.getItem('products')){
    products=JSON.parse(window.localStorage.getItem('products'))
}
if(window.localStorage.getItem('creators')){
    creators=JSON.parse(window.localStorage.getItem('creators'))
}
if(window.localStorage.getItem('entities')){
    entities=JSON.parse(window.localStorage.getItem('entities'))
}

function printData(data,title){
    let section = document.createElement('section')
    section.innerHTML='<table id='+title.toLowerCase()+'></table>'
    
    let caption = document.createElement('caption')
    caption.appendChild(document.createTextNode(title))
    let tbody = document.createElement('tbody')
    
    if(data.length==0){
        let tabla = section.getElementsByTagName('table')[0]
        let row = document.createElement('tr')
        let td = document.createElement('td')
        td.appendChild(document.createTextNode('(Vacio)'))
        row.appendChild(td)
        tbody.appendChild(row)
        tabla.appendChild(tbody)
        section.appendChild(tabla)
        return section
    }
    let i = 0
    for(let item of data){
        let row = document.createElement('tr')
        let tableData = document.createElement('td')
        
        let image = document.createElement('img')
        image.setAttribute("src", item.image)
        image.setAttribute("width", 25)
        image.setAttribute("heigth", 25)
        tableData.appendChild(image)
        row.appendChild(tableData)

        tableData = document.createElement('td')
        tableData.setAttribute('id', item.id)
        tableData.setAttribute('class', 'elemName')
        tableData.setAttribute('index',i)
        
        if(title.toLowerCase()==='products'){
            tableData.addEventListener('click',readProduct)
        }
        if(title.toLowerCase()==='creators'){
            tableData.addEventListener('click',readCreators)
        }
        if(title.toLowerCase()==='entities'){
            tableData.addEventListener('click',readEntity)
        }

        let name = document.createTextNode(item.name)
        tableData.appendChild(name)
        row.appendChild(tableData)

        if(writer){
            let formCell = document.createElement('td')
            let form = document.createElement('form')
            let deleteBtn = document.createElement('input')
            deleteBtn.setAttribute('type','button')
            deleteBtn.setAttribute('value', 'delete')
            form.appendChild(deleteBtn)
            formCell.appendChild(form)
            row.appendChild(formCell)
        }

        tbody.appendChild(row)
        i++
    }
    tabla = section.getElementsByTagName('table')[0]
    tabla.appendChild(caption)
    tabla.appendChild(tbody)

    if(writer){
        form = document.createElement('form')
        if(title.toLowerCase() === 'products'){
            form.innerHTML='<input type="button" name="createProduct" value="create" onclick="crearProducto();">'
        }
        if(title.toLowerCase() === 'creators'){
            form.innerHTML='<input type="button" name="createCreator" value="create" onclick="crearCreador();">'
        }
        if(title.toLowerCase() === 'entities'){
            form.innerHTML='<input type="button" name="createEntity" value="create" onclick="crearEntidad();">'
        }
        section.appendChild(form)
    }
    return section
}

function readIndex(){
    let loginForm = document.createElement('login')
    if(!writer){
        loginForm.innerHTML = '<label for="user">Usuario</label>'
        loginForm.innerHTML+= ' '
        loginForm.innerHTML+= '<input id="user" type="text" name="user"/>'
        loginForm.innerHTML+= ' '
        loginForm.innerHTML+= '<label for="passwd">Contraseña</label>'
        loginForm.innerHTML+= ' '
        loginForm.innerHTML+= '<input id="passwd" type="password" name="passwd"/>'
        loginForm.innerHTML+= ' '
        loginForm.innerHTML+= '<input type="button" name="login" value="Login" onclick="LogIn();"/>'
    }
    else{
        loginForm.innerHTML = '<input type="button" name="logout" value="Logout" onclick="LogOut();"/>'
    }
    let nav = document.getElementsByTagName('nav')[0]
    nav.innerHTML=''
    nav.appendChild(loginForm)
        
    let main = document.getElementsByTagName('main')[0]
    main.innerHTML=''
    main.appendChild(printData(products,'Products'))
    main.appendChild(printData(creators,'Creators'))
    main.appendChild(printData(entities,'Entities'))
}

function LogIn() {
    let user = document.getElementById('user').value
    let passwd = document.getElementById('passwd').value
    let encontrado = false
    usuarios = JSON.parse(window.localStorage.getItem('users'))
    for(let usr in usuarios){
      if((usr==user) && (usuarios[usr]==passwd)){
        encontrado=true
        break;
      }
    }
    if(encontrado){
      writer=true
      readIndex()
    }
    else{
      window.alert('Usuario o contraseña incorrectos')
    }
}

function LogOut(){
    writer=false
    readIndex()
}

function readElement(elemento){
    let nav = document.getElementsByTagName('nav')[0]
    nav.innerHTML=''
    nav.innerHTML='<input type="button" name="inicio" value="Inicio" onclick="readIndex();">'

    let main = document.getElementsByTagName('main')[0]
    death = elemento.death ? '<h3>Fallecimiento: '+elemento.death.day+' de '+elemento.death.month+' de '+elemento.death.year+'</h3>':''
    main.innerHTML=''
    main.innerHTML=
    '<section>'+
        '<h2>'+elemento.name+'</h2>'+
        '<h3>Nacimiento: '+elemento.birth.day+' de '+elemento.birth.month+' de '+elemento.birth.year+'</h3>'+
        death+
        '<img src="'+elemento.image+'" alt="'+elemento.name+'" width="300" height="250">'+
        '<div><table id="productos" style="margin: 0px;">'+
        '</table>'+
        '<table id="entidades" style="margin: 0px;">'+
        '</table></div>'+
    '</section>'
    main.innerHTML+='<section><iframe src="'+elemento.wiki+'" width=700 height=500></section>'

}

function readProduct(){
    let elemento
    for(item of products){
        if(item.id == this.id){
            elemento=item
            break
        }
    }
    readElement(elemento)

    let main = document.getElementsByTagName('main')[0]
    let footer = document.createElement('footer')
    let peopleTitle = document.createElement('h2')
    peopleTitle.appendChild(document.createTextNode('People'))
    footer.appendChild(peopleTitle)
    if(elemento.people.length!=0){
        for(person of elemento.people){
            for(item of creators){
                if(person == item.id){
                    let img = document.createElement('img')
                    img.setAttribute('id', item.id)
                    img.setAttribute('src', item.image)
                    img.setAttribute('alt', item.name)
                    img.setAttribute('title', item.name)
                    img.setAttribute('width', 50)
                    img.setAttribute('height', 50)
                    img.addEventListener('click', readCreators)
                    img.style.cursor = 'pointer'
                    footer.appendChild(img)
                    break
                }
            }
        }
    }
    else{
        footer.innerHTML+='<p>(Vacío)<p>'
    }

    let entitiesTitle = document.createElement('h2')
    entitiesTitle.appendChild(document.createTextNode('Entities'))
    footer.appendChild(entitiesTitle)
    if(elemento.entities.length!=0){
        for(entity of elemento.entities){
            for(item of entities){
                if(entity == item.id){
                    let img = document.createElement('img')
                    img.setAttribute('id', item.id)
                    img.setAttribute('src', item.image)
                    img.setAttribute('alt', item.name)
                    img.setAttribute('title', item.name)
                    img.setAttribute('width', 50)
                    img.setAttribute('height', 50)
                    img.addEventListener('click', readEntity)
                    img.style.cursor = 'pointer'
                    footer.appendChild(img)
                    break
                }
            }
        }
    }
    else{
        footer.innerHTML+='<p>(Vacío)<p>'
    }
    main.appendChild(footer)
}

function readCreators(){
    let elemento
    for(item of creators){
        if(item.id == this.id){
            elemento=item
            break
        }
    }
    readElement(elemento)
}

function readEntity(){
    let elemento
    for(item of entities){
        if(item.id == this.id){
            elemento=item
            break
        }
    }
    readElement(elemento)

    let main = document.getElementsByTagName('main')[0]
    let footer = document.createElement('footer')
    let peopleTitle = document.createElement('h2')
    peopleTitle.appendChild(document.createTextNode('People'))
    footer.appendChild(peopleTitle)
    if(elemento.people.length!=0){
        for(person of elemento.people){
            for(item of creators){
                if(person == item.id){
                    let img = document.createElement('img')
                    img.setAttribute('id', item.id)
                    img.setAttribute('src', item.image)
                    img.setAttribute('alt', item.name)
                    img.setAttribute('title', item.name)
                    img.setAttribute('width', 50)
                    img.setAttribute('height', 50)
                    img.addEventListener('click', readCreators)
                    img.style.cursor = 'pointer'
                    footer.appendChild(img)
                    break
                }
            }
        }
    }
    else{
        footer.innerHTML+='<p>(Vacío)<p>'
    }
    main.appendChild(footer)
}

function create(title){
    let nav = document.getElementsByTagName('nav')[0]
    nav.innerHTML=''
    nav.innerHTML='<input type="button" name="cancel" value="Cancel" onclick="readIndex();">'
    let main = document.getElementsByTagName('main')[0]
    main.innerHTML=''
    let section = document.createElement('section')
    section.style.width='25%'
    section.style.maxWidth='50%'
    section.style.marginLeft='37.5%'
    section.style.textAlign='center'
    section.style.borderStyle='solid'
    section.style.borderWidth='medium'
    let funcionSubmit=''
    if(title==='Producto'){
        funcionSubmit='editProduct(this);'
    }
    else if(title==='Creador'){
        funcionSubmit='editPerson(this);'
    }
    else if(title==='Entidad'){
        funcionSubmit='editEntity(this);'
    }
    section.innerHTML='<form id="creationForm" onsubmit="'+funcionSubmit+'">'+
    '<fieldset>'+
    '<legend>Nuevo '+title+'</legend>'+
    '<label for="name">Nombre: </label>'+
    '<input type="text" id="name" name="Name" value="" required><br><br>'+
    '<label for="birth">Nacimiento: </label>'+
    '<input type="date" id="birth" name="Birth" required><br><br>'+
    '<label for="death">Fallecimiento: </label>'+
    '<input type="date" id="death" name="Death"><br><br>'+
    '<label for="image">URL Imagen: </label>'+
    '<input type="url" id="image" name="Image" required><br><br>'+
    '<label for="wiki">URL wiki: </label>'+
    '<input type="url" id="wiki" name="Wiki" required><br><br>'+
    '</fieldset>'+
    '</form>'
    
    main.appendChild(section)
}

function crearProducto(){
    create('Producto')
    
    let fieldset = document.getElementsByTagName('fieldset')[0]
    fieldset.innerHTML+='<h3 style="text-align: left; color: yellow;">Participantes<h3>'
    let peopleList = document.createElement('ul')
    peopleList.setAttribute('id','peopleList')
    for(person of creators){
        let listItem = document.createElement('li')
        let label = document.createElement('label')
        label.setAttribute('for', person.id)
        label.appendChild(document.createTextNode(person.name))
        let checkbox = document.createElement('input')
        checkbox.setAttribute('id', person.id)
        checkbox.setAttribute('type','checkbox')
        listItem.appendChild(label)
        listItem.appendChild(checkbox)
        peopleList.appendChild(listItem)
    }
    fieldset.appendChild(peopleList)

    fieldset.innerHTML+='<h3 style="text-align: left; color: yellow;">Entidades colaboradoras<h3>'
    let entitiesList = document.createElement('ul')
    entitiesList.setAttribute('id','entitiesList')
    for(entity of entities){
        let listItem = document.createElement('li')
        let label = document.createElement('label')
        label.setAttribute('for', entity.id)
        label.appendChild(document.createTextNode(entity.name))
        let checkbox = document.createElement('input')
        checkbox.setAttribute('id', entity.id)
        checkbox.setAttribute('type','checkbox')
        listItem.appendChild(label)
        listItem.appendChild(checkbox)
        entitiesList.appendChild(listItem)
    }
    fieldset.appendChild(entitiesList)

    fieldset.innerHTML+='<input type="submit" value="Enviar";">'
    let form = document.getElementById('creationForm')
}

function crearCreador(){
    create('Creador')
}

function crearEntidad(){
    create('Entidad')
}

function editProduct(form){
    let fieldset=form.getElementsByTagName('fieldset')[0]

    products[products.length] = {
        id: products[products.length-1].id+1,
        name: fieldset.getElementsByTagName('input')[0].value,
        birth: fieldset.getElementsByTagName('input')[1].value,
        death: fieldset.getElementsByTagName('input')[2].value,
        image: fieldset.getElementsByTagName('input')[3].value,
        wiki: fieldset.getElementsByTagName('input')[4].value
    }

    
    window.localStorage.setItem('products', JSON.stringify(products))
}