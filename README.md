# 노마드코더 - React JS 마스터클래스

이 프로젝트는 <https://nomadcoders.co/react-masterclass> 의 강의를 수강하면서 만드는 프로젝트이다.

```{bash}
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
npm install --save-dev @types/styled-components
npx tsc --init
```

다음 내용을 잘 배워보자

- styled-components
- typescript
  - typescript에서 props의 interface 속성을 주는 방법
  - typescript와 styled-components의 interface
  - optional props는 물음표를 붙여서 처리, styled 에서는 required 처리하고 ??를 통해 기본값 지정

```{typescript}
interface PlayerShape {
  name: string;
  age: number;
}
const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({ name: "nico", age: 12 });
sayHello({ name: "hi", age: 12 });
```

<https://fonts.google.com/specimen/Source+Sans+Pro?query=source+sans+pro>

<https://flatuicolors.com/palette/gb>

<https://api.coinpaprika.com/v1/coins>

<https://coinicons-api.vercel.app/api/icon/>

```{bash}
npm install --save react-apexcharts apexcharts

npm install react-helmet

npm i --save-dev @types/react-helmet
```
