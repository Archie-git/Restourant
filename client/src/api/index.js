/*该模块包含应用中所有接口请求函数
*每个函数的返回值都是promise
 */
import ajax from './ajax';
import jsonp from './jsonp'


const WEATHER_URL="https://free-api.heweather.net/s6/weather/now";
const WEATHER_KEY="0894aab8b0394389a7ac887e32db9c30";
const LOCATION_URL="https://apis.map.qq.com/ws/location/v1/ip";
const LOCATION_KEY="LOABZ-ONL6F-CLXJZ-N4A2L-AB74O-ITFWZ";

//basic requests;
export const reqLogin = (username,password) => ajax('/login',{username: username, password: password},'POST');

//header;
export const reqWeather = (location, key=WEATHER_KEY) => ajax(WEATHER_URL,{location: location, key: key},'GET');
export const reqCity = (key=LOCATION_KEY) => jsonp(LOCATION_URL, {key});

//category;
export const reqCategoryList = () => ajax('/category/list',null ,'GET');
export const updateCategoryList = (data) => ajax('/category/update', data, 'POST');
export const reqCategorySearch = (name) => ajax('/category/search', {name: name}, 'GET');
export const reqCategoryDelete = (id) => ajax('/category/delete', {id: id}, 'GET');
export const addCategoryList = (data) => ajax('/category/add', data, 'POST');

//product
export const reqProductList = () => ajax('/product/list', null, 'GET');
export const reqProductDelete = (id) => ajax('/product/delete', {id: id}, 'GET');
export const updateProductList = (data) => ajax('/product/update', data, 'POST');
export const addProductList = (data) => ajax('/product/add', data, 'POST');

//file
export const reqImgDelete = (name) => ajax('/file/delete', {name: name}, 'GET');


















