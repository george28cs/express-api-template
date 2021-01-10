const PRODUCT_TABLE = 'product'
const STORE_TABLE = 'store'

module.exports = function (injectedStore) {
  let store = injectedStore
  
  async function upsert(product) {
    return store.upsert(PRODUCT_TABLE, product)
  }

  async function get(id) {
    return store.get(PRODUCT_TABLE,"*", "id", id)
  }

  async function update(id, name) {
  
    return store.update(PRODUCT_TABLE,"id", name, id)
  }
   
  async function remove(id) {
    return store.remove(PRODUCT_TABLE, id)
  }

    return {
    get,
    remove,
    upsert,
    update
  }
}