---
title: 백준_2630_색종이만들기[Java]
date: 2026-01-26
categories: [ProblemSolving]
tags: [java, boj, divide-and-conquer]
comment: true
---

<a href='https://www.acmicpc.net/problem/2630'>[문제링크]</a>

`N x N` 종이를 4분할하면서 색이 다르면 재귀를 더 파는 전형적인 분할정복 문제. 구현은 심플한데, 재귀 흐름 한 번 정리해두려고 기록.

### 핵심 아이디어
- `check(y,x,size)`로 현재 영역이 단색인지 검사.
- 단색이면 색 카운트 후 반환, 아니면 `size/2`로 4분할 재귀 호출.
- 시간복잡도 `O(N^2 log N)` 정도(모든 칸을 높이만큼 재방문 가능).

### 코드 발췌
```java
static void divide(int y, int x, int size) {
    if (check(y, x, size)) {
        if (board[y][x]) blueCnt++; else whiteCnt++;
        return;
    }
    int h = size / 2;
    divide(y, x, h);
    divide(y, x + h, h);
    divide(y + h, x, h);
    divide(y + h, x + h, h);
}
```

### 포인트
- 단색 판별은 첫 칸 색을 기준으로 전체를 스캔.
- 입력이 최대 128이므로 재귀 깊이는 안전하지만, 다른 문제에선 스택 제한을 고려해 반복/스택 구현을 선택할 것.
