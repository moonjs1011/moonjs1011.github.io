---
title: 다익스트라 + 우선순위큐로 특정 경유 최단경로 구하기
date: 2026-03-12
categories: [Algorithm,Graph]
tags: [java, dijkstra, pq]
comment: true
---

스터디 때 밤새 붙잡았던 문제다. "1에서 N까지 가는데 v1, v2를 모두 거쳐야 한다"는 제약이 붙으니 구현이 헷갈렸다. 직접 자바로 정리해둔 기록.

## 문제 세팅
- 양방향 가중치 그래프, 정점은 1..N
- 반드시 v1, v2를 모두 통과해야 하며 순서는 자유
- 답은 `min(1→v1→v2→N, 1→v2→v1→N)`

## 핵심 코드
가중치가 큰 입력을 대비해 `INF = 200000 * 1000L`로 long을 사용했다. `poll()`한 값이 이미 더 큰 경우 스킵한다.

```java
PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1]-b[1]);
pq.offer(new int[]{start, 0});
while (!pq.isEmpty()) {
  int[] cur = pq.poll();
  if (cur[1] > dist[cur[0]]) continue; // 스킵 조건
  for (int[] e : adj[cur[0]]) {
    int next = e[0], w = e[1];
    if (dist[next] > dist[cur[0]] + w) {
      dist[next] = dist[cur[0]] + w;
      pq.offer(new int[]{next, (int)dist[next]});
    }
  }
}
```

### 시간 복잡도
`O(E log V)`. 우선순위 큐에서 간선 수만큼 `offer`가 일어나며, `poll`/`offer`가 `log V`를 가진다.

## 자주 틀리는 포인트
- **INF를 int로 두면 오버플로우**: 큰 입력에서 음수로 뒤집힌다.
- **방문 체크를 boolean으로만 처리**하면 더 짧은 경로가 들어올 때 갱신이 안 된다. "거리 기반 스킵" 조건이 안전하다.
- **경유 조합 계산**: `1→v1→v2→N`과 `1→v2→v1→N` 두 값 중 최소, 둘 중 하나라도 INF 이상이면 -1 출력.

## 샘플 입출력
입력
```
4 6
1 2 3
2 3 3
3 4 1
1 3 5
2 4 5
1 4 4
2 3
```
출력
```
7
```
경로: 1→2(3)→3(3)→4(1) = 7

## 한눈 그림
`1`에서 시작해 v1, v2를 각각 거쳐 N으로 가는 두 화살표를 그려두면, 두 경로 길이만 비교하면 된다는 점이 명확해진다.

## 배운 점
- long 기반 다익스트라 습관화
- 스킵 조건 하나로 방문배열 없이 깔끔하게 처리 가능
- 경유 노드가 있을 때도 단순히 다익스트라 세 번이면 해결
