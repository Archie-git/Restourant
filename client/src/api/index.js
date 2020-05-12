/*该模块包含应用中所有接口请求函数
*每个函数的返回值都是promise
 */
import ajax from './ajax';
import jsonp from './jsonp'


const WEATHER_URL="https://free-api.heweather.net/s6/weather/now";
const WEATHER_KEY="0894aab8b0394389a7ac887e32db9c30";
const LOCATION_URL="https://apis.map.qq.com/ws/location/v1/ip";
const LOCATION_KEY="LOABZ-ONL6F-CLXJZ-N4A2L-AB74O-ITFWZ";

//header;
export const reqWeather = (location, key=WEATHER_KEY) => ajax(WEATHER_URL,{location: location, key: key},'GET');
export const reqCity = (key=LOCATION_KEY) => jsonp(LOCATION_URL, {key});

//basic requests;
export const reqLogin = (username,password) => ajax('/login',{username: username, password: password},'POST');

//home
export const reqShopInfo = () => ajax('/shop/info', null, 'GET');
export const updateShopInfo = (data) => ajax('/shop/update', data, 'POST');

//category;
export const reqCategoryList = () => ajax('/category/list',null ,'GET');
export const updateCategoryList = (data) => ajax('/category/update', data, 'POST');
export const reqCategorySearch = (name) => ajax('/category/search', {name}, 'GET');
export const reqCategoryDelete = (id) => ajax('/category/delete', {id}, 'GET');
export const addCategoryList = (data) => ajax('/category/add', data, 'POST');

//product
export const reqProductList = () => ajax('/product/list', null, 'GET');
export const reqProductDelete = (data) => ajax('/product/delete', data, 'POST');
export const updateProductList = (data) => ajax('/product/update', data, 'POST');
export const addProductList = (data) => ajax('/product/add', data, 'POST');
export const reqProductSearch = (data) => ajax('/product/search', data, 'POST');

//file
export const reqImgDelete = (name) => ajax('/file/delete', {name}, 'GET');

//stock
export const reqStockList = () => ajax('/stock/list', null, 'GET');
export const reqStockCategory = () => ajax('/stock/category', null, 'GET');
export const reqStockDelete = (id) => ajax('/stock/delete', {id}, 'GET');
export const reqStockSearch = (name) => ajax('/stock/search', {name}, 'GET');
export const addStockList = (data) => ajax('/stock/add', data, 'POST');
export const updateStockList = (data) => ajax('/stock/update', data, 'POST');

//stocklog
export const reqStocklogList = (data) => ajax('/stock/stocklog-list', data, 'GET');
export const addStocklogList = (data) => ajax('/stock/stocklog-add', data, 'POST');

//customer
export const reqCustomerList = () => ajax('/customer/list', null, 'GET');
export const reqMemberList = () => ajax('/customer/member-list', null, 'GET');
export const reqMemberSearch = (value) => ajax('/customer/member-search', {value}, 'GET');
export const reqMemberDelete = (id) => ajax('/customer/delete', {id}, 'GET');
export const reqMemberAdd = (data) => ajax('/customer/add', data, 'POST');
export const updateMemberList = (data) => ajax('/customer/update', data, 'POST');

//employee
export const reqEmployeeList = () => ajax('/employee/list', null, 'GET');
export const reqEmployeeDelete = (id) => ajax('/employee/delete', {id}, 'GET');
export const reqEmployeeSearch = (value) => ajax('/employee/search', {value}, 'GET');
export const addEmployeeList = (data) => ajax('/employee/add', data, 'POST');
export const updateEmployeeList = (data) => ajax('/employee/update', data, 'POST');

//inventory
export const reqInventoryList = () => ajax('/inventory/list', null, 'GET');
export const reqInventoryAdd = (data) => ajax('/inventory/add', data, 'POST');
export const reqInventoryUpdate = (data) => ajax('/inventory/update', data, 'POST');
export const reqInventoryDelete = (id) => ajax('/inventory/delete', {id}, 'GET');


//user
export const reqUserList = () => ajax('/user/list', null, 'GET');
export const reqUserDelete = (id) => ajax('/user/delete', {id}, 'GET');
export const reqUserAdd = (data) => ajax('/user/add', data, 'POST');
export const reqUserUpdate = (data) => ajax('/user/update', data, 'POST');

//order
export const reqOrderList = () => ajax('/order/list', null, 'GET');
export const reqWeekOrder = () => ajax('/order/week-list', null, 'GET');
export const reqFrontdeskList = () => ajax('/order/frontdesk-list', null, 'GET');
export const reqOrderSearch = (id) => ajax('/order/search', {id}, 'GET');
export const reqOrderRange = (start,end) => ajax('/order/range', {start, end}, 'GET');
export const reqOrderUpdate = (data) => ajax('/order/update', data, 'POST');

//Role
export const reqRoleList = () => ajax('/role/list', null, 'GET');
export const reqRoleDelete = (id) => ajax('/role/delete', {id}, 'GET');
export const reqRoleAdd = (data) => ajax('/role/add', data, 'POST');
export const reqRoleUpdate = (data) => ajax('/role/update', data, 'POST');

//Rule
export const reqRuleList = () => ajax('/rule/list', null, 'GET');
export const reqRuleUpdate = (data) => ajax('/rule/update', data, 'POST');






