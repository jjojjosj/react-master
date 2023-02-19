# 노마드코더 - <img src="./public/favicon.ico" width="24" height="24" /> React JS 마스터클래스

---

이 프로젝트는 <https://nomadcoders.co/react-masterclass> 의 강의를 수강하면서 만드는 프로젝트이다.

---

## 목차

1. [styled-components](#1-styled-components)
2. [typescript](#2-typescript)
3. [react-router-dom](#3-react-router-dom)
4. [react-query](#4-react-query)
5. [apexchart.js](#5-apexchartjs)
6. [react-helmet](#6-react-helmet)
7. [기타 유용한 링크](#99-유용한-링크들)

---

```sh
npx create-react-app react-master
cd react-master
npm install -save typescript @types/node @types/react @types/react-dom @types/jest
npm install --save-dev @types/styled-components
npx tsc --init
```

---

다음 내용을 잘 배워보자

## 1. styled-components

- [styled-components 공식문서](https://styled-components.com/docs/basics)
- styled-components는 react에서의 css 스타일링을 매끄럽게 연결해주는 유용한 도구이다.

  - 스타일의 상속, 인자 전달 등을 쉽게 가능하게 한다.
  - 클래스네임 자동 생성
  - 간결한 유지보수

  예제코드:

  ```typescript
  import styled from "styled-components";

  const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
  `;

  <Container>이렇게 사용</Container>;
  ```

---

## 2. typescript

- javacript는 변수 속성이 가변적이라서 코드를 실행하기 전까지는 오류를 발견하기 어려운 것에 착안하여, 변수 타입 지정을 강제하고 그에 맞지 않으면 코드 실행 전에 알 수 있게 하는 typescript가 개발되었다.
  [typescript 공식문서](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- typescript에서 props의 interface 속성을 주는 방법
- typescript와 styled-components의 interface
- optional props는 물음표(?)를 붙여서 처리, styled 에서는 required 처리하고 ??를 통해 기본값 지정

```typescript
interface PlayerShape {
  name: string;
  age: number;
}
const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({ name: "nico", age: 12 });
sayHello({ name: "hi", age: 12 });
```

---

## 3. react-router-dom

- a태그를 쓰면 페이지 전체가 새로고침 되어버린다. 같은 사이트에서는 router기능을 통해 이동하여 페이지간에 정보를 주고 받으며 새로고침 되지 않는 상태로 이동할 수 있다.
- 5.x버전과 6.x버전의 기능차이가 많아 서로 호환되지 않는다.
- `<Route>` 태그는 react-router-dom의 가장 기본적인 태그라고 할 수 있다. 해당하는 경로의 URL을 렌더링한다.

```typescript
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
```

- `<Switch>` 태그는 `<Route>` 태그중 딱 하나만 렌더링한다. "`<Switch>` is unique in that it renders a route exclusively."
- `<Link>` 태그는 사용자가 클릭이나 탭을 통해 다른 페이지로 이동할 수 있게 한다.

---

## 4. react-query

- [공식문서](https://react-query-v3.tanstack.com/overview)
- react-query는 데이터를 fetch하고, 캐싱하고, 싱크하는 기능을 한다.

```sh
npm install react-query
npm install --save-dev @types/react-query
```

- 데이터를 불러오는 부분에서는 useQuery를 이용하여 다음과 같이 작성한다.

```typescript
const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
```

- 실제 fetch하는 코드는 api.ts에 작성하였다.

```typescript
const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
```

---

## 5. ApexChart.js

- javascript(typescript)로 차트를 예쁘게, 편하게 그릴 수 있다.

`npm install --save react-apexcharts apexcharts`

---

## 6. react-helmet

`<Helmet>` 태그 안에 사용된 요소들은 모두 `<head>`로 반영된다. (말 그대로 헬멧...)

```
npm install react-helmet
npm i --save-dev @types/react-helmet
```

---

## 7. recoil

변수를 여러 개의 파일/페이지/함수 등에서 사용할 때, 연속해서 변수를 전달,전달,전달하기보다는 하나의 전역변수 형태로 만들고 가져다 쓰는 것이 효율적이다. Recoil atom을 생성해서 이런 걸 가능하게 한다.

`npm install recoil` 로 설치한다. `useRecoilValue()` 함수를 통해 필요한 변수를 불러오고, `useSetRecoilValue()`를 통해 필요한 변수를 업데이트한다.

## 99. 유용한 링크들

[폰트 고를 때 유용한 사이트 - fonts.google.com](https://fonts.google.com/specimen/Source+Sans+Pro?query=source+sans+pro)

[색상 고를 때 유용한 사이트 - flatuicolors.com](https://flatuicolors.com/palette/gb)

<https://api.coinpaprika.com/v1/coins>

<https://coinicons-api.vercel.app/api/icon/>
