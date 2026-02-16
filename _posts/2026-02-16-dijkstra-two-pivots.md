---
title: 백준_1504_특정한최단경로[Java]
date: 2026-02-16
categories: [ProblemSolving]
tags: [java, boj, dijkstra]
comment: true
---

<a href ='https://www.acmicpc.net/problem/1504'>[문제링크]</a>

정점 `v1`, `v2` 둘 다 들러야 하는 다익스트라 응용. C++로 풀었던 거 Java로 다시 구현해 봄. 그냥 3번 돌리면 끝나는 문제.

### 접근
1. 시작(1), `v1`, `v2`를 각각 출발점으로 다익스트라 3번 실행 → `dict1`, `dictV1`, `dictV2`.
2. 가능한 경로 두 개
   - 1 → v1 → v2 → N
   - 1 → v2 → v1 → N
3. 두 값의 최소를 답으로 선택, 도달 불가면 -1.

### 핵심 스니펫
```java
Long[] dict1  = dijkstra(1);
Long[] dictV1 = dijkstra(v1);
Long[] dictV2 = dijkstra(v2);

long path1 = dict1[v1] + dictV1[v2] + dictV2[N];
long path2 = dict1[v2] + dictV2[v1] + dictV1[N];
long ans = Math.min(path1, path2);
System.out.println(ans >= INF ? -1 : ans);
```

### 포인트
- 다익스트라를 소스 노드마다 한 번씩만 돌려 모든 목적지 비용을 재사용 → O(3 * E log V).
- INF를 충분히 크게 설정하고 오버플로를 피하기 위해 `long` 사용.
