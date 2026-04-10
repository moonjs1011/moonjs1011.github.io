---
title: 인프라 구축 가이드 - VPC부터 ECS까지 체크리스트
date: 2025-09-10
categories: [Infrastructure,AWS]
tags: [vpc, subnet, ec2, ecs, ecr, github-actions, rds, redis]
comment: true
---

PDF로 정리해둔 인프라 구축 가이드를 블로그용으로 다시 요약했다. VPC 설계부터 RDS/Redis, ECR 빌드 파이프라인, ECS 서비스 배포까지 한 번에 확인할 수 있는 체크리스트다. 원본 PDF(스크린샷 포함)를 바로 볼 수 있도록 첨부했다.

## 전체 문서/스크린샷 보기
- 바로 보기: <object data="/assets/files/infra-guide.pdf" type="application/pdf" width="100%" height="800px"></object>
- 다운로드: [infra-guide.pdf](/assets/files/infra-guide.pdf)
- 대표 페이지 미리보기  
![infra guide page1](/assets/img/infra-guide-page1.png)

## 페이지별 원본 이미지 (1:1)
PDF 69페이지를 모두 이미지로 변환해 순서대로 첨부했다.

![p1](/assets/img/infra-guide/infra-guide-01.jpg)
![p2](/assets/img/infra-guide/infra-guide-02.jpg)
![p3](/assets/img/infra-guide/infra-guide-03.jpg)
![p4](/assets/img/infra-guide/infra-guide-04.jpg)
![p5](/assets/img/infra-guide/infra-guide-05.jpg)
![p6](/assets/img/infra-guide/infra-guide-06.jpg)
![p7](/assets/img/infra-guide/infra-guide-07.jpg)
![p8](/assets/img/infra-guide/infra-guide-08.jpg)
![p9](/assets/img/infra-guide/infra-guide-09.jpg)
![p10](/assets/img/infra-guide/infra-guide-10.jpg)
![p11](/assets/img/infra-guide/infra-guide-11.jpg)
![p12](/assets/img/infra-guide/infra-guide-12.jpg)
![p13](/assets/img/infra-guide/infra-guide-13.jpg)
![p14](/assets/img/infra-guide/infra-guide-14.jpg)
![p15](/assets/img/infra-guide/infra-guide-15.jpg)
![p16](/assets/img/infra-guide/infra-guide-16.jpg)
![p17](/assets/img/infra-guide/infra-guide-17.jpg)
![p18](/assets/img/infra-guide/infra-guide-18.jpg)
![p19](/assets/img/infra-guide/infra-guide-19.jpg)
![p20](/assets/img/infra-guide/infra-guide-20.jpg)
![p21](/assets/img/infra-guide/infra-guide-21.jpg)
![p22](/assets/img/infra-guide/infra-guide-22.jpg)
![p23](/assets/img/infra-guide/infra-guide-23.jpg)
![p24](/assets/img/infra-guide/infra-guide-24.jpg)
![p25](/assets/img/infra-guide/infra-guide-25.jpg)
![p26](/assets/img/infra-guide/infra-guide-26.jpg)
![p27](/assets/img/infra-guide/infra-guide-27.jpg)
![p28](/assets/img/infra-guide/infra-guide-28.jpg)
![p29](/assets/img/infra-guide/infra-guide-29.jpg)
![p30](/assets/img/infra-guide/infra-guide-30.jpg)
![p31](/assets/img/infra-guide/infra-guide-31.jpg)
![p32](/assets/img/infra-guide/infra-guide-32.jpg)
![p33](/assets/img/infra-guide/infra-guide-33.jpg)
![p34](/assets/img/infra-guide/infra-guide-34.jpg)
![p35](/assets/img/infra-guide/infra-guide-35.jpg)
![p36](/assets/img/infra-guide/infra-guide-36.jpg)
![p37](/assets/img/infra-guide/infra-guide-37.jpg)
![p38](/assets/img/infra-guide/infra-guide-38.jpg)
![p39](/assets/img/infra-guide/infra-guide-39.jpg)
![p40](/assets/img/infra-guide/infra-guide-40.jpg)
![p41](/assets/img/infra-guide/infra-guide-41.jpg)
![p42](/assets/img/infra-guide/infra-guide-42.jpg)
![p43](/assets/img/infra-guide/infra-guide-43.jpg)
![p44](/assets/img/infra-guide/infra-guide-44.jpg)
![p45](/assets/img/infra-guide/infra-guide-45.jpg)
![p46](/assets/img/infra-guide/infra-guide-46.jpg)
![p47](/assets/img/infra-guide/infra-guide-47.jpg)
![p48](/assets/img/infra-guide/infra-guide-48.jpg)
![p49](/assets/img/infra-guide/infra-guide-49.jpg)
![p50](/assets/img/infra-guide/infra-guide-50.jpg)
![p51](/assets/img/infra-guide/infra-guide-51.jpg)
![p52](/assets/img/infra-guide/infra-guide-52.jpg)
![p53](/assets/img/infra-guide/infra-guide-53.jpg)
![p54](/assets/img/infra-guide/infra-guide-54.jpg)
![p55](/assets/img/infra-guide/infra-guide-55.jpg)
![p56](/assets/img/infra-guide/infra-guide-56.jpg)
![p57](/assets/img/infra-guide/infra-guide-57.jpg)
![p58](/assets/img/infra-guide/infra-guide-58.jpg)
![p59](/assets/img/infra-guide/infra-guide-59.jpg)
![p60](/assets/img/infra-guide/infra-guide-60.jpg)
![p61](/assets/img/infra-guide/infra-guide-61.jpg)
![p62](/assets/img/infra-guide/infra-guide-62.jpg)
![p63](/assets/img/infra-guide/infra-guide-63.jpg)
![p64](/assets/img/infra-guide/infra-guide-64.jpg)
![p65](/assets/img/infra-guide/infra-guide-65.jpg)
![p66](/assets/img/infra-guide/infra-guide-66.jpg)
![p67](/assets/img/infra-guide/infra-guide-67.jpg)
![p68](/assets/img/infra-guide/infra-guide-68.jpg)
![p69](/assets/img/infra-guide/infra-guide-69.jpg)

## 1. 네트워크 설계
- **VPC**: 하나의 VPC에서 퍼블릭/프라이빗 서브넷을 분리. AZ 2개 이상으로 구성해 가용성 확보.
- **보안 그룹**: 백엔드용 SG를 만들고, 관리용 SSH는 필요 시에만 임시로 추가. ALB에서만 백엔드 포트로 인바운드 허용.
- **라우팅**: 퍼블릭 서브넷에 인터넷 게이트웨이, 프라이빗 서브넷에 NAT 게이트웨이 연결. 라우팅 테이블이 올바른지 재확인.

## 2. 데이터 계층 (RDS & Redis)
- **RDS (PostgreSQL)**: 파라미터 그룹/옵션 그룹 설정 후 프라이빗 서브넷에 생성. 백업 보존 기간과 다중 AZ 옵션 체크.
- **ElasticCache Redis**: 파라미터 그룹 생성 → 복제 그룹 생성 → 파이널 스냅샷 설정. 애플리케이션 보안 그룹만 접근 허용.

## 3. 빌드·배포 파이프라인 (GitHub Actions + ECR)
- **ECR 리포지토리**: 서비스별로 리포 분리(backend, qa, server-app, base-app 등). 이미지 태그 규칙은 `git sha` 또는 `latest`+버전 번호.
- **필수 시크릿**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `ECR_REGISTRY_URI`, `REDIS_HOST`, `REDIS_PASSWORD` 등을 GitHub Secrets에 저장.
- **워크플로우 구조**
  - `deploy.yml`: 각 앱의 Dockerfile 빌드 → ECR 푸시 → ECS task-definition 갱신.
  - 앱별 task definition JSON (예: `prod-test-task_definition.json`, `apps-recommend-task_definition.json`, `likenotateme-task_definition.json`)을 리포지토리에 보관하고 갱신 시 사용.
  - 필요 시 QA/스테이징 배포용 별도 workflow(`qa` 브랜치 트리거)로 분리.

## 4. ECS 서비스
- **클러스터/네임스페이스**: Cloud Map 네임스페이스 생성 후 서비스들이 내부 DNS로 서로 찾도록 설정.
- **서비스 정의**: 각 task definition을 기반으로 서비스 생성, 롤링 업데이트로 최소 건강 인스턴스 유지.
- **로드밸런서 연결**: ALB 리스너 → 대상 그룹 → 서비스 포트 매핑. 헬스 체크 경로와 간격을 애플리케이션에 맞게 조정.

## 마무리 점검
- 빌드 후 최신 task definition이 ECS에 정상 반영되는지 확인하고, 롤백을 위해 이전 리비전을 최소 1개 이상 유지.
- CloudWatch 지표(서비스별 CPU/메모리, ALB 5xx)와 로그를 함께 모니터링하고, 장애 시 RDS/Redis 보안 그룹 변경 여부부터 확인한다.

필요한 주요 리소스와 순서를 한 장으로 볼 수 있도록 추려봤다. 실제 배포 전에는 CIDR, 포트, 시크릿 값이 최신 설계와 일치하는지 다시 검증하자.
