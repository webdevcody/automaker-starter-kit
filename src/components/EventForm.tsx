import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Calendar, Link as LinkIcon } from "lucide-react";
import { EVENT_TYPES } from "~/fn/events";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { localDateTimeToISO } from "~/utils/date";

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().optional().or(z.literal("")),
  eventLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  eventType: z.enum(EVENT_TYPES),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

/** Data submitted by the event form (with ISO datetime strings) */
export interface EventSubmitData {
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  eventLink?: string;
  eventType: EventFormData["eventType"];
}

export const EVENT_TYPE_LABELS: Record<(typeof EVENT_TYPES)[number], string> =
  {
    "live-session": "Live Session",
    workshop: "Workshop",
    meetup: "Meetup",
    "assignment-due": "Assignment Due",
  };

export const EVENT_TYPE_DESCRIPTIONS: Record<
  (typeof EVENT_TYPES)[number],
  string
> = {
  "live-session": "A live coding session or tutorial",
  workshop: "An interactive workshop",
  meetup: "Community meetup or networking event",
  "assignment-due": "Assignment deadline reminder",
};

interface EventFormProps {
  defaultValues?: Partial<EventFormData>;
  onSubmit: (data: EventSubmitData) => void | Promise<void>;
  isPending?: boolean;
  submitLabel?: string;
  submitIcon?: React.ReactNode;
  onCancel?: () => void;
  cancelLabel?: string;
}

export function EventForm({
  defaultValues,
  onSubmit,
  isPending = false,
  submitLabel = "Create Event",
  submitIcon = <Calendar className="h-4 w-4 mr-2" />,
  onCancel,
  cancelLabel = "Cancel",
}: EventFormProps) {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      eventLink: "",
      eventType: "live-session",
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: EventFormData) => {
    // Convert datetime-local strings to ISO strings
    await onSubmit({
      title: data.title,
      description: data.description,
      startTime: localDateTimeToISO(data.startTime),
      endTime: data.endTime ? localDateTimeToISO(data.endTime) : undefined,
      eventLink: data.eventLink,
      eventType: data.eventType,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Event title"
                  className="h-11 text-base"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/200 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Event Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex flex-col">
                        <span>{EVENT_TYPE_LABELS[type]}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {EVENT_TYPE_DESCRIPTIONS[field.value]}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Start Time *
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    className="h-11 text-base"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  End Time (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    className="h-11 text-base"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Event description (optional)"
                  className="min-h-[120px] text-base resize-none"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/5000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Event Link (Optional)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://zoom.us/j/..."
                    className="h-11 text-base pl-10"
                    disabled={isPending}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Zoom, Google Meet, or other meeting link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 pt-4 border-t border-border">
          <div className="flex gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={isPending}
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {submitIcon}
                  {submitLabel}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
