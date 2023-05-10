import { IconButton } from "./iconButton";
import { Message } from "@/features/messages/messages";
import { KoeiroParam } from "@/features/constants/koeiroParam";
import { ChatLog } from "./chatLog";
import React, { useCallback, useContext, useRef, useState,useEffect } from "react";
import { Settings } from "./settings";
import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import { AssistantText } from "./assistantText";

type Props = {
  openAiKey: string;
  systemPrompt: string;
  chatLog: Message[];
  koeiroParam: KoeiroParam;
  assistantMessage: string;
  onChangeSystemPrompt: (systemPrompt: string) => void;
  onChangeAiKey: (key: string) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeKoeiromapParam: (param: KoeiroParam) => void;
};
export const Menu = ({
  openAiKey,
  systemPrompt,
  chatLog,
  koeiroParam,
  assistantMessage,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeChatLog,
  onChangeKoeiromapParam,
}: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showChatLog, setShowChatLog] = useState(false);
  const [autoDeleteLog, setautoDeleteLog] = useState(false);
  
  const [outputMessage, setOutputMessage] = useState<Message[]>([]);
  
  const { viewer } = useContext(ViewerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeSystemPrompt = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeSystemPrompt(event.target.value);
    },
    [onChangeSystemPrompt]
  );

  const handleAiKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAiKey(event.target.value);
    },
    [onChangeAiKey]
  );

  const handleChangeKoeiroParam = useCallback(
    (x: number, y: number) => {
      onChangeKoeiromapParam({
        speakerX: x,
        speakerY: y,
      });
    },
    [onChangeKoeiromapParam]
  );

  const handleClickOpenVrmFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChangeVrmFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const file = files[0];
      if (!file) return;

      const file_type = file.name.split(".").pop();

      if (file_type === "vrm") {
        const blob = new Blob([file], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(blob);
        viewer.loadVrm(url);
      }

      event.target.value = "";
    },
    [viewer]
  );

	const onDeleteChatLog = (mylenth: number) => {
		while  (chatLog.length > mylenth) {	
				const NewMessage = chatLog[0];
				setOutputMessage((prevOutputMessage) => [...prevOutputMessage, NewMessage]);
				chatLog.splice(0, 1);		
		}		
	};
	const onUndoChatLog = () => {				
		chatLog.splice( chatLog.length-1 , 1);
		chatLog.splice( chatLog.length-1 , 1);
	};
    useEffect(() => {
		if (autoDeleteLog) {
		  onDeleteChatLog(10);
		}
	}, [autoDeleteLog,chatLog.length]);
	
	const handleDownloadChatLog = () => {
	  const allMessages = [...outputMessage, ...chatLog];
	  // 添加索引
	  const chatLogWithIndex = allMessages.map((message, index) => ({
		//index: index + 1,
		...message,
		role: `${index + 1} ${message.role}`,
	  }) );

	  // 创建一个 Blob 对象
	  const blob = new Blob([JSON.stringify(chatLogWithIndex, null, 2)], {
		type: 'application/json',
	  });

	  // 创建一个 URL 对象
	  const url = URL.createObjectURL(blob);

	  // 创建一个 a 标签
	  const a = document.createElement('a');
	  a.href = url;
	  a.download = 'chatLog.json';

	  // 触发下载
	  a.click();

	  // 释放 URL 对象
	  URL.revokeObjectURL(url);
	};

	
  return (
    <>
      <div className="absolute z-10 m-24">
        <div className="grid grid-flow-col gap-[8px]">
          <IconButton
            iconName="24/Menu"
            label="設定"
            isProcessing={false}
            onClick={() => setShowSettings(true)}
          ></IconButton>
          {showChatLog ? (
            <IconButton
              iconName="24/CommentOutline"
              label="log"
              isProcessing={false}
              onClick={() => setShowChatLog(false)}
            />
          ) : (
            <IconButton
              iconName="24/CommentFill"
              label="log"
              isProcessing={false}
              disabled={chatLog.length <= 0}
              onClick={() => setShowChatLog(true)}
            />
          )}
		   <IconButton
            iconName="24/Trash"
            label="全消し"
			isProcessing={false}
            onClick={() =>  onDeleteChatLog(0) }
          ></IconButton>
		  <IconButton
            iconName="24/Reload"
            label="undo"
			isProcessing={false}
            onClick={() =>  onUndoChatLog() }
          ></IconButton>
		  
		  {autoDeleteLog ? (
            <IconButton
              iconName="24/FrameEffect"
              label="AutoKill"
              isProcessing={false}
              onClick={() => setautoDeleteLog(false)}
            />
          ) : (
            <IconButton
              iconName="24/FrameSize"
              label="off"
              isProcessing={false}
              onClick={() => setautoDeleteLog(true)}
            />
          )}
		  <IconButton
            iconName="24/DownloadAlt"
            label="log DL"
            isProcessing={false}
             onClick={handleDownloadChatLog}
          ></IconButton>
		  
        </div>
      </div>
	  
      {showChatLog && <ChatLog messages={chatLog} />}
      {showSettings && (
        <Settings
          openAiKey={openAiKey}
          chatLog={chatLog}
          systemPrompt={systemPrompt}
          koeiroParam={koeiroParam}
          onClickClose={() => setShowSettings(false)}
          onChangeAiKey={handleAiKeyChange}
          onChangeSystemPrompt={handleChangeSystemPrompt}
          onChangeChatLog={onChangeChatLog}
          onChangeKoeiroParam={handleChangeKoeiroParam}
          onClickOpenVrmFile={handleClickOpenVrmFile}
        />
      )}
      {!showChatLog && assistantMessage && (
        <AssistantText message={assistantMessage} />
      )}
      <input
        type="file"
        className="hidden"
        accept=".vrm"
        ref={fileInputRef}
        onChange={handleChangeVrmFile}
      />
    </>
  );
};
