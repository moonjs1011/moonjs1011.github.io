---
title: 인프라 구축 가이드 - VPC부터 ECS까지 체크리스트
date: 2025-09-10
categories: [Infrastructure,AWS]
tags: [vpc,subnet,ec2,ecs,ecr,github-actions,rds,redis]
comment: true
---

PDF로 정리해둔 인프라 구축 가이드를 블로그용으로 다시 요약했다. VPC 설계부터 RDS/Redis, ECR 빌드 파이프라인, ECS 서비스 배포까지 한 번에 확인할 수 있는 체크리스트다. 원본 PDF(스크린샷 포함)를 바로 볼 수 있도록 첨부했다.

## 전체 문서/스크린샷 보기
- 바로 보기: <object data=\"/assets/files/infra-guide.pdf\" type=\"application/pdf\" width=\"100%\" height=\"800px\"></object>
- 다운로드: [infra-guide.pdf](/assets/files/infra-guide.pdf)
- 대표 페이지 미리보기  
![infra guide page1](/assets/img/infra-guide-page1.png)

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
