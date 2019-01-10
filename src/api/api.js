import axios from 'axios';

const base = '/mis/api';

//登录退出接口
export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const logout = params => { return axios.post(`${base}/logout`, params).then(res => res.data); };
export const getUserInfo = params => { return axios.post(`${base}/getUserInfo`, params).then(res => res.data); };

//获取列表
export const getAntiList = params => { return axios.post(`${base}/getAntiList`, params).then(res => res.data); };
