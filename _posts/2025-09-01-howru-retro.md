---
title: HowRU 프로젝트 회고 - 배포 막판에 겪은 네 가지 이슈
date: 2025-09-01
categories: [Project,Retrospective]
tags: [howru, kafka, cors, auth, msa]
comment: true
---

팀 HowRU 백엔드 레포(`/Users/sung_1/Documents/멋사/howru/server`)에서 배포 막판에 부딪힌 이슈 네 가지를 기록했다. 숫자 옆의 코드들은 다 커밋 해시였는데, 글 흐름만 남기고 지웠다.

## 1) 배포 환경 Kafka 미연결
- 증상: MSK 연결이 실패하면서 애플리케이션이 부팅 중단.
- 조치: KafkaConfig와 테스트 컨슈머에 `@Profile("dev")`를 붙여 운영에서는 Kafka bean을 만들지 않도록 분리. 외부 API 헬스체크도 prod에서는 실패해도 앱이 계속 뜨게 분기. 운영 `application.yml` 기본 프로필을 prod로 고정.
- 결과: Kafka 장애와 무관하게 앱이 기동, 웹소켓/HTTP 경로는 정상 제공.

## 2) 프런트 CORS 차단
- 증상: 배포 후 프런트에서 토큰 요청이 CORS로 막힘.
- 조치: prod에서도 dev와 동일하게 origin 화이트리스트를 넓게 설정(실제 도메인 + localhost 3000/5173/8080). allowed-origins 비어 있으면 모든 origin 허용하도록 fallback 경고 추가.
- 결과: 배포 환경에서도 브라우저 요청 성공, 추가 릴리즈 없이 설정으로 해결.

## 3) refresh_token 길이 초과
- 증상: 소셜 로그인 후 긴 리프레시 토큰이 DB에 저장되지 않아 재발급 실패.
- 조치: `Auth.refreshToken` 컬럼을 `columnDefinition = "text"`로 변경해 varchar 길이 제한 제거.
- 결과: 토큰 저장/재발급 정상화, 로그아웃 없이 세션 연장이 가능해짐.

## 4) ddl-auto 실수로 스키마 초기화
- 증상: 운영에서 `ddl-auto: create`로 배포되어 테이블 재생성 위험.
- 조치: 즉시 `update`로 롤백, 데이터 드롭 방지.
- 결과: 이후 배포에서 데이터 보존, 마이그레이션은 Flyway로 별도 관리 예정.

## 배운 점
- 운영 프로필에서 외부 의존성 실패가 부팅을 막지 않도록 \"필수 vs 옵션\"을 분리해야 한다.
- CORS는 환경별 분기보다 \"안전한 기본값 + 좁힐 수 있는 설정\"이 실수를 줄인다.
- 토큰·로그·메시지처럼 길이 가변 데이터는 처음부터 text/clob로 잡자.
- ddl-auto는 로컬 전용. 운영은 마이그레이션 도구를 기본으로 사용한다.

다음 액션: Kafka를 다시 붙일 때는 prod 전용 설정 파일을 되살리고, MSK 자격·보안 설정을 점검한 뒤 헬스체크를 prod에서도 강제하도록 되돌릴 계획이다.
