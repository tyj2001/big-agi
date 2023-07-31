import * as React from 'react';
import { shallow } from 'zustand/shallow';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuItem,
  Stack,
  Textarea,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/joy';
import {
  ColorPaletteProp,
  SxProps,
  VariantProp,
} from '@mui/joy/styles/types';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import DataArrayIcon from '@mui/icons-material/DataArray';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MicIcon from '@mui/icons-material/Mic';
import PanToolIcon from '@mui/icons-material/PanTool';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SendIcon from '@mui/icons-material/Send';
import StopOutlinedIcon from '@mui/icons-material/StopOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { ContentReducer } from '~/modules/aifn/summarize/ContentReducer';
import { LLMOptionsOpenAI } from '~/modules/llms/openai/openai.vendor';
import { useChatLLM } from '~/modules/llms/store-llms';

import { ConfirmationModal } from '~/common/components/ConfirmationModal';
import { SpeechResult, useSpeechRecognition } from '~/common/components/useSpeechRecognition';
import { countModelTokens } from '~/common/util/token-counter';
import { extractFilePathsWithCommonRadix } from '~/common/util/dropTextUtils';
import { hideOnDesktop, hideOnMobile } from '~/common/theme';
import { htmlTableToMarkdown } from '~/common/util/htmlTableToMarkdown';
import { pdfToText } from '~/common/util/pdfToText';
import { useChatStore } from '~/common/state/store-chats';
import { useUIPreferencesStore } from '~/common/state/store-ui';

import { CameraCaptureButton } from './CameraCaptureButton';
import { ChatModeId } from '../../AppChat';
import { ChatModeMenu } from './ChatModeMenu';
import { TokenBadge } from './TokenBadge';
import { TokenProgressbar } from './TokenProgressbar';
import { useComposerStore } from './store-composer';

// Text template helpers

const PromptTemplates = {
  Concatenate: '{{input}}\n\n{{text}}',
  PasteFile: '{{input}}\n\n{{fileName}}\n{{fileText}}\n\n',
  PasteMarkdown: '{{input}}\n\n{{clipboard}}\n
\n',
};

const expandPromptTemplate = (template: string, dict: object) => (
  inputValue: string
): string => {
  let expanded = template.replaceAll('{{input}}', (inputValue || '').trim()).trim();
  for (const [key, value] of Object.entries(dict))
    expanded = expanded.replaceAll(`{{${key}}}`, value.trim());
  return expanded;
};

const { t } = useTranslation();

const attachFileLegend = (
  <Stack sx={{ p: 1, gap: 1, fontSize: '16px', fontWeight: 400 }}>
    <Box sx={{ mb: 1, textAlign: 'center' }}>
      {t('Attach a file to the message')}
    </Box>
    <table>
      <tbody>
        <tr>
          <td width={36}>
            <PictureAsPdfIcon sx={{ width: 24, height: 24 }} />
          </td>
          <td>
            <b>{t('PDF')}</b>
          </td>
          <td width={36} align="center" style={{ opacity: 0.5 }}>
            →
          </td>
          <td>📝 {t('Text (split manually)')}</td>
        </tr>
        <tr>
          <td>
            <DataArrayIcon sx={{ width: 24, height: 24 }} />
          </td>
          <td>
            <b>{t('Code')}</b>
          </td>
          <td align="center" style={{ opacity: 0.5 }}>
            →
          </td>
          <td>📚 {t('Markdown')}</td>
        </tr>
        <tr>
          <td>
            <FormatAlignCenterIcon sx={{ width: 24, height: 24 }} />
          </td>
          <td>
            <b>{t('Text')}</b>
          </td>
          <td align="center" style={{ opacity: 0.5 }}>
            →
          </td>
          <td>📝 {t('As-is')}</td>
        </tr>
      </tbody>
    </table>
    <Box sx={{ mt: 1, fontSize: '14px' }}>
      {t('Drag & drop in chat for faster loads ⚡')}
    </Box>
  </Stack>
);

const pasteClipboardLegend = (
  <Box sx={{ p: 1, fontSize: '14px', fontWeight: 400 }}>
    {t('Converts Code and Tables to 📚 Markdown')}
  </Box>
);

const MicButton = (props: {
  variant: VariantProp;
  color: ColorPaletteProp;
  onClick: () => void;
  sx?: SxProps;
}) => (
  <Tooltip title={t('CTRL + M')} placement="top">
    <IconButton
      variant={props.variant}
      color={props.color}
      onClick={props.onClick}
      sx={props.sx}
    >
      <MicIcon />
    </IconButton>
  </Tooltip>
);

const SentMessagesMenu = (props: {
  anchorEl: HTMLAnchorElement;
  onClose: () => void;
  messages: { date: number; text: string; count: number }[];
  onPaste: (text: string) => void;
  onClear: () => void;
}) => (
  <Menu
    variant="plain"
    color="neutral"
    size="md"
    placement="top-end"
    sx={{
      minWidth: 320,
      maxWidth: '100dvw',
      maxHeight: 'calc(100dvh - 56px)',
      overflowY: 'auto',
    }}
    open={!!props.anchorEl}
    anchorEl={props.anchorEl}
    onClose={props.onClose}
  >
    <MenuItem color="neutral" selected>
      {t('Reuse messages 💬')}
    </MenuItem>

    <ListDivider />

    {props.messages.map((item, index) => (
      <MenuItem
        key={'composer-sent-' + index}
        onClick={() => {
          props.onPaste(item.text);
          props.onClose();
        }}
        sx={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'inline',
          overflow: 'hidden',
        }}
      >
        {item.count > 1 && <span style={{ marginRight: 1 }}>({item.count})</span>}{' '}
        {item.text?.length > 70
          ? item.text.slice(0, 68) + '...'
          : item.text}
      </MenuItem>
    ))}

    <ListDivider />

    <MenuItem onClick={props.onClear}>
      <ListItemDecorator>
        <DeleteOutlineIcon />
      </ListItemDecorator>
      {t('Clear sent messages history')}
    </MenuItem>
  </Menu>
);

export function Composer(props: {
  conversationId: string | null;
  messageId: string | null;
  chatModeId: ChatModeId;
  setChatModeId: (chatModeId: ChatModeId) => void;
  isDeveloperMode: boolean;
  onSendMessage: (conversationId: string, text: string) => void;
  sx?: SxProps;
}) {
  const [composeText, setComposeText] = React.useState('');
  const [speechInterimResult, setSpeechInterimResult] = React.useState<
    SpeechResult | null
  >(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [reducerText, setReducerText] = React.useState('');
  const [reducerTextTokens, setReducerTextTokens] = React.useState(0);
  const [chatModeMenuAnchor, setChatModeMenuAnchor] =
    React.useState<HTMLAnchorElement | null>(null);
  const [sentMessagesAnchor, setSentMessagesAnchor] =
    React.useState<HTMLAnchorElement | null>(null);
  const [confirmClearSent, setConfirmClearSent] = React.useState(false);
  const attachmentFileInputRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { enterToSend, goofyLabs } = useUIPreferencesStore(
    (state) => ({
      enterToSend: state.enterToSend,
      goofyLabs: state.goofyLabs,
    }),
    shallow
  );
  const {
    sentMessages,
    appendSentMessage,
    clearSentMessages,
    startupText,
    setStartupText,
  } = useComposerStore();
  const {
    assistantTyping,
    tokenCount: conversationTokenCount,
    stopTyping,
  } = useChatStore(
    (state) => {
      const conversation = state.conversations.find(
        (conversation) => conversation.id === props.conversationId
      );
      return {
        assistantTyping: conversation ? !!conversation.abortController : false,
        tokenCount: conversation ? conversation.tokenCount : 0,
        stopTyping: state.stopTyping,
      };
    },
    shallow
  );
  const { chatLLMId, chatLLM } = useChatLLM();
  const tokenLimit = chatLLM?.contextTokens || 0;
  const directTokens = React.useMemo(() => {
    return !composeText || !chatLLMId
      ? 4
      : 4 + countModelTokens(composeText, chatLLMId, 'composer text');
  }, [chatLLMId, composeText]);
  const historyTokens = conversationTokenCount;
  const responseTokens = (chatLLM?.options as LLMOptionsOpenAI /* FIXME: BIG ASSUMPTION */)
    ?.llmResponseTokens || 0;
  const remainingTokens = tokenLimit - directTokens - historyTokens - responseTokens;

  const handleSendClicked = () => {
    const text = (composeText || '').trim();
    if (text.length && props.conversationId) {
      setComposeText('');
      props.onSendMessage(props.conversationId, text);
      appendSentMessage(text);
    }
  };

  const handleToggleChatMode = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => setChatModeMenuAnchor((anchor) =>
    anchor ? null : event.currentTarget
  );

  const handleHideChatMode = () => setChatModeMenuAnchor(null);

  const handleSetChatModeId = (chatModeId: ChatModeId) => {
    handleHideChatMode();
    props.setChatModeId(chatModeId);
  };

  const handleStopClicked = () =>
    props.conversationId && stopTyping(props.conversationId);

  const handleTextareaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const shiftOrAlt = e.shiftKey || e.altKey;
      if (enterToSend ? !shiftOrAlt : shiftOrAlt) {
        if (!assistantTyping) handleSendClicked();
        e.preventDefault();
      }
    }
  };

  const onSpeechResultCallback = React.useCallback(
    (result: SpeechResult) => {
      setSpeechInterimResult(result.done ? null : { ...result });
      if (result.done) {
        setComposeText((prevText) => {
          prevText = prevText.trim();
          const transcript = result.transcript.trim();
          return prevText ? prevText + ' ' + transcript : transcript;
        });
      }
    },
    []
  );

  const {
    isSpeechEnabled,
    isSpeechError,
    isRecordingAudio,
    isRecordingSpeech,
    toggleRecording,
  } = useSpeechRecognition(onSpeechResultCallback, 'm');

  const handleMicClicked = () => toggleRecording();

  const micColor = isSpeechError
    ? 'danger'
    : isRecordingSpeech
    ? 'warning'
    : isRecordingAudio
    ? 'warning'
    : 'neutral';
  const micVariant = isRecordingSpeech ? 'solid' : isRecordingAudio ? 'solid' : 'plain';

  async function loadAndAttachFiles(
    files: FileList,
    overrideFileNames: string[]
  ) {
    let newText = '';
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName =
        overrideFileNames.length === files.length
          ? overrideFileNames[i]
          : file.name;
      let fileText = '';
      try {
        if (file.type === 'application/pdf')
          fileText = await pdfToText(file);
        else fileText = await file.text();
        newText = expandPromptTemplate(PromptTemplates.PasteFile, {
          fileName: fileName,
          fileText: fileText,
        })(newText);
      } catch (error) {
        console.error(error);
        newText = `${newText}\n\n${t('Error loading file')} ${fileName}: ${error}\n`;
      }
    }

    if (chatLLMId) {
      const newTextTokens = countModelTokens(
        newText,
        chatLLMId,
        'reducer trigger'
      );
      if (newTextTokens > remainingTokens) {
        setReducerTextTokens(newTextTokens);
        setReducerText(newText);
        return;
      }
    }

    setComposeText((text) =>
      expandPromptTemplate(PromptTemplates.Concatenate, { text: newText })(text)
    );
  }

  const handleContentReducerClose = () => {
    setReducerText('');
  };

  const handleContentReducerText = (newText: string) => {
    handleContentReducerClose();
    setComposeText((text) => text + newText);
  };

  const handleShowFilePicker = () =>
    attachmentFileInputRef.current?.click();

  const handleLoadAttachment = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target?.files;
    if (files && files.length >= 1) await loadAndAttachFiles(files, []);
    e.target.value = '';
  };

  const handleCameraOCR = (text: string) =>
    text && setComposeText(expandPromptTemplate(PromptTemplates.PasteMarkdown, { clipboard: text }));

  const handlePasteButtonClicked = async () => {
    for (const clipboardItem of await navigator.clipboard.read()) {
      try {
        const htmlItem = await clipboardItem.getType('text/html');
        const htmlString = await htmlItem.text();
        if (htmlString.indexOf('<table') == 0) {
          const markdownString = htmlTableToMarkdown(htmlString);
          setComposeText(
            expandPromptTemplate(PromptTemplates.PasteMarkdown, {
              clipboard: markdownString,
            })
          );
          continue;
        }
      } catch (error) {
        // ignore missing html
      }

      try {
        const textItem = await clipboardItem.getType('text/plain');
        const textString = await textItem.text();
        setComposeText(
          expandPromptTemplate(PromptTemplates.PasteMarkdown, {
            clipboard: textString,
          })
        );
        continue;
      } catch (error) {
        // ignore missing text
      }

      console.log(
        'Clipboard item has no text/html or text/plain item.',
        clipboardItem.types,
        clipboardItem
      );
    }
  };

  const handleTextareaCtrlV = async (e: React.ClipboardEvent) => {
    if (e.clipboardData.files.length > 0) {
      e.preventDefault();
      await loadAndAttachFiles(e.clipboardData.files, []);
      return;
    }
  };

  const showSentMessages = (event: React.MouseEvent<HTMLAnchorElement>) =>
    setSentMessagesAnchor(event.currentTarget);

  const hideSentMessages = () => setSentMessagesAnchor(null);

  const handlePasteSent = (text: string) => setComposeText(text);

  const handleClearSent = () => setConfirmClearSent(true);

  const handleCancelClearSent = () => setConfirmClearSent(false);

  const handleConfirmedClearSent = () => {
    setConfirmClearSent(false);
    clearSentMessages();
  };

  const eatDragEvent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTextareaDragEnter = (e: React.DragEvent) => {
    eatDragEvent(e);
    setIsDragging(true);
  };

  const handleOverlayDragLeave = (e: React.DragEvent) => {
    eatDragEvent(e);
    setIsDragging(false);
  };

  const handleOverlayDragOver = (e: React.DragEvent) => {
    eatDragEvent(e);
  };

  const handleOverlayDrop = async (e: React.DragEvent) => {
    eatDragEvent(e);
    setIsDragging(false);

    if (e.dataTransfer.files?.length >= 1) {
      let overrideFileNames: string[] = [];
      if (e.dataTransfer.types?.includes('text/plain')) {
        const plainText = e.dataTransfer.getData('text/plain');
        overrideFileNames = extractFilePathsWithCommonRadix(plainText);
      }
      return loadAndAttachFiles(e.dataTransfer.files, overrideFileNames);
    }

    if (e.dataTransfer.types?.includes('codeeditors'))
      return setComposeText(
        (test) => test + 'Pasting from VSCode is not supported! Fixme. Anyone?'
      );

    const droppedText = e.dataTransfer.getData('text');
    if (droppedText?.length >= 1)
      return setComposeText((text) =>
        expandPromptTemplate(PromptTemplates.PasteMarkdown, {
          clipboard: droppedText,
        })(text)
      );

    console.log(
      'Unhandled Drop event. Contents: ',
      e.dataTransfer.types.map((t) => `${t}: ${e.dataTransfer.getData(t)}`)
    );
  };

  const isFollowUp = props.chatModeId === 'immediate-follow-up';
  const isReAct = props.chatModeId === 'react';
  const isWriteUser = props.chatModeId === 'write-user';

  const chatButton = (
    <Button
      fullWidth
      variant={isWriteUser ? 'soft' : 'solid'}
      color={isReAct ? 'info' : isFollowUp ? 'warning' : 'primary'}
      disabled={!props.conversationId || !chatLLM}
      onClick={handleSendClicked}
      onDoubleClick={handleToggleChatMode}
      endDecorator={
        isWriteUser ? (
          <SendIcon sx={{ fontSize: 18 }} />
        ) : isReAct ? (
          <PsychologyIcon />
        ) : (
          <TelegramIcon />
        )
      }
    >
      {isWriteUser ? 'Write' : isReAct ? 'ReAct' : isFollowUp ? 'Chat+' : 'Chat'}
    </Button>
  );

  return (
    <Box sx={props.sx}>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid xs={12} md={9}>
          <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 0, md: 2 },
              }}
            >
              {isSpeechEnabled && (
                <Box sx={hideOnDesktop}>
                  <MicButton
                    variant={micVariant}
                    color={micColor}
                    onClick={handleMicClicked}
                  />
                </Box>
              )}

              <CameraCaptureButton onOCR={handleCameraOCR} />

              <IconButton
                variant="plain"
                color="neutral"
                onClick={handleShowFilePicker}
                sx={{ ...hideOnDesktop }}
              >
                <AttachFileOutlinedIcon />
              </IconButton>
              <Tooltip
                variant="solid"
                placement="top-start"
                title={attachFileLegend}
              >
                <Button
                  fullWidth
                  variant="plain"
                  color="neutral"
                  onClick={handleShowFilePicker}
                  startDecorator={<AttachFileOutlinedIcon />}
                  sx={{ ...hideOnMobile, justifyContent: 'flex-start' }}
                >
                  {t('Attach')}
                </Button>
              </Tooltip>

              <IconButton
                variant="plain"
                color="neutral"
                onClick={handlePasteButtonClicked}
                sx={{ ...hideOnDesktop }}
              >
                <ContentPasteGoIcon />
              </IconButton>
              <Tooltip
                variant="solid"
                placement="top-start"
                title={pasteClipboardLegend}
              >
                <Button
                  fullWidth
                  variant="plain"
                  color="neutral"
                  startDecorator={<ContentPasteGoIcon />}
                  onClick={handlePasteButtonClicked}
                  sx={{ ...hideOnMobile, justifyContent: 'flex-start' }}
                >
                  {props.isDeveloperMode ? t('Paste code') : t('Paste')}
                </Button>
              </Tooltip>

              <input
                type="file"
                multiple
                hidden
                ref={attachmentFileInputRef}
                onChange={handleLoadAttachment}
              />
            </Box>

            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              <Box sx={{ position: 'relative' }}>
                <Textarea
                  variant="outlined"
                  color={isReAct ? 'info' : 'neutral'}
                  autoFocus
                  minRows={5}
                  maxRows={12}
                  placeholder={textPlaceholder}
                  value={composeText}
                  onChange={(e) => setComposeText(e.target.value)}
                  onDragEnter={handleTextareaDragEnter}
                  onKeyDown={handleTextareaKeyDown}
                  onPasteCapture={handleTextareaCtrlV}
                  slotProps={{
                    textarea: {
                      enterKeyHint: enterToSend ? 'send' : 'enter',
                      sx: {
                        ...(isSpeechEnabled ? { pr: { md: 5 } } : {}),
                        mb: 0.5,
                      },
                    },
                  }}
                  sx={{
                    background: theme.vars.palette.background.level1,
                    fontSize: '16px',
                    lineHeight: 1.75,
                  }}
                />

                {tokenLimit > 0 && (directTokens > 0 || historyTokens + responseTokens > 0) && (
                  <TokenProgressbar
                    history={historyTokens}
                    response={responseTokens}
                    direct={directTokens}
                    limit={tokenLimit}
                  />
                )}
              </Box>

              {isSpeechEnabled && (
                <MicButton
                  variant={micVariant}
                  color={micColor}
                  onClick={handleMicClicked}
                  sx={{
                    ...hideOnMobile,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 21,
                    m: 1,
                  }}
                />
              )}

              {!!tokenLimit && (
                <TokenBadge
                  directTokens={directTokens}
                  indirectTokens={historyTokens + responseTokens}
                  tokenLimit={tokenLimit}
                  absoluteBottomRight
                />
              )}

              {!!speechInterimResult && (
                <Card
                  color="primary"
                  invertedColors
                  variant="soft"
                  sx={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                    border: `1px solid ${theme.vars.palette.primary.solidBg}`,
                    borderRadius: theme.radius.xs,
                    zIndex: 20,
                    px: 1.5,
                    py: 1,
                  }}
                >
                  <Typography>
                    {speechInterimResult.transcript}{' '}
                    <span style={{ opacity: 0.5 }}>
                      {speechInterimResult.interimTranscript}
                    </span>
                  </Typography>
                </Card>
              )}

              <Card
                color="primary"
                invertedColors
                variant="soft"
                sx={{
                  display: isDragging ? 'flex' : 'none',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  border: '2px dashed',
                  borderRadius: theme.radius.xs,
                  zIndex: 10,
                }}
                onDragLeave={handleOverlayDragLeave}
                onDragOver={handleOverlayDragOver}
                onDrop={handleOverlayDrop}
              >
                <PanToolIcon
                  sx={{ width: 40, height: 40, pointerEvents: 'none' }}
                />
                <Typography level="body2" sx={{ pointerEvents: 'none' }}>
                  {t('I will hold on to this for you')}
                </Typography>
              </Card>
            </Box>
          </Stack>
        </Grid>

        <Grid xs={12} md={3}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {sentMessages.length > 0 && (
                <IconButton
                  disabled={!!sentMessagesAnchor}
                  variant="plain"
                  color="neutral"
                  onClick={showSentMessages}
                  sx={{ ...hideOnDesktop, mr: { xs: 1, md: 2 } }}
                >
                  <KeyboardArrowUpIcon />
                </IconButton>
              )}
              {assistantTyping ? (
                <Button
                  fullWidth
                  variant="soft"
                  color={isReAct ? 'info' : 'primary'}
                  disabled={!props.conversationId}
                  onClick={handleStopClicked}
                  endDecorator={<StopOutlinedIcon />}
                >
                  {t('Stop')}
                </Button>
              ) : (
                <ButtonGroup
                  variant={isWriteUser ? 'solid' : 'solid'}
                  color={isReAct ? 'info' : isFollowUp ? 'warning' : 'primary'}
                  sx={{ flexGrow: 1 }}
                >
                  {chatButton}
                  <IconButton
                    disabled={!props.conversationId || !chatLLM || !!chatModeMenuAnchor}
                    onClick={handleToggleChatMode}
                  >
                    <ExpandLessIcon />
                  </IconButton>
                </ButtonGroup>
              )}
            </Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ ...hideOnMobile, flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-end' }}
            >
              {sentMessages.length > 0 && (
                <Button
                  disabled={!!sentMessagesAnchor}
                  fullWidth
                  variant="plain"
                  color="neutral"
                  startDecorator={<KeyboardArrowUpIcon />}
                  onClick={showSentMessages}
                >
                  {t('History')}
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>

        {!!chatModeMenuAnchor && (
          <ChatModeMenu
            anchorEl={chatModeMenuAnchor}
            onClose={handleHideChatMode}
            experimental={goofyLabs}
            chatModeId={props.chatModeId}
            onSetChatModeId={handleSetChatModeId}
          />
        )}

        {!!sentMessagesAnchor && (
          <SentMessagesMenu
            anchorEl={sentMessagesAnchor}
            messages={sentMessages}
            onClose={hideSentMessages}
            onPaste={handlePasteSent}
            onClear={handleClearSent}
          />
        )}

        {reducerText?.length >= 1 && (
          <ContentReducer
            initialText={reducerText}
            initialTokens={reducerTextTokens}
            tokenLimit={remainingTokens}
            onReducedText={handleContentReducerText}
            onClose={handleContentReducerClose}
          />
        )}

        <ConfirmationModal
          open={confirmClearSent}
          onClose={handleCancelClearSent}
          onPositive={handleConfirmedClearSent}
          confirmationText={t(
            'Are you sure you want to clear all your sent messages?'
          )}
          positiveActionText={t('Clear all')}
        />
      </Grid>
    </Box>
  );
}
