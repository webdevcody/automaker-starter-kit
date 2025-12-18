import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ExternalLink, Calendar, Clock, User, Tag, Pencil, Trash2 } from "lucide-react";
import type { EventWithUser } from "~/data-access/events";
import { EVENT_TYPE_LABELS } from "~/components/EventForm";
import { UserAvatar } from "~/components/UserAvatar";
import { ConfirmDeleteDialog } from "~/components/ConfirmDeleteDialog";
import { useDeleteEvent } from "~/hooks/useEvents";
import { formatDateTime, formatTime } from "~/utils/date";

interface EventModalProps {
  event: EventWithUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
  onEdit?: (event: EventWithUser) => void;
}

export function EventModal({ event, open, onOpenChange, isAdmin, onEdit }: EventModalProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteEventMutation = useDeleteEvent();

  if (!event) return null;

  const startDate = new Date(event.startTime);
  const endDate = event.endTime ? new Date(event.endTime) : null;

  const handleDelete = () => {
    deleteEventMutation.mutate(event.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        onOpenChange(false);
      },
    });
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(event);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-2xl">{event.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Tag className="h-4 w-4" />
                    <span>{EVENT_TYPE_LABELS[event.eventType as keyof typeof EVENT_TYPE_LABELS]}</span>
                  </div>
                </DialogDescription>
              </div>
              {isAdmin && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleEdit}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* Date and Time */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(startDate)}
                  </p>
                  {endDate && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Ends at {formatTime(endDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}

            {/* Created By */}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <UserAvatar imageKey={event.user.image} name={event.user.name} size="sm" />
                <div>
                  <p className="text-sm font-medium">{event.user.name}</p>
                  <p className="text-xs text-muted-foreground">Event creator</p>
                </div>
              </div>
            </div>

            {/* Event Link */}
            {event.eventLink && (
              <div className="pt-2">
                <Button asChild className="w-full" variant="default">
                  <a
                    href={event.eventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Join Event
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isPending={deleteEventMutation.isPending}
        title="Delete Event"
        description={`Are you sure you want to delete "${event.title}"? This action cannot be undone.`}
      />
    </>
  );
}
