# Angular Micro-Frontend (MFE) Setup Guide

This guide provides step-by-step instructions for creating Angular Micro-Frontend applications using Module Federation.

## Project Structure

```
mfe/
├── shell/          # Host application
├── vehicle-mfe/    # Remote MFE
├── payment-mfe/    # Remote MFE
└── README.md
```

---

## Step 1: Create a New Angular Application

```bash
ng new <app-name> --routing --style=scss
cd <app-name>
```

---

## Step 2: Add Module Federation

```bash
ng add @angular-architects/module-federation --project <app-name> --port <port-number>
```

- Shell app: typically port `4200`
- Remote MFEs: use different ports (e.g., `4201`, `4202`)

---

## Step 3: Configure webpack.config.js

### For Remote MFE (e.g., vehicle-mfe)

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'vehicle-mfe',

  exposes: {
    './VehiclesModule': './src/app/vehicles/vehicles.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

### For Shell (Host) Application

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    'vehicle-mfe': 'http://localhost:4201/remoteEntry.js',
    'payment-mfe': 'http://localhost:4202/remoteEntry.js',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

---

## Step 4: Setup Bootstrap Files

### src/main.ts

```typescript
import('./bootstrap')
  .catch(err => console.error(err));
```

### src/bootstrap.ts

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

---

## Step 5: Create Feature Module (Remote MFE)

```bash
ng generate module vehicles --routing
ng generate component vehicles/pages/vehicles-page
ng generate component vehicles/components/vehicle-list
ng generate component vehicles/components/vehicle-detail
ng generate service core/services/vehicle
```

---

## Step 6: Configure Feature Module

### vehicles.module.ts

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleService } from '../core/services/vehicle.service';

@NgModule({
  declarations: [
    // components
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    VehiclesRoutingModule
  ],
  providers: [VehicleService]  // Provide services here, NOT in root
})
export class VehiclesModule { }
```

### Important: Service Configuration for MFE

```typescript
// Use @Injectable() without providedIn: 'root'
@Injectable()
export class VehicleService {
  constructor(private http: HttpClient) {}
}
```

> **Note:** In MFE, avoid `providedIn: 'root'` for services that use HttpClient. Instead, provide them in the feature module's `providers` array.

---

## Step 7: Configure Routing

### Remote MFE - vehicles-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesPageComponent } from './pages/vehicles-page/vehicles-page.component';

const routes: Routes = [
  { path: '', component: VehiclesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
```

### Shell - app-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: 'vehicles',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './VehiclesModule'
    }).then(m => m.VehiclesModule)
  },
  {
    path: 'payments',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './PaymentsModule'
    }).then(m => m.PaymentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## Step 8: Add Type Declarations (Shell)

Create `src/decl.d.ts` in the shell application:

```typescript
declare module 'vehicle-mfe/VehiclesModule';
declare module 'payment-mfe/PaymentsModule';
```

---

## Step 9: Environment Configuration

### src/environments/environment.ts

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  debugMode: true
};
```

### src/environments/environment.prod.ts

```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.production.com',
  debugMode: false
};
```

---

## Running the Applications

### Start Remote MFEs first:

```bash
# Terminal 1
cd vehicle-mfe
npm start

# Terminal 2
cd payment-mfe
npm start
```

### Then start the Shell:

```bash
# Terminal 3
cd shell
npm start
```

---

## Common Issues & Solutions

### 1. NullInjectorError: No provider for HttpClient

**Cause:** Service uses `providedIn: 'root'` but HttpClientModule isn't available at root level in MFE context.

**Solution:**
- Remove `providedIn: 'root'` from the service
- Add the service to the feature module's `providers` array
- Ensure `HttpClientModule` is imported in the feature module

### 2. Shared Module Version Mismatch

**Cause:** Different versions of Angular packages between shell and remotes.

**Solution:** Ensure all MFEs use the same Angular version, or configure flexible version sharing:

```javascript
shared: {
  ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
}
```

### 3. Remote Entry Not Found

**Cause:** Remote MFE is not running or wrong port configured.

**Solution:** Verify remote is running and the `remoteEntry` URL in webpack config is correct.

---

## Useful Commands

```bash
# Generate new module
ng generate module <module-name> --routing

# Generate component
ng generate component <path/component-name>

# Generate service
ng generate service <path/service-name>

# Build for production
ng build --configuration production

# Serve with custom port
ng serve --port 4201
```

---

## Resources

- [Angular Architects Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Angular Documentation](https://angular.io/docs)
