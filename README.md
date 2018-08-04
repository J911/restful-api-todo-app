# RESTful-todo-app
RESTful Todo App 

## Project
project name : RESTful Todo App 

start project: 2018.08.02

## RESTful
[api-document](https://github.com/J911/RESTful-todo-app/blob/master/docs/api-document.md)

## Directory Sturcture
```
.
├── README.md
├── docs
│   ├── api-document.md
│   └── todo-status.md
├── todo-backend
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── api
│   │   │   ├── RouterAbstract.ts
│   │   │   ├── account
│   │   │   │   └── index.ts
│   │   │   ├── auth
│   │   │   │   ├── auth.ctrl.ts
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── todo
│   │   │       └── index.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tsconfig.json
│   └── tslint.json
└── todo-frontend
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── app.vue
    │   ├── components
    │   │   └── shared-components
    │   │       ├── footer.component.vue
    │   │       └── nav.component.vue
    │   ├── config
    │   │   └── router.ts
    │   ├── environments
    │   │   └── environments.json
    │   ├── main.ts
    │   ├── service
    │   │   └── http.service.ts
    │   ├── spa
    │   │   └── home.vue
    │   ├── style
    │   │   └── spa
    │   │       └── home.css
    │   └── vue-shim.d.ts
    ├── tsconfig.json
    └── tslint.json
```

## Stack
backend
- nodejs
- express
- monodb
- jwt
- typescript

frontend
- vuejs
- vuex
- vue-router
- typescript
