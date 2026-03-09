"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/format-date";

// Placeholder workout data — replace with real data fetching later
const MOCK_WORKOUTS = [
  { id: 1, name: "Morning Run", duration: "45 min", type: "Cardio" },
  { id: 2, name: "Bench Press", duration: "30 min", type: "Strength" },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>

        {/* Date picker */}
        <div className="mb-8">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(date)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  if (d) {
                    setDate(d);
                    setOpen(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Workouts list */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Workouts — {formatDate(date)}
          </h2>

          {MOCK_WORKOUTS.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No workouts logged for this date.
            </p>
          ) : (
            <ul className="space-y-3">
              {MOCK_WORKOUTS.map((workout) => (
                <li
                  key={workout.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">
                      {workout.name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {workout.type}
                    </p>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {workout.duration}
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
