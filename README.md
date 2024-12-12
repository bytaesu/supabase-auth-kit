![nextjs-supabase-auth-kit](https://github.com/user-attachments/assets/eec5e637-e244-450b-8083-b045e91d8b1f)

# Overview

### Introduction

This is an AuthKit built using [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/), designed for **production-ready use**. It includes basic UI elements provided with [TailwindCSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/). Authentication is handled through both Password-based and OAuth methods, following the PKCE flow.

### Teck stacks

- TypeScript
- Next.js 14 (React 18) using App Router
- Supabase
- Tailwind CSS
- Shadcn UI
- Zod

### Why Next.js 14?

Many packages do not yet support React 19, so I plan to upgrade to Next.js 15 when the timing is appropriate. Apart from asynchronously loading cookies() and searchParams, there are no significant differences in this AuthKit.

### Changelog

***[ 2024-12-12 ]***

I have been developing my personal projects using a feature-based folder structure, so I adjusted the folder structure accordingly. In my personal opinion, it is more intuitive and scalable.

***[ 2024-10-31 ]***

Updated CSS styling to use shadcn defaults for a more primitive kit setup. Renamed folders and files and refactored code for a more understandable structure.

# Folder and file structure

### **`/app`**

→ The core application directory managed by the Next.js App Router.

| **Folders and files** | **Description** |
| --- | --- |
| `(auth)` | Auth route groups |
| `(private)` | Private route groups |
| `(public)` | Public route groups |
| `/api` | Route handlers |
| `/fonts` | Local fonts |
| `layout.tsx` | Root layout |

### **`/features`**

→ The modules that are tightly coupled to specific app features.

### **`/shared`**

→ The resources that are shared across all app features.

### **`middleware.ts`**

→ Middleware for request preprocessing, such as authentication or routing logic.

# Authentication Flows

<img width="500" alt="auth-flow" src="https://github.com/user-attachments/assets/0b5847e1-f61e-41f8-9b5c-7d37605d295c">

## Password-based

1. **Set up a custom SMTP server**
    
    Follow the [Supabase guide for SMTP setup](https://supabase.com/docs/guides/auth/auth-smtp) to complete this configuration.
    
2. **Set up password requirement**
    
    This AuthKit is configured as shown below:
    

    <img width="379" alt="set-up-password" src="https://github.com/user-attachments/assets/430fcc29-1968-43bc-8b4d-91c96a74beaf">

3. **Set up Site URL, Rediret URLS**
    
    Follow the [Supabase guide for Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls).
    This AuthKit is configured as shown below:
    
    1. **`http://nextjs-supabase-auth-kit.vercel.app/api/auth/callback`**
    2. For local development : **`http://localhost:3000/api/auth/callback`** 
4. **Set up Email Templates**
    
    Follow the [Supabase guide for Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates).
    This AuthKit is configured as shown below:

    ```html
    [Confirm signup]
    
    <h2>Confirm your signup</h2>
    
    <p>Hello, <strong>{{ .Email }}</strong>. Here is your 6-digit code:</p>
    <p><strong style="font-size: 24px;">{{ .Token }}</strong></p>
    ```

    ```html
    [Change Email Address]
    
    <h2>Confirm Change of Email</h2>
    
    <p>Follow this link to confirm the update of your email from {{ .Email }} to {{ .NewEmail }}:</p>
    <p><a href="{{ .ConfirmationURL }}">Change Email</a></p>
    ```

5. **Modify the code to match Supabase settings**
    
    This is centrally managed in **`src/features/auth/lib/auth.config.ts`**
    

## Social Login (OAuth)

Refer to the [Supabase documentation on social login](https://supabase.com/docs/guides/auth/social-login) to complete the setup. Once configured, add the **'ContinueWithOAuth'** component to the /signin and /signup pages.

# Contirbutions🚀

As an open-source project, contributions are welcome. You can enhance or add features to Supabase [GoTrue(Go)](https://github.com/supabase/auth), [Supabase-js(TypeScript)](https://github.com/supabase/supabase-js), or this repository [AuthKit (TypeScript)](https://github.com/bytaesu/nextjs-supabase-auth-kit).
