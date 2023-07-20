import axios, { AxiosRequestHeaders } from 'axios'

const request = axios.create({
    baseURL: ""
})

let geturl = window.location.href
let getqyinfo = geturl.split('?')[1]
let getqys = new URLSearchParams('?'+getqyinfo)
let getTicket = getqys.get('ticket')
let getToken = getqys.get('token')

const ticket = getTicket? getTicket : "5D8F36243F919C59CADA4C590F7F71B9B27063CC6B596F293DA31FB79BC36947BDC8CD10BB7DF079BD82C19E6B4A67DAC8F2A462E12B807517CA31AEE367A56AAA44F2E87CD7994A370C41071490118F2C10A5A5ED386C780B4BDAA6D97603FAD7EAC419FD7FF8A4143CBC03E9E372BDCF341CA73D6EF996D031962A32DF83DE"
const token = getToken? getToken : "8278E7C41C08933F422173371B20AA7B8BD95450281F584A37F0A3D7862CD7EF"
localStorage.setItem("ticket", ticket)
localStorage.setItem("token", token)

request.interceptors.request.use((config) => {
    if(!config.headers) {
        config.headers = {} as AxiosRequestHeaders
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default request