---
title: 세그먼트 트리로 구간합과 포인트 업데이트 처리하기
date: 2026-03-14
categories: [Algorithm,DataStructure]
tags: [java,segment-tree,range-sum]
comment: true
---

구간 합 질의가 잦은데 값도 자주 바뀌는 문제를 풀면서 세그먼트 트리를 다시 손에 익혔다. 스터디 때 쓴 자바 코드를 정리해둔다.

## 노드 의미와 배열 인덱싱
- `segmentTree[node]`는 구간 `[nodeL, nodeR]` 합을 담는다.
- 부모의 왼쪽·오른쪽 자식 인덱스는 `2*node`, `2*node+1`.
- 트리 크기는 안전하게 `4*N` 배열을 잡는다.

## 핵심 코드
```java
long query(int node, int l, int r, int ql, int qr) {
  if (qr < l || r < ql) return 0;
  if (ql <= l && r <= qr) return segmentTree[node];
  int mid = (l + r) / 2;
  return query(node*2, l, mid, ql, qr) +
         query(node*2+1, mid+1, r, ql, qr);
}
```
업데이트 역시 리프까지 내려가 값을 바꾼 뒤, 돌아오면서 부모 합을 다시 계산한다.

## 복잡도 비교
- `build`는 입력을 차례로 `update`해도 총 `O(N log N)`
- `range sum`과 `point update` 모두 `O(log N)`
- 단순 prefix sum은 업데이트가 잦을 때 `O(N)`이라 비효율적이다.

## 예제 입출력
입력
```
5 2 2
1
2
3
4
5
2 1 3
1 3 10
2 2 5
```
출력
```
6
21
```
설명: 처음 합(1~3)=6, 세 번째 값을 10으로 바꾼 뒤 2~5 합이 21.

## 구현하면서 느낀 점
- 범위 밖일 때 0을 반환하는 패턴이 직관적이고 오류가 적다.
- 업데이트 후 부모를 즉시 재계산하면 별도 `build` 함수가 필요 없다.
- 세그먼트 트리는 "구간 질의 + 잦은 업데이트"라는 문제 특화 도구다. 문제에서 두 조건이 동시에 나오면 바로 떠올릴 것.

