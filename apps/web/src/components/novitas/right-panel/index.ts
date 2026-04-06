import { AiMessageContent } from "./ai-message-content";
import { RightPanelChat } from "./right-panel-chat";

/** 우측 패널(채팅) 하위 컴포넌트 — 메인 `RightPanel`은 `novitas/right-panel.tsx` */
export const RightPanelParts = {
  Chat: RightPanelChat,
  AiMessageContent,
} as const;

export type RightPanelPartsNamespace = typeof RightPanelParts;
