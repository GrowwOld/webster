// both of these functions need to be passed to input/NumberInput to prevent value from changing when scrolling while focus on input
export function preventDefaultEventBehaviour(e: Event) {
  e.preventDefault();
}

export function preventNumberInputWheelChangeOnFocus(e: React.FocusEvent<HTMLInputElement, Element>, eventListererCB: (...args: any) => void) {
  e.target.addEventListener('wheel', eventListererCB);
}

export function preventNumberInputWheelChangeOnBlur(e: React.FocusEvent<HTMLInputElement, Element>, eventListererCB: (...args: any) => void) {
  e.target.removeEventListener('wheel', eventListererCB);
}
