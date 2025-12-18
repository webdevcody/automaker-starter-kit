# Messaging Epic

## Overview
This epic contains all features related to private messaging between community members. Users can start conversations and send direct messages.

## Features (6 total)
- **34**: Conversation table schema
- **35**: Message table schema
- **36**: Start conversation
- **37**: Send message
- **38**: View conversations list
- **39**: View messages in conversation

## Implementation Order
1. Start with feature 34 (conversation table)
2. Add message table (35)
3. Build conversation management (36)
4. Build messaging (37)
5. Build conversation viewing (38-39)

## Dependencies
- Requires User Profiles epic (for starting conversations from profiles)
- Integrates with Notifications epic (for new message notifications)

