---
layout: post
title: Introduction to C++ multithread
---

深入淺出C++ multithread

### 為什麼要學multithread
我認為在學校念書的時候 沒有什麼機會寫multi-thread的程式 上系統程式比較多琢磨在multi-process 但其實在業界非常常需要處裡多線程的問題 
如果你想在美國找工作 面試很常問的follow up就是你的code要怎麼處理多線程的application 一般的candidate就只知道說 在access shared data前lock, access完之後unlock 
但要如何在面試中脫穎而出就是要看你的實戰經驗 市面上教面試的書大多都是用java教學 我也花了很大的苦心才知道C++怎麼玩多線程 希望把經驗分享一下 讓大家少走一點冤枉路

### 環境
本篇的範例只要你有C++11的compiler就可以跑 筆者用4.2.1版本 基本上你用mac 有install Xcode之後應該都可以跑
```
> g++ -std=c++ filename.cpp
```

### New 一個thread

```C++
#include <thread>                                                                                           
#include <iostream>
using namespace std;
void thread_function(){
    cout << "I am a new thread "<< std::endl;
}
int main(){
    thread t1(thread_function);
    t1.join();
    return 0;
}
```
簡直輕鬆愉快
