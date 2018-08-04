# Todo App API document
Todo App의 API 명세

## Auth
---

### Sign In
로그인을 통해 JWT 인증토큰을 받아온다.

- uri: /api/v1/auth/signin
- method: POST
- request: userName, password
- response: token, username
- status: 200, 400, 403, 500

### Sign Up
새로운 사용자를 등록한다.

- uri: /api/v1/auth/signup
- method: POST
- request: userName, password
- status: 201, 500, 409

## Accounts
---

### Get UserName
사용자 정보를 가져운다.

- uri: /api/v1/accounts/${userId}
- method: GET
- request header: x-access-token
- response: userId, userName
- status: 200, 401, 403, 500

### Update Password
사용자 비밀번호를 변경한다.

- uri: /api/v1/accounts/${userId}/password
- method: PUT
- request header: x-access-token
- request: userId, password, newPassword
- status: 204, 400, 401, 403, 500

### Update UserName
사용자 이름을 수정한다.

- uri: /api/v1/accounts/${userId}/username
- method: PUT
- request header: x-access-token
- request: userId, password, newUserName
- status: 204, 400, 401, 403, 409, 500

### Delete User Account
비밀번호 인증을 통해 사용자를 삭제한다.

- uri: /api/v1/accounts/${userId}
- method: DELETE
- request header: x-access-token
- request: userId, password
- status: 204, 400, 401, 403, 500

## Todo
---

### Generate Todo
새로운 Todo를 등록한다.

- uri: /api/v1/todos/
- method: POST
- request header: x-access-token
- request: title, contents
- status: 201, 401, 403, 500

### Get Todo All
사용자의 모든 Todo를 불러온다.

- uri: /api/v1/todos
- method: GET
- request header: x-access-token
- request: [{title, contents, status, createAt}]
- status: 200, 401, 403, 500

### Get Todo
사용자의 Todo를 가져온다.

- uri: /api/v1/todos/${todoId}
- method: GET
- request header: x-access-token
- request: title, contents, status, createAt
- status: 200, 401, 403, 500

### Update Todo Title
사용자의 Todo의 제목을 수정한다.

- uri: /api/v1/todos/${todoId}/title
- method: PUT
- request header: x-access-token
- request: title
- status: 204, 401, 403, 500

### Update Todo Contents
사용자의 Todo의 내용을 수정한다.

- uri: /api/v1/todos/${todoId}/title
- method: PUT
- request header: x-access-token
- request: contents
- status: 204, 401, 403, 500

### Update Todo Status
사용자의 Todo의 상태를 수정한다.

- uri: /api/v1/todos/${todoId}/status
- method: PUT
- request header: x-access-token
- request: status
- status: 204, 401, 403, 500

### Delete Todo Status
사용자의 Todo를 삭제한다.

- uri: /api/v1/todos/${todoId}
- method: Delete
- request header: x-access-token
- request: status
- status: 204, 401, 403, 500