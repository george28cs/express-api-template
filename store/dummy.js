const db = {
  tasks: [
    {
      personId: 'Jorge Carrión',
      date: '05-10-2020',
      cost_center: '1036',
      category: 'Documentación',
      subcategory: 'Planos',
      hora_inicio: '08:00:00',
      hora_fin: '14:00:00',
      horas: '6',
      validation: false,
      comments: 'Estuvo muy facil',
    },
    {
      personId: 'Tomás Garduza',
      date: '05-10-2020',
      cost_center: '1036',
      category: 'Documentación',
      subcategory: 'Planos',
      hora_inicio: '08:00:00',
      hora_fin: '14:00:00',
      horas: '6',
      validation: true,
      comments: 'Estuvo muy facil',
    },
    {
      personId: 'Raul Sanchez',
      date: '05-10-2020',
      cost_center: '1036',
      category: 'Documentación',
      subcategory: 'Planos',
      hora_inicio: '08:00:00',
      hora_fin: '14:00:00',
      horas: '6',
      validation: false,
      comments: 'Estuvo muy facil',
    },
    {
      personId: 'Yartiza Garcia',
      date: '05-10-2020',
      cost_center: '1036',
      category: 'Documentación',
      subcategory: 'Planos',
      hora_inicio: '08:00:00',
      hora_fin: '14:00:00',
      horas: '6',
      validation: false,
      comments: 'Estuvo muy facil',
    },
    {
      personId: 'Carlos García',
      date: '05-10-2020',
      cost_center: '1036',
      category: 'Documentación',
      subcategory: 'Planos',
      hora_inicio: '08:00:00',
      hora_fin: '14:00:00',
      horas: '6',
      validation: false,
      comments: 'Estuvo muy facil',
    },
  ],
}

async function list(tabla) {
  return db[tabla] || []
}

async function get(tabla, id) {
  let col = await list(tabla)
  return col.filter((item) => item.id === id)[0] || null
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = []
  }

  db[tabla].push(data)

  console.log(db)
}

async function remove(tabla, id) {
  return true
}

async function query(tabla, q) {
  let col = await list(tabla)
  let keys = Object.keys(q)
  let key = keys[0]

  return col.filter((item) => item[key] === q[key])[0] || null
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}
