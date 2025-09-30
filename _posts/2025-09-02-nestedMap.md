---
title: C++ STL로 Double Map 구현 [희망편]
date: 2025-09-25
categories: [C++,DataStructure,Double Map,Nested Map]
tags: [cpp,datastructure]     # TAG names should always be lowercase
comment: true
---

![STL](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWi65XcWLRp6Qa1QVUKu3OdM0yeY9XXVrgA&s)

# 일반적인 Map

일반적인 HashMap의 특정 원소에 `Key`값으로 접근할 수 있다. 예를 들어 `Map`이 다음과 같이 정의되어 있다고 가정하자.
```cpp
map<char,int> map
```
Key,Value 다음과 같다고 가정하자.
|     |     |
| --- | --- |
| `A` | 1   |
| `B` | 6   |
| `C` | 11  |
| `D` | 16  |
| `E` | 21  |

value 11에게 접근하기 위해서는 `map['C']`라고 사용해야한다. 보통의 배열이 `int`형 index로 원소값에 접근하지만, `Map`은 다양한 자료형을 통해 접근이 가능하다. 그러나 2차원 배열처럼 `Map`을 사용하려면 어떻게 해야 할까? `map['C']['B']`처럼 접근하여 값을 찾고 싶은 것이다.


# Double Map
본론부터 말하자면 다음과 같이 선언하면 Map을 2차원 배열처럼 사용이 가능하다.
```cpp
map<char, map<char, int>> doubleMap;
```
내가 가정한 2차원 테이블은 다음과 같다.
## Table 

|     | `A` | `B` | `C` | `D` | `E` |
| --- | --- | --- | --- | --- | --- |
| `A` | 1   | 2   | 3   | 4   | 5   |
| `B` | 6   | 7   | 8   | 9   | 10  |
| `C` | 11  | 12  | 13  | 14  | 15  |
| `D` | 16  | 17  | 18  | 19  | 20  |
| `E` | 21  | 22  | 23  | 24  | 25  |

## 예제 코드 
```cpp
#include<iostream>
#include<map>

using namespace std;

int main() {
    map<char, map<char, int>> doubleMap; //init
    int num = 1;
    for (char col_ch = 'A'; col_ch <= 'E'; col_ch++) {
        for (char row_ch = 'A'; row_ch <= 'E'; row_ch++) {
            doubleMap[col_ch][row_ch] = num++;
        }

    }
    for (auto e: doubleMap) { //e = pair<char,map<char,int>>
        for (auto kv: e.second) { // kv = map<char,int>
            cout << "doubleMap['" << e.first << "'] " << "['" << kv.first << "']" << " = " << kv.second << " ";
        }
        cout << "\n";
    }
}
```
## 결과 
```
doubleMap['A'] ['A'] = 1 doubleMap['A'] ['B'] = 2 doubleMap['A'] ['C'] = 3 doubleMap['A'] ['D'] = 4 doubleMap['A'] ['E'] = 5 
doubleMap['B'] ['A'] = 6 doubleMap['B'] ['B'] = 7 doubleMap['B'] ['C'] = 8 doubleMap['B'] ['D'] = 9 doubleMap['B'] ['E'] = 10 
doubleMap['C'] ['A'] = 11 doubleMap['C'] ['B'] = 12 doubleMap['C'] ['C'] = 13 doubleMap['C'] ['D'] = 14 doubleMap['C'] ['E'] = 15 
doubleMap['D'] ['A'] = 16 doubleMap['D'] ['B'] = 17 doubleMap['D'] ['C'] = 18 doubleMap['D'] ['D'] = 19 doubleMap['D'] ['E'] = 20 
doubleMap['E'] ['A'] = 21 doubleMap['E'] ['B'] = 22 doubleMap['E'] ['C'] = 23 doubleMap['E'] ['D'] = 24 doubleMap['E'] ['E'] = 25 
```
의도했던 바와 같다.


PS를 하다가 일반적인 `int`형 `index` 접근(2차원 배열, `matrix[4][5]`와 같은)이 아닌 `string`형 `key` 접근이 필요한 순간이 온다. 예를 들어 `doubleMap["John"]["James"] = 5` 처럼 인물간의 관계를 표현할 때 사용된다.
이런 경우에는 다음과 같이 선언하면 된다.
```cpp
map<string, map<string, int>> doubleMap;
```

다음번에는 STL을 사용하지 않고 직접 구현을 해봐야겠다.
