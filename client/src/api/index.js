/*该模块包含应用中所有接口请求函数
*每个函数的返回值都是promise
 */
import ajax from './ajax';
import jsonp from './jsonp'


const WEATHER_URL="https://free-api.heweather.net/s6/weather/now";
const WEATHER_KEY="0894aab8b0394389a7ac887e32db9c30";
const LOCATION_URL="https://apis.map.qq.com/ws/location/v1/ip";
const LOCATION_KEY="LOABZ-ONL6F-CLXJZ-N4A2L-AB74O-ITFWZ";

export const reqLogin = (username,password) => ajax('/login',{username, password},'POST');
export const reqWeather = (location, key=WEATHER_KEY) => ajax(WEATHER_URL,{location, key}	,'GET');
export const reqCity = (key=LOCATION_KEY) => jsonp(LOCATION_URL, {key});

