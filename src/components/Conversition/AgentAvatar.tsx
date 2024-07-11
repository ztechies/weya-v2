import { Avatar } from "@nextui-org/react";
import { DgSvg } from "./DgSvg";
import { Message } from "ai/react";
import { useMessageData } from "../../context/MessageMetadata";
import { useAudioStore } from "../../context/AudioStore";
import { voiceMap } from "../../context/Deepgram";
import { UserAvatar } from "./UserAvatar";

export const AgentAvatar = ({
  message,
  className = "",
}: {
  message: Message;
  className?: string;
}) => {
  const { audioStore } = useAudioStore();
  const { messageData } = useMessageData();

  const foundAudio = audioStore.findLast((item) => item.id === message.id);
  const foundData = messageData.findLast((item) => item.id === message.id);

  if (foundAudio?.model) {
    
    return  <div className="self-end md:self-start h-8 w-8 text-white shrink-0 pt-1 mt-1 rounded-full bg-black border border-zinc-300 overflow-hidden">
    <UserAvatar />
  </div>;
  }

  if (foundData?.ttsModel) {
    return  <div className="self-end md:self-start h-8 w-8 text-white shrink-0 pt-1 mt-1 rounded-full bg-black border border-zinc-300 overflow-hidden">
    <UserAvatar />
  </div>;
  }

  return <DgSvg />;
};
