import { styled } from '@stitches/react';


export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  background: 'var(--green100)',
  width: 'fit-content',
  height: '30px',
  color: 'var(--green500)',
  borderRadius: '2px',
  padding: '0px 5px',
  variants: {
    variant: {
      warning: {
        background: 'var(--yellow100)',
        color: 'var(--yellow500)'
      },
      error: {
        background: 'var(--red100)',
        color: 'var(--red500)'
      },
      disabled: {
        background: 'var(--gray50)',
        color: 'var(--gray900)'
      },
      unstyled: {
        background: 'transparent',
        color: 'var(--gray900)',
        border: 'none'
      },
      default: {
        background: 'var(--green100)',
        color: 'var(--green500)'
      }
    }
  }
}
);

export const Input = styled('input', {
  border: 'none',
  height: '30px',
  width: '82px',
  color: 'inherit',
  background: 'transparent',
  textAlign: 'right',
  flexGrow: 1,
  outline: 0,
  opacity: 1,
  caretColor: 'var(--green500)',
  WebkitTextFillColor: 'var(--green500)',
  padding: 0,
  variants: {
    variant: {
      warning: {
        caretColor: 'var(--yellow500)',
        WebkitTextFillColor: 'var(--yellow500)'
      },
      error: {
        caretColor: 'var(--red500)',
        WebkitTextFillColor: 'var(--red500)'
      },
      disabled: {
        pointerEvents: 'none',
        caretColor: 'var(--gray900)',
        WebkitTextFillColor: 'var(--gray900)'
      },
      unstyled: {
        caretColor: 'var(--gray900)',
        WebkitTextFillColor: 'var(--gray900)'
      },
      default: {
        caretColor: 'var(--green500)',
        WebkitTextFillColor: 'var(--green500)'
      }
    },
    showSteper: {
      true: {
        textAlign: 'center',
        width: '60px'
      }
    }
  },
  '&::placeholder': {
    color: 'var(--gray700)',
    WebkitTextFillColor: 'var(--gray700)'
  }
});
