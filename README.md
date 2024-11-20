![nextjs-supabase-auth-kit](https://github.com/user-attachments/assets/eec5e637-e244-450b-8083-b045e91d8b1f)

**A production-ready authentication kit that lets you manage the entire authentication system within a single file by copying and pasting the required code.**

### [v1.0.0] - 2024-10-31
- Updated CSS styling to use shadcn defaults for a more primitive kit setup.
- Renamed folders and files and refactored code for a more understandable structure.

# Overview

### Introduction

This is an AuthKit built using [Next.js](https://nextjs.org) and [Supabase](https://supabase.com), designed for **production-ready use**. It includes basic UI elements provided with [TailwindCSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com). Authentication is handled through both Password-based and OAuth methods, following the PKCE flow.

### Teck stacks

- Next.js 14 (React 18) using App Router
- Supabase
- Tailwind CSS
- Shadcn UI
- Zod
- Typescript

### Why Next.js 14?

Many packages do not yet support React 19, so I plan to upgrade to Next.js 15 when the timing is appropriate. Apart from asynchronously loading cookies() and searchParams, there are no significant differences in this AuthKit.

---


## Folder and file structure in `/src`

### **`/actions`**

→ Server Actions

### **`/app`**

→ Main application routes and pages, managed by the Next.js App Router.

| **Folders and files** | **Description** |
| --- | --- |
| `(auth)` | Auth route groups |
| `(private)` | Private route groups |
| `(public)` | Public route groups |
| `/api` | Route handlers |
| `/fonts` | Local fonts |
| `layout.tsx` | Root layout |

### **`/components`**

→ React components

| **Folders** | **Description** |
| --- | --- |
| `/features` | Components that are tightly coupled to specific app features. |
| `/ui` | Reusable UI components for multiple pages, including components from shadcn-ui. |

### **`/hooks`**

→ Custom reusable React hooks.

### **`/lib`**

→ Shared libraries such as utilities, types and schemas.

- **`/supabase` :** Supabase configuration
    
    
    | **Folders and files** | **Description** |
    | --- | --- |
    | `/client` | Sets up the Supabase client for use in the browser, server, and middleware. |
    | `auth.config.ts` | Configures authentication settings to match Supabase settings. |

### **`middleware.ts`**

→ Middleware for request preprocessing, such as authentication or routing logic.
It should be in the root of your project to define Middleware. [Next.js Docs (middleware)](https://nextjs.org/docs/app/building-your-application/routing/middleware#convention)

---

<img width="700" alt="auth-flow" src="https://github.com/user-attachments/assets/25d84231-1bae-4c8f-bed3-d3dfc4aefbad">


## Authentication Flows

### Password-based

*Supabase dashboard > Project settings > Configuration > Authentication*

1. **Set up a custom SMTP server**

   Follow the [Supabase guide for SMTP setup](https://supabase.com/docs/guides/auth/auth-smtp) to complete this configuration.
2. **Set up password requirement**
   
   This AuthKit is configured as shown below:
   
  <img width="379" alt="set-up-password" src="https://github.com/user-attachments/assets/430fcc29-1968-43bc-8b4d-91c96a74beaf">

3. **Set up Site URL, Rediret URLS**
   
   Follow the [Supabase guide for Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls).
   This AuthKit is configured as shown below:

   1. **`https://nextjs-supabase-auth-kit.vercel.app/api/auth/callback`**
   2. For local development : **`http://localhost:3000/api/auth/callback`**
   
5. **Set up Email Templates**
   
   Follow the [Supabase guide for Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates).
   This AuthKit is configured as shown below:

  ```html
  [Confirm signup]

  <h2>Confirm your signup</h2>
  
  <p>Hello, <strong>{{ .Email }}</strong>. Here is your 6-digit code:</p>
  <p><strong style="font-size: 24px;">{{ .Token }}</strong></p>
  ```

  ```html
  [Reset Password]

  <h2>Reset Password</h2>

  <p>Hello, <strong>{{ .Email }}</strong>. Here is your 6-digit code:</p>
  <p><strong style="font-size: 24px;">{{ .Token }}</strong></p>
  ```
   
5. **Modify the code to match Supabase settings**
   
   This is centrally managed in **`/lib/supabase/auth.config.ts`**.

### Social Login (OAuth)

Refer to the [Supabase documentation on social login](https://supabase.com/docs/guides/auth/social-login) to complete the setup. Once configured, add the **'ContinueWithOAuth'** component to the /signin and /signup pages.

---

## Contirbutions🚀

As an open-source project, contributions are welcome. You can enhance or add features to Supabase [GoTrue(Go)](https://github.com/supabase/auth), [Supabase-js(TypeScript)](https://github.com/supabase/supabase-js), or this repository [AuthKit (TypeScript)](https://github.com/bytaesu/nextjs-supabase-auth-kit).
