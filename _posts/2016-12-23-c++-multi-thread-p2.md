---
layout: post
title: Introduction to C++ multithread Part 2
---

深入淺出C++ multithread part2

### lock
恭喜你 現在已經走出十里坡 現在開始來動真格了 融會貫通才是真本事 來看一下stackoverflow對於thread和process的比較http://stackoverflow.com/questions/200469/what-is-the-difference-between-a-process-and-a-thread

> Both processes and threads are independent sequences of execution. The typical difference is that threads (of the same process) run in a shared memory space, while processes run in separate memory spaces.

比如說下面的例子
```C++
#include <iostream>
#include <string>
#include <vector>
using namespace std;
void func(int &s) 
{
    s++;
}

int main()
{
    vector<thread> threads;
    int sum = 0;
    for(int i = 0; i < 1000; i++){
        threads.push_back(thread(func, ref(sum)));
    }   
    for(int i = 0; i < threads.size(); i++){
        threads[i].join();
    }   
    cout << sum << endl;
    return 0;
}
```
每次執行結果都會不一樣 偶爾剛好1000偶爾小於1000 原因很簡單 要改變一個變數需要三個步驟

1.register讀變數

2.加一

3.register存回原本address

問題來了 如果某一個thread正在step2, 還沒做到step3的時候 另一個thread 進來做step1, 那最後總數就會小於等於預期的值
所以在處理multi-thread的問題的時候 一定要處理好shared data的access 如果多個thread同時更動同樣data 就會有race condition的問題
這時候就需要鼎鼎大名的mutex來控管操控權限
```C++
#include <thread>
#include <iostream>
#include <string>
#include <vector>
#include <mutex>
using namespace std;
struct Sum{
    int sum = 0;
    mutex mu; 
    void incre(){
        mu.lock();
        sum++;
        mu.unlock();
    }   
};
void func(Sum &s) 
{
    s.incre();
}
int main()
{
    vector<thread> threads;
    Sum s;
    for(int i = 0; i < 10000; i++){
        threads.push_back(thread(func, ref(s)));                                                           
    }   
    for(int i = 0; i < threads.size(); i++){
        threads[i].join();
    }   
    cout << s.sum << endl;
    return 0;
}
```
這裏把sum這個variable跟mutex包在一起 是個比較理想的做法 當然你要用global variable我也阻止不了你 
可是大家都知道global variable is evil 特別是多線程的program 不想debug到死就要養成好習慣
