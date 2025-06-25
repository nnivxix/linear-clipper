import { createIssue } from "@/utils/createIssue";
import { STATUS_MESSAGES, type StatusMessage } from "@/constants/status";

export interface ClipboardHandlerParams {
  source: string | undefined;
  title?: string;
  copy: (text: string) => Promise<void>;
  isSupported: boolean;
}

export interface ClipboardHandlerResult {
  status: StatusMessage;
}

export const handleClipboardCopy = async ({
  source,
  title,
  copy,
  isSupported,
}: ClipboardHandlerParams): Promise<ClipboardHandlerResult> => {
  // Check if the source is a Linear URL
  if (!source?.includes("linear.app")) {
    return { status: STATUS_MESSAGES.NOT_LINEAR };
  }

  if (source.split("/").at(4) !== "issue") {
    return { status: STATUS_MESSAGES.NOT_ISSUE };
  }

  const { markdownLink } = createIssue(source, title);

  // Handle clipboard copy based on browser support
  if (isSupported) {
    try {
      await copy(markdownLink);
      return { status: STATUS_MESSAGES.SUCCESS };
    } catch (error) {
      console.error("Copy error:", error);
      return { status: STATUS_MESSAGES.COPY_FAILED };
    }
  } else {
    return { status: STATUS_MESSAGES.CLIPBOARD_NOT_SUPPORTED };
  }
};
