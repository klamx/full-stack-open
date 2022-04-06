import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const update = async (id, updated) => {
  const request = axios.put(`${baseUrl}/${id}`, updated)
  const response = await request
  console.log(id, updated, response.data)
  return response.data
}

const deleted = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { getAll, create, update, deleted }
