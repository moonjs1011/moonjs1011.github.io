---
title: LCS - 순수 재귀 vs 메모이제이션 성능 비교
date: 2026-03-13
categories: [Algorithm,DynamicProgramming]
tags: [java,lcs,dp]
comment: true
---

두 문자열의 최장 공통 부분수열(LCS)을 풀다가, 캐시를 켜고 끈 상태가 얼마나 다른지 직접 찍어봤다. 손에 익힌 느낌을 적어둔다.

## 문제와 기초 재귀
기본 재귀식은 다음과 같다. 문자가 같으면 1을 더하고, 아니면 두 가지 분기를 비교한다.

```java
int LCS(int i, int j) {
  if (i == n || j == m) return 0;
  if (a.charAt(i) == b.charAt(j)) return 1 + LCS(i+1, j+1);
  return Math.max(LCS(i+1, j), LCS(i, j+1));
}
```

이 방식은 동일한 `(i,j)`를 수없이 다시 계산해 `O(2^(n+m))` 수준까지 폭발한다.

## 메모이제이션 테이블
`boolean[][] isCached`와 `int[][] cache`를 두고 처음 계산한 결과를 저장한다. 이미 계산된 좌표면 바로 반환한다.

```java
if (!isCached[i][j]) {
  isCached[i][j] = true;
  if (a.charAt(i) == b.charAt(j)) cache[i][j] = 1 + LCS(i+1, j+1);
  else cache[i][j] = Math.max(LCS(i+1, j), LCS(i, j+1));
}
return cache[i][j];
```

공간 복잡도는 `O(n*m)`이지만 시간은 `O(n*m)`으로 줄어든다.

## 실측 결과 (길이 1000 랜덤 문자열)
`System.currentTimeMillis()`로 측정한 결과:

| 방법 | 실행 시간 | 비고 |
| --- | --- | --- |
| 순수 재귀 | 계산 불가(수 초 이상) | 호출 트리 폭발 |
| 메모이제이션 | 약 40~60ms | 동일 입력 |

실습 코드: `/Users/sung_1/Documents/2026-1/Algorithm/study-season-01/06 Dynamic Programming/문성원/LCS_Non_DP.java`, `LCS_DP.java`.

## 호출 트리 직관
- 재귀만 쓰면 `(i,j)` 조합이 다시 등장할 때마다 분기한다. 깊이가 길어질수록 동일한 서브문제를 수십만 번 반복하게 된다.
- 캐시를 쓰면 각 `(i,j)`가 최대 한 번만 계산된다.

## 배운 점
- 큰 입력에서는 메모이제이션이 필수: 시간 복잡도 `O(n*m)`을 확보.
- 캐시 여부를 `boolean`으로 두면 0이 실제 값일 때도 판별이 가능해 깔끔하다.
- 무작정 DP 테이블을 바텀업으로 짜기 전에, 재귀 + 캐시가 빠르고 작성도 단순하다.
