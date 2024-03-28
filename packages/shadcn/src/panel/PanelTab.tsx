import { mergeCSSClasses } from "@blocknote/core";

import { PanelTabProps } from "../../../react/src";

export const PanelTab = (props: PanelTabProps) => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={mergeCSSClasses("bn-image-panel-tab", className || "")}
      {...rest}>
      {children}
    </div>
  );
};
