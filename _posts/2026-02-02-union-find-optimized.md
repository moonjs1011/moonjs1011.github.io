---
title: 백준_1717_집합의표현[Java]
date: 2026-02-02
categories: [ProblemSolving]
tags: [java, union-find]
comment: true
---

<a href='https://www.acmicpc.net/problem/1717'>[문제링크]</a>

Disjoint Set 기본기 복습용. 헷갈릴 때마다 다시 쓰게 돼서 아예 정리. `find`에 경로 압축만 얹은 버전이라 금방 구현 가능.

### 핵심 함수
```java
static int find(int v) {
    if (v == parent[v]) return v;
    return parent[v] = find(parent[v]); // 경로 압축
}

static void union(int a, int b) {
    int pa = find(a), pb = find(b);
    if (pa != pb) parent[pb] = pa;
}
```

### 메모
- 랭크(또는 사이즈) 기반 union을 더하면 한쪽 트리가 과도하게 깊어지는 것을 방지.
- 그래프 연결성, 사이클 판별, MST(Kruskal) 등에서 자주 사용되므로 기본기를 익혀 두면 편하다.
