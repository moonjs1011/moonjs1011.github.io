---
title: SSAFY X Kakao tech bootcamp AI Hackathon 회고
date: 2025-05-16
categories: [hackerton,kakao,ssafy]
tags: [hackerton, kakao,ssafy]     # TAG names should always be lowercase
comment: true
---

![hackerton](https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MTlfMjkz%2FMDAxNzc5MTQ3NTYwNTEy.nPfuws4BZH6r7svwhZSDacKKgB7cREmWkALq1B3c-KEg.xVAe1soR2e6oGY0i0c0cFiLq9rtItSkzesDxT89-7ngg.PNG%2F%25C7%25D8%25C4%25BF%25C5%25E6_%25B0%25F8%25C1%25F6%25281%25C2%25F7%2529.png&type=a340)

해커톤에 다녀왔습니다. 100개 이상팀이 지원했다는데 운이 좋게 상위 6개팀에 선정되어 용인 카카오 AI캠퍼스에 다녀왔습니다.

# 판교 카카오 본사

[사진]
판교에 집합해서 셔틀버스를 타고 용인까지 날라갔습니다. 가슴이 웅장해지네요. 역시 카카오는 다르구나

# 용인 AI 캠퍼스

처음 들어올때 정직원분들이 `도열` 해주시는데 기분이 이상했다. 열심히 할께요

[사진]

간략한 오리엔테이션을 하고 바로 작업에 들어갔다. 밥이 정말 건강하고 맛있게? 잘 나온다. 오래 일하기 위해 직원들의 건강을 잘 챙기는 것 같다.

# 해커톤 시작
우리 팀의 주제는  AI 민생 10대 프로젝트의 일환인 `AI 기반 보이스피싱 통신서비스 공동 대응 플랫폼`이다. 어느정도 코드 구현을 해놓고 가서 다행이였던거 같다.
나는 역할을 백엔드 개발자였다. `SpringBoot`로 구현을 진행했다. `DB`는 `PostgreSQL` 사용했다. MVP가 목표라 그냥 `NoSQL`를 고려했는데 초반 기획 단계에서 AI 모델 고도화를 위한  `VectorDB`가 필요할 수 있겠다 판단이 들어 psql를 사용했다.(결국에는 VectorDB 안씀)
# 위기
프로젝트 특성상 `SpringBoot` 서버는 Flutter와 Dashboard 사이에 껴서 `Proxy` 역할을 했는데. 정말 어려웠다. `AI`팀과 소통이 잘 안되서 힘들었던 것 같다. 모든 인원들이 같은 플로우를 이해하고, 같은 그림을 보고 있어야하는데 서로 전달이 안되고, 문서도 뒤죽박죽 섞이고 했던 말 계속 반복하고... 힘들었지만 재미있었다.







