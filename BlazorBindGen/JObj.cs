﻿using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorBindGen
{
    public class JObj : IJObj
    {
        internal int Hash { get; set; }
        internal static int HashTrack = 0;

        internal JObj()
        {
            Hash = HashTrack++;
        }
        ~JObj()
        {
            //dispose
        }

        public T Prop<T>(string propname)
        {
            return BindGen.Module.Invoke<T>("prop", propname, Hash);
        }
        public async ValueTask<T> PropAsync<T>(string propname)
        {
            return await BindGen.Module.InvokeAsync<T>("prop", propname, Hash);
        }
        public JObj PropRef(string propname)
        {
            var obj = new JObj();
            BindGen.Module.InvokeVoid("propref", propname, obj.Hash, Hash);
            return obj;
        }
        public async ValueTask<JObj> PropRefAsync(string propname)
        {
            var obj = new JObj();
            await BindGen.Module.InvokeVoidAsync("propref", propname, obj.Hash, Hash);
            return obj;
        }

    }
}
