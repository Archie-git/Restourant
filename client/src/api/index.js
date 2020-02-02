/*该模块包含应用中所有接口请求函数
*每个函数的返回值都是promise
 */

import ajax from './ajax';

export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST');
export const reqAddUser=(user)=>ajax('/add',user,'POST');