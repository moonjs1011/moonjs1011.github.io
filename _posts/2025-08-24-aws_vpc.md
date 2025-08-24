---
title: Aws 개념
date: 2025-08-24
categories: [Aws]
tags: [infra]     # TAG names should always be lowercase
comment: true
---

![aws](data:image/png;base64,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)

## VPC( Virtual Private Cloud )

  `VPC란?` 
  >퍼블릭 클라우드 환경 내에서 사용자가 직접 설계하고 제어하는 고객 전용의 논리적으로 격리된 가상 네트워크입니다.


  `Aamzon VPC`를 사용하면 사용자가 정의한 논리적으로 격리된 가상 네트워크상에서 AWS리소를 제어할 수 있다. 

 * IP 범위, 라우팅, 보안 정책(Secuity Group)을 직접 설정 가능
  
VPC는 하나의 아파트라고 비유를 들 수 있다.

## Subnet
`Subnet`은 VPC를 더 작은 논리 네트워크 단위로 세분화한 것이다.

각 서브넷은 CIDR(Classless Inter-Domain Routing) 블록(IP 대역) 으로 정의하고 `Public subnet`과 `Private Subnet`으로 분리하여 관리할 수 있다.

<a href = "https://aws.amazon.com/ko/what-is/cidr/"> (CIDR에 대한 지식)</a>

* `Public Subnet` : Public Subnet에 존재하는 인스턴스는 외부/내부와 통신이 가능하다.  
* `Private Subnet` : Private Subnet에 존재하는 인스턴스는 외부와 통신이 불가능하고 내부 통신만 가능하다.

여기서 말한 외부와 내부의 의미는 다음과 같다. `외부`는 VPC 바깥의 네트워크를 말하는 것이고 일반적으로 인터넷이 대표적인 외부이다. `내부`는 같은 VPC내의 영역을 일컫는다.

앞서 `VPC`를 설명할 때  하나의 큰 아파트라고 비유를 했다. Subnet은 VPC라는 아파트에 존재하는 각각의 방이라고 비유를 할 수 있다. 

![aws](https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_2560/https://foghornconsulting.com/wp-content/uploads/2023/07/Benefits-of-Azure-Data-Factory.png)

## Routing Table
브넷과 연결된 라우팅 규칙 집합이다.
특정 목적지(CIDR)에 대해 어떤 게이트웨이(`IGW`, `NAT` 등) 로 트래픽을 보낼지 정의


## Routing Table 예시:
	•	0.0.0.0/0 → IGW(Internet GateWay) → 인터넷 통신
	•	0.0.0.0/0 → NAT Gateway → 프라이빗 ECS에서 외부로


| 항목          | IGW (Internet Gateway) 사용                                        | NAT Gateway 사용                                                     |
| ------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **대상**      | Public Subnet에 있는 리소스들 (예: ALB, 공개 EC2 등)               | Private Subnet에 있는 리소스들 (예: ECS Task, DB 등)                 |
| **의미**      | 인스턴스가 **직접 인터넷과 양방향 통신** 가능                      | 인스턴스는 **인터넷으로 나갈 수만 있음**, 외부에서 들어올 수 없음    |
| **필수 조건** | 퍼블릭 IP가 인스턴스에 **반드시 부여**되어 있어야 함               | 퍼블릭 IP는 **없어야 하며**, NAT Gateway는 Public Subnet에 있어야 함 |
| **예시**      | - ALB가 외부 사용자 요청을 직접 받는 경우<br>- 웹 서버가 직접 응답 | - DB가 외부 저장소에서 패키지를 다운로드<br>- ECS가 외부 API 호출 등 |

`NAT Gateway`가 인스턴스는 인터넷으로 나갈 수만 있음, 외부에서 들어올 수 없다는 것이 모호할 수 있다. `Aws` 내부에서 요청을 보내면 응답을 받을 수 있지만 외부에서 `Aws` 내부로 요청은 할 수 없다고 이해하면 된다.

aws 내부에 존재하는 `SpringBoot` 완전히 다른 네트워크와 통신하기 위해서는 `NAT GateWay`를 사용한다. 나는 `Gemini Api` 호출과 `Docker Hub`에서 이미지를 받아오기 위해 사용했다.

## Security Group
`Security Group`는 AWS에서 제공하는 가상 방화벽(Virtual Firewall)이다. 인스턴스에 대한 **인바운드(Inbound)** 및 **아웃바운드(Outbound)** 트래픽을 제어할 수 있다.

- **인바운드 규칙**: 인스턴스로 들어오는 요청을 허용할지 결정
- **아웃바운드 규칙**: 인스턴스에서 나가는 요청을 허용할지 결정

서브넷이 네트워크를 논리적으로 나누는 구조적인 장치라면, **보안 그룹은 실제 트래픽의 입출입을 통제하는 문지기** 역할을 한다.

![img](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2021/04/16/2021-04-16_17-56-45-1024x450.png)

예시:
- 80포트(HTTP)와 443포트(HTTPS)만 허용
- 특정 IP나 VPC로부터만 SSH 접속 허용 등

보안 그룹은 **상태 저장(Stateless)이 아닌 상태 유지(Stateful)** 하다. 즉, 인바운드가 허용되면 대응하는 아웃바운드는 자동으로 허용된다.

## ALB( Application Load Balancer )
`ALB`란 OSI 7계층 중 L7(어플리케이션) 계층에서 동작하는 로드 밸런서이다. 이런게만 알고 있으면 추상적이고 와닿지가 않는 것같다.

`ALB`는 URL, 쿠키, 헤더 등을 기준으로 분산한다. 즉 사용자가 `/api/user`와 같은 `api`를 서버한테 요청을 하면 이 `ALB`가 요청 받아 실질적인 메인 백엔드 서버에게 전달한다. 

`ALB`는 `Nginx`와 유사한 역할을 한다. ALB를 사용하면 Aws 위에서 console을 이용하여 편리하게 관리할 수 있지만, `Nginx`를 사용하면 직접 Ec2에 띄어서 관리를 해야한다. 

`Nginx` 사용하며 삽질을 하면 네트워크에 대한 기본기가 생길 것이다.


## ECS( Elastic Container Service )
AWS의 컨테이너 오케스트레이션 서비스이다.

* `EC2` 또는 Fargate 런타임 위에 컨테이너를 배포한다.
* 보통 `ECS` Task는 Private Subnet에 배치하여 보안성을 높인다.
* 외부 요청은 `ALB`를 통해 들어옴
* 외부로 나가는 요청은 `NAT` Gateway 통해 전송된다.

 Docker 컨테이너를 클러스터 기반으로 배포·관리할 수 있도록 해주는 플랫폼이다.
 실제로 ECS에서 서비스를 생성하거나 `Task Definition`를 작성할 때image를 명시하는 field가 존재한다. 여기에 `docker image`를 기입하면 `docker hub`에 존재하는 image로 컨테이너가 생성된다. 


## ECR( Elastic Container Registry )
이미지를 저장하는 Repository이다. `ECS`에서 서비스를 생성할 때 `Docker Image`로 생성할 수 있지만 `SpringBoot`를 띄울 때는 직접 생성한 이미지가 필요하다. `ECR` 직접 생성한 이미지를 저장할 수 있는 저장소이다.

나는 Github action과 ECR를 연동하였다. 

`main` branch에 변경사항이 있으면 `Github action`이 트리거된다. 변경 사항이 적용된 프로젝트의 이미지를 ECR로 push하고, ECS 또한 update된다.

## Github action -> ECR Flow 예시
![img](https://docs.aws.amazon.com/ko_kr/prescriptive-guidance/latest/patterns/images/pattern-img/c39c110e-cbe5-459e-a0aa-de27e884fb10/images/298e0e16-3054-49b7-8695-db510e0df2df.png)


## Cloudmap
`AWS Cloud Map`은 ECS 서비스를 포함한 다양한 리소스를 **DNS** 기반으로 자동 등록하고 조회할 수 있게 해주는 서비스 디스커버리 도구이다.
즉, ECS 서비스에 **DNS** 이름을 붙여서 다른 서비스가 쉽게 찾을 수 있도록 하는 주소록 역할을 한다.

`VPC` 내부 **DNS**에서만 접근 가능함을 주의하자.

## Namespace란?
Cloud Map에서 Namespace는 `이름 공간`이다.
즉, 서비스의 도메인 구조를 정의하는 최상위 DNS 영역이다.

나는 ECS끼리 서로 통신하는데 있어서 쉽게 서로를 식별할 수 있게 만들었다.
`howru` 라는 네임스페이스를 만들고 `spacy-api`,`fast-api`,`libretranslate` DNS를 등록하였다. 

`SpringBoot`는 다른 ECS를 식별할때 다음과 같이 식별할 수 있다.
  * `spacy-api.howru:8000`
  * `fast-api.howru:8001`
  * `libretranslate.howru:5000`


# 데이터 흐름 요약 
 1) 외부 → ECS로 (수신 흐름)
 ```
 사용자 브라우저
    ↓
인터넷 게이트웨이 (IGW)
    ↓
퍼블릭 서브넷의 ALB
    ↓
프라이빗 서브넷의 ECS Task (사설 IP)
 ```

* **ECS**가 퍼블릭 IP가 없어도 외부 요청을 처리할 수 있음

* **ALB**   가 외부와 통신을 담당, 내부에 사설 트래픽 전달

2) ECS → 외부로 (송신 흐름)
```
ECS Task (Private Subnet)
    ↓
NAT Gateway (Public Subnet)
    ↓
인터넷 게이트웨이
    ↓
외부 인터넷
```

* **ECS**가 외부 API를 호출하거나 패키지 다운로드 시 사용

* **NAT Gateway**가 인터넷으로 나가는 트래픽을 중계


---
<br>
<br>
reference links

* https://foghornconsulting.com/2023/09/19/what-is-vpc-in-aws
* https://aws.amazon.com/ko/blogs/korea/easily-manage-security-group-rules-with-the-new-security-group-rule-id/