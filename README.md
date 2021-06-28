# Nuber eats front end

## Plan

- set up (#14)
- authentication
- user part
- test
- restaurant owner dashboard
- driver part

# Review

![frontend-home-page](src/images/nuberMain.PNG)

<details>
<summary>Things to do</summary>

- [ ] 배포 : heroku, netlify에서 할 예정(현재 로컬에서만 작업 중)

  - server port : local 4000
  - front port : local 3000

- pages : user에 따라 다르게 표시 - owner, client, delivery

  - [ ] 배달원 시점 페이지 만들어야 됨

- pagination

  - [ ] infinite scroll 로 변경 예정
  - [ ] pagination 이후 화면에 보여질 때 item들 정렬 필요
    - 현재 역순으로 보여지고 있음(ex. 6, 5 ,4)

- navigation bar

  - [ ] hamburger menu 추가 예정

- UI 개선
  - [ ] restaurant detail page
  - [ ] Create account
    - [ ] password double check
      - 비밀번호 확인칸에서 같을 경우에만 버튼 활성화
        - useForm의 formState.isValid :
    - [ ] email 중복 체크 : useForm() register의 validate 기능 사용
      - DB(postgreSQL, pgAdmin4)에 이미 가입된 email이 있는지 확인
      - 현재 서버에서 오는 에러 메세지를 띄워서 가입여부 확인 가능
- 기능
  - [ ] 주문 기능 동작하게 수정 필요
  - [ ] 구매후기 작성 기능 추가 예정
  - [ ] 즐겨찾기 기능 추가 예정

</details>

## 14. Frontend set up

### 14-1. CRA(Create React Acpp)

### 14-2. TailwindCSS

<details>
  <summary>TailwindCSS features</summary>

- 부트스트랩과 달리 눈에 띄는 특유의 생김새가 없음
- 조합할 수 있는 여러 클래스들이 있는데 좋바해서 쓰면 됨
- production을 위해 build할때 사용하지 않은 클래스들을 제거해서 css크기를 줄일 수 있음
- VScode extension : Tailwind CSS intellisense : Tailwind CSS 클래스 이름 자동 완성
- [postCSS](https://github.com/postcss/postcss) : post process할 수 있게 해주는 라이브러리 - CSS 전용 Babel 같은 느낌
  - tailwind를 일반 css파일로 빌드하기 위해 postcss config 파일 필요
  - autoprefixer : 크로스 브라우징 되도록 지원
  - 참고 : https://fourwingsy.medium.com/postcss-%EC%86%8C%EA%B0%9C-727310aa6505
- tailwind.config.js : tailwind를 커스터마이즈 하기 위해

</details>

### 14-3. apollo

<details>
  <summary>apollo features</summary>
  
- apollo.ts : apollo 세팅 파일
- uri : back-end url(localhost:4000/graphql)
- \<app /\>을 \<ApolloProvider client={client}>\</ApolloProvider>로 감싸 줌
- chrome extension apollo dev tools docs에서 연결 확인 가능
- set up -> authentication -> login part -> user part -> test(Jest) -> restaurant owner dashboard -> driver part
- React-router-dom
  - 로그인 여부와 사용자에 따라 main화면을 다르게 구성
</details>

<details>
  <summary>14-3-1. apollo code</summary>

```javascript
// app
export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};

// logged-out router
export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

// logged-in router
export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' &&
          clientRoutes.map(route => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === 'Owner' &&
          restaurantRoutes.map(route => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map(route => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
```

</details>
<br />

## 15. Authentication

### 15.0. Local only fields

authentication part on the front-end

- Local-only fields : GraphQL 서버의 스키마에 정의 되지 않은 것

  - local state : server에는 없지만 application에 필요한 state
    - ex) login or not, dark mode, volume on Youtube,
  - ApolloClient의 cache안에 정의 되는 키&값들

- reactive variable(apollo.ts)
  - apollo client에 저장되고 읽고 업데이트 하는 것이 가능
  - const name = makeVar("default value");

<details>
  <summary>local state(reactive variable) code</summary>

```javascript
// apollo.ts
const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // 여기에 선언된 것들이 local state
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
```

</details>

- 궁금증
  - App에서 local state와 local field variable의 차이점 ?
    - [Apollo client는 Redux와 무엇이 다른가](https://d2.naver.com/helloworld/4245995)
    - [Local State Management with Reactive Variables](https://www.apollographql.com/blog/apollo-client/caching/local-state-management-with-reactive-variables/)
    - 같다. 하지만 사용이 더 편리하다.

### 15.1. React hook form

- [리액트에서 form을 다루기 위한 라이브러리](https://react-hook-form.com/)
- useForm();
<details>
  <summary>useForm code</summary>

```javascript
export const LoggedOutRouter = () => {
  const { register, watch } = useForm(); // useForm()의 사용 방법
  console.log(watch()); // register가 등록된 form에 입력되는 값을 실시간으로 확인
  return (
    <div>
      <form>
        <input
          ref={register} // 사용할 form에 register를 붙이면 됨
          name="email" // name도 필수
          required
          placeholder="email"
        >
      </form>
    </div>
  )
}
```

</details>
- useForm()의 메서드들
  - const { register, watch, handleSubmit, errors } = useForm();
  - handleSubmit : submit 시 실행될 함수(onSubmit)을 등록하면 실행됨

<details>
  <summary>handle submit code</summary>

```javascript
export const CreateAccount = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    console.log('how to use handleSubmit');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} name="email" /> // register를 ref에 등록 + name 설정
      하면 useForm() 사용 준비 완료
    </form>
  );
};
```

</details>

- errors : useForm()의 메서드 중 에러가 있으면 알려줌

<details>
<summary>errors code</summary>

```javascript
<input
  ref={register({
    required: 'Email is required',
    pattern: {
      value: EMAIL_REGEX,
      message: 'Please enter a valid email',
    },
  })}
  required
  name="email"
  placeholder="Email"
  className="input"
/>;
{
  errors.email?.message && <FormError errorMessage={errors.email?.message} />;
}
```

</details>

### 15.2 React hook form part two

integrate typescript withe useForm

<details>
<summary>useForm with typescript</summary>

```typescript
interface ILoginForm {
  email: string;
  password: string;
}
const { register, error } = useForm<ILoginForm>(); // <ILoginForm>을 typescript형식에 맞게 useForm()에 추가함
// 이후 typescript가 자동완성 기능을 실행
// error.email?.message // error. 이후 자동완성 사용 가능
```

</details>
