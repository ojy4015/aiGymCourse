import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getWorkoutsByUserIdAndDate } from "@/data/workouts";
import { formatDate } from "@/lib/format-date";
import { DatePicker } from "./date-picker";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const { date: dateParam } = await searchParams;
  const date = dateParam ? new Date(`${dateParam}T00:00:00`) : new Date();

  const workouts = await getWorkoutsByUserIdAndDate(user.id, date);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>

        {/* Date picker */}
        <div className="mb-8">
          <DatePicker selected={date} />
        </div>

        {/* Workouts list */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Workouts — {formatDate(date)}
          </h2>

          {workouts.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No workouts logged for this date.
            </p>
          ) : (
            <ul className="space-y-3">
              {workouts.map((workout) => (
                <li
                  key={workout.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {workout.name}
                  </p>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formatDate(workout.loggedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
