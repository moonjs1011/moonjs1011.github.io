---
title: 백준_1197_최소스패닝트리[Java]
date: 2026-02-09
categories: [ProblemSolving]
tags: [java, mst, prim]
comment: true
---

<a href='https://www.acmicpc.net/problem/1197'>[문제링크]</a>

인접 리스트 + 우선순위 큐로 프림 알고리즘 구현. 크루스칼이랑 자꾸 헷갈려서 PQ 버전만 짧게 적어둔다.

### 흐름
1. 임의 시작 정점의 가중치를 0으로 두고 PQ 삽입.
2. PQ에서 최소 간선을 꺼내 방문하지 않았으면 MST 가중치에 누적.
3. 해당 정점에서 나가는 간선으로 이웃의 최소 비용을 갱신하며 PQ에 push.

### 코드 발췌
```java
int[] dist = new int[N];
Arrays.fill(dist, Integer.MAX_VALUE);
PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1]-b[1]);
dist[0] = 0; pq.offer(new int[]{0,0});

while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    int v = cur[0], w = cur[1];
    if (visited[v]) continue;
    visited[v] = true; mst += w;
    for (int[] nxt : G[v]) {
        if (!visited[nxt[0]] && dist[nxt[0]] > nxt[1]) {
            dist[nxt[0]] = nxt[1];
            pq.offer(new int[]{nxt[0], dist[nxt[0]]});
        }
    }
}
```

### 포인트
- Dense 그래프는 O(V^2) 배열 프림이 단순하지만, `PQ + 인접 리스트`는 희소 그래프에서 O(E log V)로 유리.
- 크루스칼과 비교: 프림은 연결된 상태 유지, 크루스칼은 간선 정렬 후 union-find로 연결.
