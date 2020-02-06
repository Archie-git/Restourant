import $ from 'jquery';

export default function jsonp(url, data={}) {
    return new Promise(resolve => {
        data.key==="LOABZ-ONL6F-CLXJZ-N4A2L-AB74O-ITFWZ" ? data.output="jsonp" : data.ouput=undefined;
        $.ajax({
            url: url,
            type: "post",
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: ret => {
                resolve(ret)
            }
        })
    })
}