---
layout: post
title: Introduction to C++ multithread Part 1
---

深入淺出C++ multithread part1

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

{% highlight cpp %}
#include <thread>
#include <iostream>
using namespace std;
void thread_function(){
    cout << "I am a new thread "<< std::endl;
}
int main(){
    thread t1(thread_function);
    t1.join();// without this line, program will abort
    return 0;
}
{% endhighlight %}

簡直輕鬆愉快 這裏有一點要注意 
你要把原本的程式想成一個master thread 
他new一個thread出去的時候你必須要等它跑完 自己才能結束掉 
master thread 會在t1.join()那行等t1跑完 才會繼續往下跑 
如果master return 的時候還有thread在跑 整個程式會直接abort 
不過你也可以call detach function
意思就是你跟我再也沒有關係 master就可以放生它自己結束程式

{% highlight cpp %}
#include <thread>
#include <iostream>
#include <unistd.h>
using namespace std;
void thread_function(){
    cout << "I am a new thread"<< std::endl;
    usleep(2000);
    cout << "This messenge is unlikely to show"<< std::endl;
}

int main(){
    thread t1(thread_function);
    t1.detach();
    
    cout << "I am master thread and I am about to finish"<< std::endl;
    return 0;
}
{% endhighlight %}

### 給thread參數

{% highlight cpp %}
#include <thread>
#include <iostream>
#include <string>
#include <vector>
using namespace std;
void func(int i, string s)
{
    std::cout << i << ", " << s << std::endl;
}

int main()
{
    vector<thread> threads;
    for(int i = 0; i < 10; i++){
        threads.push_back(thread(func, i, "test"));
    }   
    for(int i = 0; i < threads.size(); i++){
        threads[i].join();
    }   
    return 0;
}
{% endhighlight %}
相當簡單易懂 給thread的第一個參數就是function, 之後就是function的arguments
最後 每個thread有自己的id 可以呼叫get_id()取得
{% highlight cpp %}
#include <thread>
#include <iostream>
#include <string>
#include <vector>
using namespace std;
void func(int i, string s)
{
        std::cout << i << ", " << s << std::endl;
}

int main()
{
    vector<thread> threads;
    for(int i = 0; i < 10; i++){
        threads.push_back(thread(func, i, "test"));
    }   
    for(int i = 0; i < threads.size(); i++){
        cout << threads[i].get_id() << endl;
        threads[i].join();
    }   
    return 0;
}
{% endhighlight %}

Part1的內容主要是瞭解C++的基本syntax, 下一篇鎖就會進場 儘請期待
