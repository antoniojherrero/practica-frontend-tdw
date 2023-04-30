let writer = true

let products = []
let people = []
let entities = []

if(window.localStorage.getItem('products')){
    products=JSON.parse(window.localStorage.getItem('products'))
}
if(window.localStorage.getItem('people')){
    people=JSON.parse(window.localStorage.getItem('people'))
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
        tabla.appendChild(caption)
        tabla.appendChild(tbody)
        section.appendChild(tabla)
    }
    else{
        let i = 0
        for(let item of data){
            let row = document.createElement('tr')
            row.setAttribute('id', i)
            let tableData = document.createElement('td')
            
            let image = document.createElement('img')
            image.setAttribute("src", item.image)
            image.setAttribute("width", 25)
            image.setAttribute("height", 25)
            tableData.appendChild(image)
            row.appendChild(tableData)

            tableData = document.createElement('td')
            tableData.setAttribute('id', item.id)
            tableData.setAttribute('class', 'elemName')
            
            if(data == products){ tableData.addEventListener('click',readProduct) }
            if(data == people){ tableData.addEventListener('click',readPerson)}
            if(data == entities){ tableData.addEventListener('click',readEntity)  }

            let name = document.createTextNode(item.name)
            tableData.appendChild(name)
            row.appendChild(tableData)

            if(writer){
                let formCell = document.createElement('td')
                let deleteBtn = document.createElement('input')
                deleteBtn.setAttribute('type','button')
                deleteBtn.setAttribute('value', 'Eliminar')
                let modifyBtn = document.createElement('input')
                modifyBtn.setAttribute('type', 'button')
                modifyBtn.setAttribute('value', 'Editar')
                if(data == products){
                    deleteBtn.addEventListener('click', deleteProduct)
                    modifyBtn.addEventListener('click', updateProduct)
                }
                if(data == people){
                    deleteBtn.addEventListener('click', deletePerson)
                    modifyBtn.addEventListener('click', updatePerson)
                }
                if(data == entities){
                    deleteBtn.addEventListener('click', deleteEntity)
                    modifyBtn.addEventListener('click', updateEntity)
                }
                formCell.appendChild(modifyBtn)
                formCell.appendChild(deleteBtn)
                row.appendChild(formCell)
            }

            tbody.appendChild(row)
            i++
        }
        tabla = section.getElementsByTagName('table')[0]
        tabla.appendChild(caption)
        tabla.appendChild(tbody)
    }

    if(writer){
        form = document.createElement('form')
        if(data == products){
            form.innerHTML='<input type="button" name="createProduct" value="Crear" onclick="crearProducto();">'
        }
        if(data == people){
            form.innerHTML='<input type="button" name="createPerson" value="Crear" onclick="crearPersona();">'
        }
        if(data == entities){
            form.innerHTML='<input type="button" name="createEntity" value="Crear" onclick="crearEntidad();">'
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
    main.appendChild(printData(products,'Productos'))
    main.appendChild(printData(people,'Personas'))
    main.appendChild(printData(entities,'Entidades'))
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
    let birthday = new Date(elemento.birth)
    let deathday = new Date(elemento.death)
    death = !(deathday == 'Invalid Date') ? '<h3>Fallecimiento: '+deathday.getDay()+' de '+(deathday.toLocaleString('default', { month: 'long' }))+' de '+deathday.getFullYear()+'</h3>':''
    main.innerHTML=''
    main.innerHTML=
    '<section style="width: 40%;">'+
        '<h2>'+elemento.name+'</h2>'+
        '<h3>Nacimiento: '+birthday.getDay()+' de '+birthday.toLocaleString('default', { month: 'long' })+' de '+birthday.getFullYear()+'</h3>'+
        death+
        '<img src="'+elemento.image+'" alt="'+elemento.name+'" width="300" height="250">'+
        '<div><table id="productos" style="margin: 0px;">'+
        '</table>'+
        '<table id="entidades" style="margin: 0px;">'+
        '</table></div>'+
    '</section>'
    main.innerHTML+='<section style="width: 60%;"><iframe src="'+elemento.wiki+'" width=700 height=500></section>'

}

function readProduct(){
    let elemento = products[this.parentElement.id]
    
    readElement(elemento)

    let main = document.getElementsByTagName('main')[0]
    let footer = document.createElement('footer')
    footer.style.float='left'
    footer.innerHTML='<h2 style="text-align: center;">Personas<h2>'
    if(elemento.people.length!=0){
        let i = 0
        let tablaPersonas = document.createElement('table')
        let row = document.createElement('tr')
        for(person of elemento.people){
            for(item of people){
                if(person == item.id){
                    let tableData = document.createElement('td')
                    tableData.style.textAlign='center'
                    tableData.setAttribute('id', i)
                    let img = document.createElement('img')
                    img.setAttribute('src', item.image)
                    img.setAttribute('alt', item.name)
                    img.setAttribute('title', item.name)
                    img.setAttribute('width', 50)
                    img.setAttribute('height', 50)
                    img.addEventListener('click', readPerson)
                    img.style.cursor = 'pointer'
                    tableData.appendChild(img)
                    row.appendChild(tableData)
                    break
                }
                i+=1
            }
        }
        tablaPersonas.appendChild(row)
        footer.appendChild(tablaPersonas)
    }
    else{
        footer.innerHTML+='<p>(Vacío)<p>'
    }

    footer.innerHTML+='<h2 style="text-align: center;">Entidades<h2>'
    if(elemento.entities.length!=0){
        let i = 0
        let tablaEntidades = document.createElement('table')
        let row = document.createElement('tr')
        for(entity of elemento.entities){
            for(item of entities){
                if(entity == item.id){
                    let tableData = document.createElement('td')
                    tableData.style.textAlign='center'
                    tableData.setAttribute('id', i)
                    let img = document.createElement('img')
                    img.setAttribute('src', item.image)
                    img.setAttribute('alt', item.name)
                    img.setAttribute('title', item.name)
                    img.setAttribute('width', 50)
                    img.setAttribute('height', 50)
                    img.addEventListener('click', readPerson)
                    img.style.cursor = 'pointer'
                    tableData.appendChild(img)
                    row.appendChild(tableData)
                    break
                }
                i+=1
            }
        }
        tablaEntidades.appendChild(row)
        footer.appendChild(tablaEntidades)
    }
    else{
        footer.innerHTML+='<p>(Vacío)<p>'
    }
    main.appendChild(footer)
}

function readPerson(){
    let elemento = people[this.parentElement.id]

    readElement(elemento)
}

function readEntity(){
    let elemento = entities[this.parentElement.id]

    readElement(elemento)

    let main = document.getElementsByTagName('main')[0]
    let footer = document.createElement('footer')
    footer.innerHTML='<h2 style="text-align: center;">Personas<h2>'
    if(elemento.people.length!=0){
        let i = 0
        let tablaPersonas = document.createElement('table')
        let row = document.createElement('tr')
        for(person of elemento.people){
            for(item of people){
                if(person == item.id){
                    let tableData = document.createElement('td')
                    tableData.style.textAlign='center'
                    tableData.setAttribute('id', i)
                    let img = document.createElement('img')
                    img.setAttribute('src', item.image)
                    img.setAttribute('alt', item.name)
                    img.setAttribute('title', item.name)
                    img.setAttribute('width', 50)
                    img.setAttribute('height', 50)
                    img.addEventListener('click', readPerson)
                    img.style.cursor = 'pointer'
                    tableData.appendChild(img)
                    row.appendChild(tableData)
                    break
                }
                i+=1
            }
        }
        tablaPersonas.appendChild(row)
        footer.appendChild(tablaPersonas)
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
    else if(title==='Persona'){
        funcionSubmit='editPerson(this);'
    }
    else if(title==='Entidad'){
        funcionSubmit='editEntity(this);'
    }
    section.innerHTML='<form id="creationForm" onsubmit="'+funcionSubmit+'">'+
    '<fieldset>'+
    '<legend>Crear '+title+'</legend>'+
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
    for(person of people){
        let listItem = document.createElement('li')
        listItem.setAttribute('id', person.id)
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
        listItem.setAttribute('id', entity.id)
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
}

function crearPersona(){
    create('Persona')
    let fieldset = document.getElementsByTagName('fieldset')[0]
    fieldset.innerHTML+='<input type="submit" value="Enviar";">'
}

function crearEntidad(){
    create('Entidad')

    let fieldset = document.getElementsByTagName('fieldset')[0]

    fieldset.innerHTML+='<h3 style="text-align: left; color: yellow;">Participantes<h3>'
    let peopleList = document.createElement('ul')
    peopleList.setAttribute('id','peopleList')
    for(person of people){
        let listItem = document.createElement('li')
        listItem.setAttribute('id', person.id)
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

    fieldset.innerHTML+='<input type="submit" value="Enviar";">'
}

function editProduct(form){
    let fieldset=form.getElementsByTagName('fieldset')[0]
    let peopleList = document.getElementById('peopleList')
    let checkedPeople = []
    for(item of peopleList.getElementsByTagName('li')){
        if(item.getElementsByTagName('input')[0].checked){
            checkedPeople[checkedPeople.length]= +item.id
        }
    }
    let entitiesList = document.getElementById('entitiesList')
    let checkedEntities = []
    for(item of entitiesList.getElementsByTagName('li')){
        if(item.getElementsByTagName('input')[0].checked){
            checkedEntities[checkedEntities.length]= +item.id
        }
    }
    products[products.length] = {
        id: products[products.length-1].id+1,
        name: fieldset.getElementsByTagName('input')[0].value,
        birth: fieldset.getElementsByTagName('input')[1].value,
        death: fieldset.getElementsByTagName('input')[2].value,
        image: fieldset.getElementsByTagName('input')[3].value,
        wiki: fieldset.getElementsByTagName('input')[4].value,
        people: checkedPeople,
        entities: checkedEntities
    }
    window.localStorage.setItem('products', JSON.stringify(products))
}

function editPerson(form){
    let fieldset=form.getElementsByTagName('fieldset')[0]
    people[people.length] = {
        id: products[people.length-1].id+1,
        name: fieldset.getElementsByTagName('input')[0].value,
        birth: fieldset.getElementsByTagName('input')[1].value,
        death: fieldset.getElementsByTagName('input')[2].value,
        image: fieldset.getElementsByTagName('input')[3].value,
        wiki: fieldset.getElementsByTagName('input')[4].value,
    }
    window.localStorage.setItem('people', JSON.stringify(people))
}

function editEntity(form){
    let fieldset=form.getElementsByTagName('fieldset')[0]
    let peopleList = document.getElementById('peopleList')
    let checkedPeople = []
    for(item of peopleList.getElementsByTagName('li')){
        if(item.getElementsByTagName('input')[0].checked){
            checkedPeople[checkedPeople.length]= +item.id
        }
    }
    entities[entities.length] = {
        id: entities[entities.length-1].id+1,
        name: fieldset.getElementsByTagName('input')[0].value,
        birth: fieldset.getElementsByTagName('input')[1].value,
        death: fieldset.getElementsByTagName('input')[2].value,
        image: fieldset.getElementsByTagName('input')[3].value,
        wiki: fieldset.getElementsByTagName('input')[4].value,
        people: checkedPeople,
    }
    window.localStorage.setItem('entities', JSON.stringify(entities))
}

function deleteProduct(){
    let indice = +this.parentElement.parentElement.id
    
    if(window.confirm('Eliminar definitivamente el producto: '+products[indice].name)){
        delete products[indice]
        products = products.filter(Boolean)
        window.localStorage.setItem('products', JSON.stringify(products))
    }
    readIndex()
}

function deletePerson(){
    let indice = +this.parentElement.parentElement.id
    
    if(window.confirm('Eliminar definitivamente la persona: '+people[indice].name)){
        delete people[indice]
        people = people.filter(Boolean)
        window.localStorage.setItem('people', JSON.stringify(people))
    }
    readIndex()
}
function deleteEntity(){
    let indice = +this.parentElement.parentElement.id
    
    if(window.confirm('Eliminar definitivamente la entidad: '+entities[indice].name)){
        delete entities[indice]
        entities = entities.filter(Boolean)
        window.localStorage.setItem('entities', JSON.stringify(entities))
    }
    readIndex()
}

function updateProduct(){
    let elemento = products[this.parentElement.parentElement.id]
    console.log(elemento)
}

function updatePerson(){

}

function updateEntity(){

}