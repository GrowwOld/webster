import React from 'react';
import cn from 'classnames';
import './inputField.css';


const InputField = (props: Props) => {

  const {
    showError = false,
    onEnterPress,
    onBackspace,
    onInput,
    customClass,
    fontSize = '',
    id = '',
    inputDataTestId = '',
    inputType = 'text',
    autoComplete = 'on',
    disableCopyPaste = false,
    disabled = false,
    maxNumber = 10000000,
    minNumber = 0,
    maxTextLimit = 250,
    placeholder = '',
    noErrorText = '',
    value = '',
    label,
    errorDataTestId = '',
    errorText = 'Please recheck your input'
  } = props;

  const labelClass = cn({
    labelError: showError
  });

  const barClass = cn({
    bar: true,
    barError: showError
  });


  const onCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };


  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };


  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      if (onEnterPress) {
        onEnterPress(event);
      }

      return false;
      // returning false will prevent the event from bubbling up.
    } else if (event.keyCode === 8) {
      if (onBackspace) {
        onBackspace(event);
        return false;
      }

    } else {
      return true;
    }

    return true;
  };

  return (
    <div className="group inf11Input">
      <input
        className={customClass}
        style={fontSize === '' ? {} : { fontSize: fontSize }}
        id={id}
        type={inputType}
        onInput={onInput}
        value={value}
        maxLength={maxTextLimit}
        min={minNumber}
        max={maxNumber}
        disabled={disabled}
        onCopy={disableCopyPaste ? (e) => onCopy(e) : () => { }}
        onPaste={disableCopyPaste ? (e) => onPaste(e) : () => { }}
        onKeyUp={(e) => onKeyUp(e)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        data-test-id={inputDataTestId.length ? inputDataTestId : null}
      />

      <span className={barClass} />

      <label className={labelClass}
        style={fontSize === '' ? {} : { fontSize: fontSize }}
      >{label}</label>

      {
        showError
          ? <div
            className="errorText"
            data-test-id={errorDataTestId ? errorDataTestId : null}
          >
            {errorText}
          </div>
          : null
      }

      {!showError && noErrorText !== '' ? <div className="noErrorText">{noErrorText}</div> : null}
    </div>
  );
};


export default InputField;


type Props = {
  label: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string | number;
  id: string;
  inputType: string;
  showError: boolean;
  errorText: string;
  noErrorText: string;
  disabled: boolean;
  disableCopyPaste: boolean;
  onEnterPress: Function;
  onBackspace: Function;
  maxTextLimit: number;
  minNumber: number;
  maxNumber: number;
  fontSize: string;
  autoComplete: string;
  placeholder: string;
  customClass: string;
  inputDataTestId: string;
  errorDataTestId: string;
};
