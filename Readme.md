# MFE Platform

A micro-frontend platform built with Angular 21 and .NET 10. The shell dynamically loads registered micro-frontends at runtime via Native Federation, secured with Auth0.

## Architecture

```
MFEPlatform/
├── Backend/
│   └── Service/               .NET 10 Web API — MFE registry
│       ├── Controllers/       AppController — CRUD endpoints
│       ├── Data/              AppDbContext — EF Core + SQLite
│       ├── Migrations/        EF Core migrations
│       └── Models/            RegisteredApp entity
└── Frontend/
    ├── shell/                 Angular 21 host app (port 4200)
    │   └── src/app/
    │       ├── components/    AppList, RegisterApp, HomeComponent
    │       ├── models/        RegisteredApp interface
    │       └── services/      AppsService (HTTP client)
    └── remote-app/            Angular 21 MFE (port 4201)
        └── src/app/
            └── remote-component/  RemoteModule + RemoteComponent
```

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | .NET 10 Web API |
| Database | SQLite + EF Core |
| Auth | Auth0 (PKCE flow) |
| Frontend | Angular 21 |
| MFE | @angular-architects/native-federation |
| HTTP interceptor | @auth0/auth0-angular AuthHttpInterceptor |

## Progress

### Phase 1 — Backend (Complete)
- `GET /api/apps` — list all registered MFEs
- `GET /api/apps/{id}` — get by ID
- `POST /api/apps` — register new MFE (409 on duplicate name/routePrefix)
- `DELETE /api/apps/{id}` — delete
- Auth0 JWT Bearer validation on all endpoints
- SQLite DB with EF Core, auto-migrates on startup
- CORS configured for `http://localhost:4200`
- Auth0 credentials stored via `dotnet user-secrets`

### Phase 2 — Angular Shell (Complete)
- Auth0 login/logout via PKCE flow
- `AuthGuard` on protected routes
- `AppListComponent` — fetches registered apps, wires dynamic MFE routes, supports delete
- `RegisterAppComponent` — reactive form to POST new MFE
- `HomeComponent` — landing page, auto-redirects to `/apps` when authenticated
- `AuthHttpInterceptor` auto-attaches Bearer token to all API requests
- Dynamic routing via `loadRemoteModule()` + `router.resetConfig()`

### Phase 3 — Remote App (Complete)
- Angular 21 app at `Frontend/remote-app/` served on port 4201
- Native Federation configured via `federation.config.js`
- `RemoteModule` exposed at `./Module`, renders "Hello from Remote App!"
- Shell dynamically loads remote at `/remote-app` via `loadRemoteModule()`

## Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 22+
- Angular CLI 21
- Auth0 account

### 1. Auth0 Setup
1. Create a **Single Page Application**
   - Allowed Callback/Logout/Web Origins: `http://localhost:4200`
2. Create an **API** and copy the identifier as your audience
3. Fill in `domain`, `clientId`, `audience` in `Frontend/shell/src/app/app-module.ts`

### 2. Backend
```bash
cd Backend/Service
dotnet user-secrets set "Auth0:Domain" "your-domain.us.auth0.com"
dotnet user-secrets set "Auth0:Audience" "your-api-audience"
dotnet run
```
Runs at `http://localhost:5039`

### 3. Shell
```bash
cd Frontend/shell
npm install
ng serve --port 4200
```
Opens at `http://localhost:4200`

### 4. Remote App
```bash
cd Frontend/remote-app
npm install
ng serve --port 4201
```
Runs at `http://localhost:4201`

## Registering a Remote App

Get a bearer token from DevTools (Application → Local Storage → `access_token`) after logging in, then:

```bash
curl -X POST http://localhost:5039/api/apps \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "remoteApp",
    "displayName": "Remote App",
    "remoteUrl": "http://localhost:4201/remoteEntry.json",
    "exposedModule": "./Module",
    "ngModuleName": "RemoteModule",
    "routePrefix": "remote-app"
  }'
```

Navigate to `http://localhost:4200/remote-app` to see the dynamically loaded MFE.
