import { IconButton } from "./iconButton";
import { useState, useEffect, useCallback } from "react";

type Props = {
  userMessage: string;
  isMicRecording: boolean;
  isChatProcessing: boolean;
  lang: string;
  
  onChangeUserMessage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClickSendButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickMicButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickLangButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const MessageInput = ({
  userMessage,
  isMicRecording,
  isChatProcessing,
  onChangeUserMessage,
  onClickMicButton,
  onClickSendButton,
  lang,
  onClickLangButton,
}: Props) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onClickSendButton(event);
      }
    },
    [onClickSendButton]
  );
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 17) {
        document.querySelector('input').focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className="absolute bottom-0 z-20 w-screen">
      <div className="bg-base text-black">
        <div className="mx-auto max-w-4xl p-16">
          <div className="grid grid-flow-col gap-[8px]  grid-cols-[min-content_min-content_1fr_min-content]">
			
			<IconButton
			  label= {lang === "ja-JP" ? "日" : "中"}
              iconName="24/FormatFontSize"
              className="bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled"
              isProcessing={isChatProcessing}
              disabled={isChatProcessing}
              onClick={onClickLangButton}
            />

            <IconButton
              iconName="24/Microphone"
              className="bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled"
              isProcessing={isMicRecording}
              disabled={isChatProcessing}
              onClick={onClickMicButton}
            />

            <input
              type="text"
              placeholder="聞きたいことをいれてね"
              onChange={onChangeUserMessage}
			  onKeyDown={handleKeyDown}
              disabled={isChatProcessing}
              className="bg-surface1 hover:bg-surface1-hover focus:bg-surface1 disabled:bg-surface1-disabled disabled:text-primary-disabled rounded-16 w-full px-16 text-text-primary typography-16 font-M_PLUS_2 font-bold disabled"
              value={userMessage}
            ></input>

            <IconButton
              iconName="24/Send"
              className="bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled"
              isProcessing={isChatProcessing}
              disabled={isChatProcessing || !userMessage}
              onClick={onClickSendButton}
            />


			
          </div>
        </div>
        <div className="py-4 bg-[#413D43] text-center text-white font-Montserrat">
          powered by VRoid, Koeiro API, ChatGPT API
        </div>
      </div>
    </div>
  );
};
