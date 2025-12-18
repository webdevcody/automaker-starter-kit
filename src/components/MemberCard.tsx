import { Link } from "@tanstack/react-router";
import { UserAvatar } from "~/components/UserAvatar";
import { Panel, PanelContent } from "~/components/ui/panel";
import type { MemberWithUser } from "~/data-access/members";
import { formatRelativeTime } from "~/utils/song";

interface MemberCardProps {
  member: MemberWithUser;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Panel className="hover:shadow-lg hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1">
      <Link
        to="/profile/$userId"
        params={{ userId: member.id }}
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
      >
        <PanelContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <UserAvatar
              imageKey={member.image}
              name={member.name}
              size="lg"
              className="shrink-0 ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-300"
            />
            <div className="space-y-1 w-full">
              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                {member.name || "Anonymous"}
              </h3>
              <p className="text-muted-foreground text-xs">
                Joined{" "}
                {formatRelativeTime(new Date(member.createdAt).toISOString())}
              </p>
            </div>
          </div>
        </PanelContent>
      </Link>
    </Panel>
  );
}
