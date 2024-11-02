import { WindowProps } from './props.js';
import '@copilotkit/shared';

declare const Window: ({ open, setOpen, children, clickOutsideToClose, shortcut, hitEscapeToClose, }: WindowProps) => JSX.Element;

export { Window };
