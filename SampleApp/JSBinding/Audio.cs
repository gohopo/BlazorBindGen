﻿using BlazorBindGen.Attributes;
using BlazorBindGen;
namespace SampleApp.JSBinding;

[JSWindow]
public partial class Audio
{
    [JSProperty(true)]
    public C A;

    [JSProperty]
    public int C;
    [JSFunction]
    public partial void B();
}

public class C:IJSObject
{
    
}