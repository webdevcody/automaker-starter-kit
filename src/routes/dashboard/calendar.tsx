import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { Calendar } from "~/components/Calendar";
import { EventModal } from "~/components/EventModal";
import { EventDialog } from "~/components/EventDialog";
import { useEvents } from "~/hooks/useEvents";
import { useIsAdmin } from "~/hooks/usePosts";
import { Home } from "lucide-react";
import type { EventWithUser } from "~/data-access/events";

export const Route = createFileRoute("/dashboard/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventWithUser | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventWithUser | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get admin status
  const { data: adminData } = useIsAdmin();
  const isAdmin = adminData?.isAdmin ?? false;

  // Calculate date range for current month
  const dateRange = useMemo(() => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    // Include a bit of buffer to catch events that might span months
    start.setDate(start.getDate() - 7);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }, [currentMonth]);

  const { data: events = [], isLoading } = useEvents(
    dateRange.start,
    dateRange.end,
    true
  );

  const handleEventClick = (event: EventWithUser) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setEventToEdit(null);
    setEventDialogOpen(true);
  };

  const handleEditEvent = (event: EventWithUser) => {
    setEventToEdit(event);
    setSelectedDate(undefined);
    setEventDialogOpen(true);
  };

  return (
    <Page>
      <div className="space-y-8">
        <AppBreadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard", icon: Home },
            { label: "Calendar" },
          ]}
        />

        <PageTitle
          title="Calendar"
          description="View upcoming events and important dates"
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading calendar...</div>
          </div>
        ) : (
          <Calendar
            events={events}
            onEventClick={handleEventClick}
            onDayClick={isAdmin ? handleDayClick : undefined}
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
          />
        )}

        <EventModal
          event={selectedEvent}
          open={eventModalOpen}
          onOpenChange={setEventModalOpen}
          isAdmin={isAdmin}
          onEdit={handleEditEvent}
        />

        {isAdmin && (
          <EventDialog
            open={eventDialogOpen}
            onOpenChange={setEventDialogOpen}
            event={eventToEdit}
            initialDate={selectedDate}
          />
        )}
      </div>
    </Page>
  );
}
