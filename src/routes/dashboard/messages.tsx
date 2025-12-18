import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Home, MessageSquare, Menu } from "lucide-react";
import { Page } from "~/components/Page";
import { PageTitle } from "~/components/PageTitle";
import { AppBreadcrumb } from "~/components/AppBreadcrumb";
import { ConversationList } from "~/components/ConversationList";
import { ChatView } from "~/components/ChatView";
import { Button } from "~/components/ui/button";
import { assertAuthenticatedFn } from "~/fn/guards";
import { useConversations } from "~/hooks/useConversations";
import type { ConversationWithParticipant } from "~/data-access/conversations";
import { cn } from "~/lib/utils";
import { Panel } from "~/components/ui/panel";

export const Route = createFileRoute("/dashboard/messages")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      conversation: search.conversation as string | undefined,
    };
  },
  beforeLoad: async () => {
    await assertAuthenticatedFn();
  },
  component: MessagesPage,
});

function MessagesPage() {
  const { conversation: conversationIdFromUrl } = Route.useSearch();
  const navigate = useNavigate();
  const { data: conversations } = useConversations();
  const [activeConversation, setActiveConversation] =
    useState<ConversationWithParticipant | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  // Find and set the active conversation from URL or default to first
  useEffect(() => {
    if (conversations && conversations.length > 0) {
      if (conversationIdFromUrl) {
        const found = conversations.find((c) => c.id === conversationIdFromUrl);
        if (found) {
          setActiveConversation(found);
          // On mobile, hide sidebar when a conversation is selected from URL
          if (window.innerWidth < 1024) {
            setShowSidebar(false);
          }
          return;
        }
      }
      // If no conversation in URL or not found, keep current or don't auto-select
    }
  }, [conversations, conversationIdFromUrl]);

  const handleSelectConversation = (
    conversation: ConversationWithParticipant
  ) => {
    setActiveConversation(conversation);
    navigate({
      to: "/dashboard/messages",
      search: { conversation: conversation.id },
    });
    // On mobile, hide sidebar when conversation is selected
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  const handleBack = () => {
    setShowSidebar(true);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Messages", icon: MessageSquare },
  ];

  return (
    <Page className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        {/* Header - only visible when sidebar is shown on mobile */}
        <div className={cn("mb-4", !showSidebar && "hidden lg:block")}>
          <AppBreadcrumb items={breadcrumbItems} />
          <div className="mt-4">
            <PageTitle
              title="Messages"
              description="Private conversations with community members"
            />
          </div>
        </div>

        {/* Main content area */}
        <Panel className="flex-1 flex min-h-0 overflow-hidden bg-card/50">
          {/* Sidebar - Conversation List */}
          <div
            className={cn(
              "w-full lg:w-80 border-r border-border/50 flex-shrink-0 overflow-y-auto bg-background/20 backdrop-blur-sm",
              !showSidebar && "hidden lg:block"
            )}
          >
            <div className="p-4 border-b border-border/50">
              <h2 className="font-semibold text-foreground">Conversations</h2>
            </div>
            <ConversationList
              activeConversationId={activeConversation?.id || null}
              onSelectConversation={handleSelectConversation}
            />
          </div>

          {/* Chat View */}
          <div
            className={cn(
              "flex-1 flex flex-col min-w-0 bg-background/20 backdrop-blur-sm",
              showSidebar && "hidden lg:flex"
            )}
          >
            <ChatView
              conversation={activeConversation}
              onBack={handleBack}
              showBackButton={!showSidebar}
            />
          </div>
        </Panel>
      </div>
    </Page>
  );
}
