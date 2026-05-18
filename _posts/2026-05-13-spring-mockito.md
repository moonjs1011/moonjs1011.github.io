---
title: Mockito 사용하여 테스트하기 (Spring)
date: 2026-05-13
categories: [Spring]
tags: [java, Spring]
comment: true
mermaid: true
---

# 로그로 테스트하던 내가 Mockito를 공부해보았다

예전에 팀 프로젝트를 할 때 이런 적이 있다.

> 🦊 나: 프론트님! 기능 구현 완료해서 `Swagger` 문서까지 작성해놨으니 API 연동하시면 됩니다. 테스트도 했습니다.
>
> 🦁 프론트 담당자: 넵, 테스트는 어떻게 하셨나요?
>
> 🦊 나: 로그 찍어가면서 했어요.
>
> 🦁 프론트 담당자: ??
>
> 🦊 나: ??

당시에도 테스트를 위해 `JUnit` 기반의 테스트 코드를 작성해야 한다는 것은 알고 있었다.
하지만 프로젝트 일정상 기능 구현이 우선이었고, 테스트 코드는 자연스럽게 뒤로 밀렸다. 결국 충분한 테스트 코드를 작성하지 못한 채 프로젝트를 마무리했던 기억이 있다.

돌이켜보면 나는 테스트 코드의 전체적인 흐름이 `Given - When - Then`으로 나뉜다는 정도만 알고 있었다.
정작 구체적인 테스트 코드를 어떻게 작성해야 하는지는 제대로 알지 못했다.

시간이 꽤 지났지만, 지금이라도 다시 공부해보려고 한다.

이번 글에서는 `Mockito`를 사용해서 Service 계층을 테스트하는 방법을 정리해보려고 한다.

---

# Why Mockito?

Mock을 사용하는 핵심 이유는 **테스트 대상만 집중해서 검증하기 위해서**다.

Mockito 공식 문서에서는 이렇게 설명한다.

> The Mockito library enables mock creation, verification and stubbing.

풀어보면 이런 뜻이다.

* `mock creation`: 테스트용 가짜 객체를 만드는 것
* `stubbing`: 가짜 객체가 특정 메서드 호출에 대해 어떤 값을 반환할지 미리 정하는 것
* `verification`: 특정 메서드가 실제로 호출되었는지 검증하는 것

쉬운 비유로는 예전 휴대폰 매장에 있던 목각폰을 떠올릴 수 있다.

겉모습은 휴대폰이지만 실제 통화나 앱 실행은 되지 않는다.
테스트에서의 Mock 객체도 비슷하다. 타입과 메서드 구조는 실제 객체처럼 사용할 수 있지만, 실제 비즈니스 로직을 수행하는 원본 객체는 아니다.

대신 테스트에서 필요한 동작만 미리 정해두고 사용한다.

---

# Example - 가정

예를 들어 이런 `UserService`가 있다고 해보자.

```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public Long save(User user) {
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }
}
```

해당 서비스는 내부적으로 `UserRepository`에 의존한다.

그러니까 `UserService.save()`를 실행하면 이런 흐름이 발생한다.

```text
UserService
    ↓
UserRepository
    ↓
Database
```

그런데 지금 테스트하고 싶은 대상은 `UserRepository`가 아니다.
또한 실제 DB에 데이터가 잘 저장되는지를 확인하고 싶은 것도 아니다.

내가 지금 확인하고 싶은 건 이거다.

```text
UserService.save(user)를 호출했을 때
userRepository.save(user)를 호출하고,
그 결과로 반환된 User의 id를 잘 반환하는가?
```

테스트 대상은 `UserService`이고, `UserRepository`는 테스트 대상이 아니다.

따라서 테스트 코드에서는 `UserRepository`를 실제 객체가 아니라 Mock 객체로 대체한다.

```text
테스트 대상: UserService
가짜로 만들 대상: UserRepository
```

정확히 말하면 "가짜 DB"를 만드는 것이 아니다.
DB에 접근하는 역할을 하는 `UserRepository`를 가짜 객체로 대체하는 것이다.

---

# Example - How

그러면 `UserRepository`를 어떻게 가짜 객체로 만들 수 있을까?

Mockito에서는 `@Mock` 어노테이션을 사용한다.

```java
@Mock
UserRepository userRepository;
```

이러면 `UserRepository` 타입의 Mock 객체가 만들어진다.

하지만 이것만으로는 부족하다.
`UserService`는 생성자를 통해 `UserRepository`를 주입받아야 한다.

```java
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
}
```

그래서 테스트 코드에서는 `@InjectMocks`를 사용한다.

```java
@InjectMocks
UserService userService;
```

`@InjectMocks`는 `@Mock`으로 만든 객체를 테스트 대상 객체에 주입해준다.

내부적으로는 대략 이런 일이 일어난다.

```java
UserRepository userRepository = mock(UserRepository.class);
UserService userService = new UserService(userRepository);
```

정리하면 이렇다.

```java
@Mock
UserRepository userRepository;

@InjectMocks
UserService userService;
```

의미는 이렇다.

```text
UserRepository는 가짜 객체로 만들고,
그 가짜 Repository를 UserService에 주입한다.
```

중요한 점은 `UserService`는 Mock이 아니라는 것이다.
`UserService`는 실제 테스트 대상이다.
Mock으로 대체되는 것은 `UserService`가 의존하는 `UserRepository`다.

---

# Stubbing

이제 Mock 객체의 동작을 정해야 한다.

Mockito에서는 이런 형태로 Mock 객체의 반환값을 미리 정할 수 있다.

```java
when(메서드 호출).thenReturn(반환값);
```

예를 들어 이 코드를 보자.

```java
when(userRepository.save(user)).thenReturn(savedUser);
```

풀어 쓰면 이렇다.

```text
userRepository.save(user)가 호출되면
실제 DB 저장은 하지 말고
savedUser를 반환해라.
```

즉, 실제 `UserRepository`의 로직은 실행되지 않는다.
우리가 테스트에서 정해둔 값만 반환한다.

---

# Test Code

전체 테스트 코드는 이렇다.

```java
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    void saveTest() {
        // given
        User user = new User();
        user.setName("hong");

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setName("hong");

        when(userRepository.save(user)).thenReturn(savedUser);

        // when
        Long savedId = userService.save(user);

        // then
        assertThat(savedId).isEqualTo(1L);
        verify(userRepository).save(user);
    }
}
```

---

# 코드 흐름 뜯어보기

처음에는 이 코드가 암기처럼 느껴질 수 있다.

```java
@Mock
UserRepository userRepository;

@InjectMocks
UserService userService;
```

하지만 구조로 보면 단순하다.

```text
UserService를 테스트하고 싶다.
그런데 UserService는 UserRepository가 필요하다.
DB까지 연결하고 싶지는 않다.
그러면 UserRepository를 가짜로 만든다.
그 가짜 Repository를 UserService에 넣는다.
```

그래서 `@Mock`과 `@InjectMocks`를 사용하는 것이다.

---

## given

```java
User user = new User();
user.setName("hong");

User savedUser = new User();
savedUser.setId(1L);
savedUser.setName("hong");

when(userRepository.save(user)).thenReturn(savedUser);
```

테스트에 필요한 데이터를 준비한다.

그리고 `userRepository.save(user)`가 호출되면 `savedUser`를 반환하도록 미리 정한다.

---

## when

```java
Long savedId = userService.save(user);
```

실제로 테스트하고 싶은 메서드를 실행한다.

여기서 실행되는 것은 Mock 객체가 아니라 실제 `UserService`의 `save()` 메서드다.

```java
@Transactional
public Long save(User user) {
    User savedUser = userRepository.save(user);
    return savedUser.getId();
}
```

다만 내부의 `userRepository`는 Mock 객체이기 때문에 실제 DB 저장은 발생하지 않는다.

---

## then

```java
assertThat(savedId).isEqualTo(1L);
verify(userRepository).save(user);
```

첫 번째 검증은 반환값 검증이다.

```java
assertThat(savedId).isEqualTo(1L);
```

`UserService.save()`가 저장된 사용자의 id를 잘 반환했는지 확인한다.

두 번째 검증은 호출 여부 검증이다.

```java
verify(userRepository).save(user);
```

`UserService.save()` 내부에서 `userRepository.save(user)`가 실제로 호출되었는지 확인한다.

---

# 이게 완전 암기 아닌가?

처음에는 그렇게 느껴질 수 있다.

나도 처음에는 이 코드들이 전부 암기처럼 보였다.

```java
@ExtendWith(MockitoExtension.class)
@Mock
@InjectMocks
when(...).thenReturn(...)
verify(...)
```

하지만 결국 핵심은 하나다.

```text
테스트 대상은 진짜로 실행하고,
테스트 대상이 의존하는 객체는 가짜로 대체한다.
```

이 원칙만 기억하면 된다.

이번 예제에 옮기면 이렇다.

```text
UserService는 진짜로 실행한다.
UserRepository는 가짜로 대체한다.
```

그래서 테스트 코드는 이런 구조가 된다.

```java
@Mock
UserRepository userRepository;

@InjectMocks
UserService userService;
```

그리고 Mock 객체의 동작을 미리 정한다.

```java
when(userRepository.save(user)).thenReturn(savedUser);
```

마지막으로 결과와 호출 여부를 검증한다.

```java
assertThat(savedId).isEqualTo(1L);
verify(userRepository).save(user);
```

---

# 정리

Mock을 사용하는 이유는 테스트를 대충 하기 위해서가 아니다.

오히려 반대다.

테스트 범위를 명확하게 나누기 위해 사용한다.

```text
Controller 테스트에서는 Service를 Mock으로 둔다.
Service 테스트에서는 Repository를 Mock으로 둔다.
Repository 테스트에서는 실제 테스트 DB를 사용하는 경우가 많다.
```

Mock은 "가짜라서 편하게 쓰는 것"이 아니라,
**내가 지금 검증하고 싶은 대상에만 집중하기 위한 도구**다.

로그를 찍어가며 눈으로 확인하는 테스트도 당장은 편할 수 있다.
하지만 시간이 지나고 기능이 많아질수록 사람이 직접 확인하는 방식은 한계가 생긴다.

이제는 적어도 이렇게 말할 수 있게 됐다.

> "테스트는 어떻게 하셨나요?"
>
> "JUnit과 Mockito로 Service 단위 테스트 작성했습니다."
