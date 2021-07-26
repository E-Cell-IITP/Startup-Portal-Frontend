## To-Do List

---

- [ ] Confirm Password
- [ ] Change Login/LogOut/Register to SignIn/SignOut/SignUp
- [ ] Accept Only IITP Mails and RollNos
- [x] Toggle View Password
- [x] Change Logos and Links below
- [x] Add Application page similar to Jobs

## Local Development

- Start Backend Server prior to this. Refer [this](https://github.com/E-Cell-IITP/Startup-Portal-Backend/blob/main/README.md).
- Install dependencies.
  ```bash
  yarn
  ```
- Modify `.env` file.
  - Change `REACT_APP_SERVER_URL` to Server URL. Most probably, It will be `http://localhost:8000`.
  - New contents of `.env` file should be as below.
    ```bash
    REACT_APP_SERVER_URL=http://localhost:8000
    ```
  - Unlike Backend Repo, This `.env` is included in Git. So, Make sure to revert this file changes before pushing it. (Ofcourse, We'll be reviewing it before merging it.)
- Start dev server.
  ```bash
  vercel dev --listen 3000
  ```
- Done 🎉️🎉️
