﻿using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace BlazorBindGen
{
    public interface IJavaScriptObject
    {
        public T Val<T>(string propname);
        public ValueTask<T> ValAsync<T>(string propname);
        public JObj PropRef(string propname);
        public ValueTask<JObj> PropRefAsync(string propname);
        public void SetVal<T>(string propname,T value);
        public void SetPropRef(string propname,JObj obj);
        public bool IsProp(string propname);
        public bool IsFunc(string propname);
        public T Func<T>(string funcname, params object[] param);
        public void FuncVoid(string funcname, params object[] param);
        public void FuncVoidAsync(string funcname, params object[] param);

        public ValueTask<T> FuncAsync<T>(string funcname,params object[] param);
        public JObj FuncRef(string funcname, params object[] param);
        public ValueTask<JObj> FuncRefAsync(string funcname, params object[] param);

        public ValueTask FuncVoidAwaitAsync(string funcname, params object[] param);
        public ValueTask<T> FuncAwaitAsync<T>(string funcname, params object[] param);
        public ValueTask<JObj> FuncRefAwaitAsync(string funcname, params object[] param);

    }
}