---
title: 백준_1167번_트리의 지름[C++]
date: 2025-04-25 
categories: [ProblemSolving]
tags: [cpp, boj]     # TAG names should always be lowercase
comment: true
---

![img-description](/assets/img/boj.png)


<a href ='https://www.acmicpc.net/problem/1167'>[문제링크] </a>

가중치가 있는 트리의 지름을 구하는 문제다. 처음에는 다익스트라를 적용했지만 불필요한 우선순위 큐 연산으로 시간 제한을 통과하지 못했다. 트리의 경로가 유일하다는 특성을 이용해 DFS 두 번으로 해결했다.

```cpp
#include<iostream>
#include<vector>
#include<cstring>
#define MAXSIZE 100000+1
using namespace std;
int T;
struct Node{
    int adj_vid;
    int weight;
    Node(int adj_vid,int weight){
        this->adj_vid = adj_vid;
        this->weight = weight;
    }
};
vector<vector<Node>> adj_list(MAXSIZE);
bool visited[MAXSIZE];
int max_distance=0;
int longest_vid=1; //vertex 1에서 가장 먼 vertex를 저장
void dfs(int vid,int distance){
    if(visited[vid]){
        return;
    }
    visited[vid] = true;
    for(auto &node : adj_list[vid]){
        dfs(node.adj_vid, distance + node.weight);
   }
    if(max_distance < distance){
        max_distance = distance;
        longest_vid = vid;
    }
}
int main(){
    cin>>T;
    int input;
    while(T--){
        cin>>input;
        int vid = input;
        cin>>input;
        while(input!=-1){
            int adj_vid = input;
            cin>>input;
            int weight = input;
            cin>>input;
            Node node = Node(adj_vid,weight);
            adj_list[vid].push_back(node); //insert node
        }
    }
    dfs(1,0);
    memset(visited,false,MAXSIZE);
    dfs(longest_vid,0);
    cout<<max_distance<<"\n";
}

```
