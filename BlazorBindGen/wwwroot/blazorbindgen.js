﻿let props = new Object();
let dotnet;
export function initDotnet(net) {
    dotnet = net;
}
export function createwin(h) {
    props[h] = window;
}
export let propval = (pname, h) => props[h][pname];
export let propvalwin = (pname) => window[pname];
export function propref(pname, proph, h) {
    props[proph] = props[h][BINDING.conv_string(pname)];
}
export function deleteprop(phash) {
    delete props[phash];
}
export let isprop = (pname, h) => typeof (props[h][BINDING.conv_string(pname)]) != "function"
    && typeof (props[h][BINDING.conv_string(pname)]) != undefined;

export let isfunc = (pname, h) => typeof (props[h][pname]) == "function";

export function propset(pname, val, h) {
    props[h][pname] = val;
}
export function propsetref(pname, ph, h) {
    props[h][pname] = props[ph];
}
export function func(fname,params, h) {
    return props[h][fname](...paramexpand(params));
}
export function funcref(fname, params, ph, h) {
    props[ph] = props[h][fname](...paramexpand(params));
}
export function funcvoid(fname, params, h) {
    props[h][fname](...paramexpand(params));
}
function paramexpand(param) {
    var res = [];
    param.forEach((pm) => {
        let r;
        switch (pm.type) {
            case 1:
                r = props[pm.value];
                break;
            case 2:
                r = callbackHandler.bind(pm.value);
                break;
            default:
                r = pm.value;
                break;
        }
        res.push(r);
    });
    return res;
}
function callbackHandler() {
    let arg = [];
    for (var i = 0; i < arguments.length; i++) {
        arg.push(arguments[i]);
    }
    this.invokeMethod("ExecuteInCSharp", arg);
}
export async function funcrefawait(fname, params, eh, ph,h) {
    let er = "";
    try { props[ph] = await props[h][fname](...paramexpand(params)); }
    catch (e) { er = e.toString(); }
    dotnet.invokeMethod("errorMessage", eh, er, null);
}
export async function funcvoidawait(fname, params, eh,h) {
    let er = "";
    try { await props[h][fname](...paramexpand(params)); }
    catch (e) { er = e.toString(); }
    dotnet.invokeMethod("errorMessage", eh, er, null);
}
export async function funcawait(fname, params, eh, h){
    let er = "",v=null;
    try { v = await props[h][fname](...paramexpand(params)); }
    catch (e) { er = e.toString(); }
    dotnet.invokeMethod("errorMessage", eh, er, v);
}
export async function importmod(module, eh) {
    let er = "";
    try { await import(module); }
    catch (e) { er = e.toString(); }
    dotnet.invokeMethod("errorMessage", eh, er, null);
}
export function construct(classname, param, eh, h) {
    props[eh] = new props[h][classname](...paramexpand(param));
}
export let asjson=(h)=>JSON.stringify(props[h]);
export let to = (h) => props[h];