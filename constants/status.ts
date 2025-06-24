export interface StatusMessage {
  message: string;
  class: string;
}

export const STATUS_MESSAGES = {
  COPYING: {
    message: "Copying text...",
    class: "",
  },
  SUCCESS: {
    message: "Text copied to clipboard!",
    class: "success",
  },
  COPY_FAILED: {
    message: "Failed to copy text.",
    class: "error",
  },
  NOT_LINEAR: {
    message: "This extension only works with Linear issues.",
    class: "error",
  },
  CLIPBOARD_NOT_SUPPORTED: {
    message: "Clipboard API is not supported in this browser.",
    class: "error",
  },
} as const;
