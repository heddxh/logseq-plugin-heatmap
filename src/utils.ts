import React, { useState } from "react";
import { useMountedState } from "react-use";

export const useAppVisible = () => {
  const [visible, setVisible] = useState(logseq.isMainUIVisible);
  const isMounted = useMountedState();
  React.useEffect(() => {
    const eventName = "ui:visible:changed";
    const handler = async ({ visible }: any) => {
      if (isMounted()) {
        setVisible(visible);
      }
    };
    logseq.on(eventName, handler);
    return () => {
      logseq.off(eventName, handler);
    };
  }, [isMounted]);
  return visible;
};

export const useSidebarVisible = () => {
  const [visible, setVisible] = useState(false);
  const isMounted = useMountedState();
  React.useEffect(() => {
    logseq.App.onSidebarVisibleChanged(({ visible }) => {
      if (isMounted()) {
        setVisible(visible);
      }
    });
  }, [isMounted]);
  return visible;
};

export const useThemeMode = () => {
  const isMounted = useMountedState();
  const [mode, setMode] = React.useState<"dark" | "light">("light");
  React.useEffect(() => {
    (async () => {
      const config = await logseq.App.getUserConfigs();
      if (isMounted()) {
        setMode(config.preferredThemeMode);
      }
      logseq.App.onThemeModeChanged((s) => {
        if (isMounted()) {
          setMode(s.mode);
        }
      });
    })();
  }, [isMounted]);

  return mode === "dark" ? "dark" : "light";
};
