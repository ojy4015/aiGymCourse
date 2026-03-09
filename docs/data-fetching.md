# Data Fetching

## CRITICAL: Server Components Only

**ALL data fetching MUST be done exclusively via React Server Components.**

The following are strictly forbidden:
- Route Handlers (`/app/api/` endpoints) for fetching data
- Client Components fetching data (no `useEffect` + `fetch`, no SWR, no React Query, etc.)
- Any other mechanism outside of Server Components

There are no exceptions to this rule.

## Database Queries via `/data` Helpers

All database queries must go through helper functions located in the `/data` directory.

### Rules:
1. **Never write raw SQL.** All queries must use Drizzle ORM.
2. **All `/data` helper functions must be called from Server Components only.**
3. **Never expose `/data` helpers to client-side code.**

### Example structure:
```
/data
  courses.ts
  enrollments.ts
  users.ts
  ...
```

### Example helper function:
```ts
// data/courses.ts
import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCoursesByUserId(userId: string) {
  return db.select().from(courses).where(eq(courses.userId, userId));
}
```

### Example Server Component usage:
```tsx
// app/dashboard/page.tsx
import { getCoursesByUserId } from "@/data/courses";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  const courses = await getCoursesByUserId(session.user.id);

  return <div>{/* render courses */}</div>;
}
```

## Data Isolation / Authorization

**Users must NEVER be able to access another user's data.**

Every `/data` helper function that queries user-specific data MUST:
1. Accept a `userId` parameter.
2. Always filter queries by that `userId` using a `where` clause.
3. Never return data without scoping it to the authenticated user.

The calling Server Component is responsible for retrieving the authenticated user's ID from the session and passing it to the helper. Never trust user input (e.g., URL params) as the `userId` — always use the server-side session.

### Correct pattern:
```ts
// data/enrollments.ts
export async function getEnrollmentsByUserId(userId: string) {
  return db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId)); // always scoped to the user
}
```

```tsx
// app/my-courses/page.tsx
export default async function MyCoursesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // userId comes from session, NOT from URL params or user input
  const enrollments = await getEnrollmentsByUserId(session.user.id);

  return <div>{/* render */}</div>;
}
```

### Incorrect patterns (never do these):
```ts
// WRONG: raw SQL
const result = await db.execute(sql`SELECT * FROM courses WHERE user_id = ${userId}`);

// WRONG: no user scoping
export async function getAllCourses() {
  return db.select().from(courses); // returns ALL users' data
}

// WRONG: trusting URL param as userId
const userId = params.userId; // attacker can change this
const data = await getUserData(userId);
```
##### end of test