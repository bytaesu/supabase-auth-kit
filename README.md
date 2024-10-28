![nextjs-supabase-auth-kit](https://github.com/user-attachments/assets/b520bf7f-93c8-416c-8642-1019d7a9f147)


# Overview

This is an AuthKit built using **Next.js** and **Supabase**, designed for production-ready use. It includes basic UI elements provided with **TailwindCSS** and **Shadcn-UI**. Authentication is handled through both Password-based and OAuth methods, following the PKCE flow.

### Why I created this?
While [Supabase Auth Guide](https://supabase.com/docs/guides/auth) is excellent, it may not be entirely sufficient for production environments. And I wanted to modularize the process to avoid repetitive coding. With this AuthKit, you can easily leverage the strengths of Next.js and Supabase.

## Teck stacks

- Next.js 14 (React 18) using App Router
- Supabase
- Tailwind CSS
- Shadcn UI
- Zod
- Typescript

**Why Next.js 14?**

Many packages do not support React 19 yet. Therefore, I plan to upgrade to Next.js 15 when the timing is appropriate. Apart from asynchronously loading cookies() and SearchParams, there are no significant differences in this AuthKit.

## Folder and file structure

### **`/actions`**

- Server Actions

### **`/app`**

- Main application routes and pages, managed by the Next.js App Router.

| **Folders and files** | **Description** |
| --- | --- |
| `(auth)` | Auth route groups |
| `(private)` | Private route groups |
| `(public)` | Public route groups |
| `/api` | Route handlers |
| `/fonts` | Local fonts |
| `layout.tsx` | Root layout |

### **`/components`**

- React components

| **Folders** | **Description** |
| --- | --- |
| `/features` | Components that are tightly coupled to specific app features. |
| `/ui` | Reusable UI components for multiple pages, including components from shadcn-ui. |

### **`/hooks`**

- Custom reusable React hooks.

### **`/lib`**

- Shared libraries such as utilities, types and constants.
- **`/supabase`** : Supabase configuration

### **`middleware.ts`**

- Middleware for request preprocessing, such as authentication or routing logic.

## Authentication Flows

### Password-based

*Supabase dashboard > Project settings > Configuration > Authentication*

1. **Set up a custom SMTP server**. Follow the [Supabase guide for SMTP setup](https://supabase.com/docs/guides/auth/auth-smtp) to complete this configuration.
2. **Setup password requirement**. This AuthKit is configured as shown below:
<img width="379" alt="password-setting" src="https://github.com/user-attachments/assets/fea0cdba-0b80-472b-89a2-12a2c9e15f8f">

3. **Change the code match to Supabase settings**

| **Location** | **Description** |
| --- | --- |
| `/constants` | Configure authentication routes, custom error messages, and password requirements here. These settings are exported to other files, so you only need to define them once in this file. |
| `middleware.ts` | Add any additional logic to be processed at the middleware level here. It’s recommended not to modify the default logic provided. |

### Social Login (OAuth)

Refer to the [Supabase documentation on social login](https://supabase.com/docs/guides/auth/social-login) to complete the setup. Once configured, add the ContinueWithOAuth component to the /signin and /signup pages.

## Contirbutions

As an open-source project, contributions are welcome. You can enhance or add features to Supabase [GoTrue (Go)](https://github.com/supabase/auth), [Supabase-js (TypeScript)](https://github.com/supabase/supabase-js), or this Repository [AuthKit (TypeScript)](https://github.com/bytaesu/nextjs-supabase-auth-kit).
