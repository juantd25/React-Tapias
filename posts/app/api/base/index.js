import axios from 'axios';
import {Service} from 'axios-middleware';
import React from 'react';

const path = 'createUser';
const urlBase =
  'https://us-central1-react-native-firebase-d849c.cloudfunctions.net/';
const headers = {
  'Content-Type': 'application/json',
};

class Register {
  constructor() {
    if (typeof Register.instance === 'object') return Register.instance;
    Register.instance = this;
  }

  onResponse(response) {
    const res = JSON.parse(response.data);
    console.log(res);
    return res;
  }
}

export default class Request {
  constructor(url, baseUrl) {
    this.url = url || path;
    this.baseUrl = baseUrl || urlBase;
    this.request = axios.create({baseURL: this.baseUrl, headers});
    const service = new Service(this.request);
    service.register(new Register());
  }

  get() {
    return this.request({url: this.url});
  }

  getOne(id) {
    return this.request({url: this.url + id});
  }

  post(value) {
    return this.request({url: this.url, data: value, method: 'post'});
  }

  put(value, id) {
    return this.request({url: this.url + id, data: value, method: 'put'});
  }

  delete(id) {
    return this.request({url: this.url + id, method: 'delete'});
  }

  render() {
    return null;
  }
}
