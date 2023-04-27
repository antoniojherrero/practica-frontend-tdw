if(!window.localStorage.getItem("users")){
    let users = JSON.stringify({
      x: "x",
      y: "y",
      z: "z"
    });
    window.localStorage.setItem("users", users)
  }
  if(!window.localStorage.getItem("products")){
    let products = JSON.stringify([
      {
        id: 1,
        name: "HTML",
        birth: {
          day: 29,
          month: "Octubre",
          year: 1991
        },
        death: null,
        image:"https://cdn-icons-png.flaticon.com/512/919/919827.png",
        wiki: "https://es.wikipedia.org/wiki/HTML",
        people: [1,2],
        entities: [1]
      },
      {
        id: 2,
        name: "JavaScript",
        birth: {
          day: 4,
          month: "Diciembre",
          year: 1995
        },
        death: null,
        image: "https://cdn.iconscout.com/icon/free/png-256/javascript-2038874-1720087.png",
        wiki: "https://es.wikipedia.org/wiki/JavaScript",
        people: [],
        entities: []
      }
    ])
    window.localStorage.setItem("products", products)
  }
  if(!window.localStorage.getItem("creators")){
    let creators = JSON.stringify([
      {
        id: 1,
        name: "Vannervar Bush",
        birth: {
          day: 11,
          month: "Marzo",
          year: 1890
        },
        death: {
          day: 28,
          month: "Junio",
          year: 1974
        },
        image: "https://ahf.nuclearmuseum.org/wp-content/uploads/2014/05/vannevar-bush-1-sized.jpg",
        wiki: "https://es.wikipedia.org/wiki/Vannevar_Bush"
      },
      {
        id: 2,
        name: "Tim Berners Lee",
        birth: {
          day: 8,
          month: "Junio",
          year: 1955
        },
        death: null,
        image: "https://i.blogs.es/3ef43a/tim-berners-lee/1366_2000.jpg",
        wiki: "https://es.wikipedia.org/wiki/Tim_Berners-Lee"
      }
    ])
    window.localStorage.setItem("creators", creators)
  }
  if(!window.localStorage.getItem("entities")){
    let entities = JSON.stringify([
      {
        id: 1,
        name: "CERN",
        birth: {
          day: 29,
          month: "Septiembre",
          year: 1954
        },
        death: null,
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/CERN_logo.svg/1200px-CERN_logo.svg.png",
        wiki: "https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Europea_para_la_Investigaci%C3%B3n_Nuclear",
        people: [2]
      }
    ])
    window.localStorage.setItem("entities", entities)
  }