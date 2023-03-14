
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import { KeyboardArrowDown } from '@groww-tech/icon-store/mi';

import AnimateHeight from './AnimateHeight';

import './accordion.css';


const Accordion = (props:Props) => {
  const { mutable } = props;

  if (mutable) {
    return <MutableAccordion {...props} />;

  } else {
    return <AnimateHeight {...props} />;
  }
};


const MutableAccordion = (props: Props) => {
  const {
    onMountOpen,
    onToggleCallback,
    title,
    children,
    parentClass,
    headerClass,
    iconClass,
    titleClass,
    showRightIcon,
    useAnimateHeight
  } = props;

  const [ isOpen, toggleAccordion ] = useState(onMountOpen);
  const [ isRevealComplete, setIsRevealComplete ] = useState(false);
  const [ childStyle, setChildStyle ] = useState<{ height?: string | number }>({
    height: onMountOpen ? 'auto' : 0
  });
  const childRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const newIconClass = 'ac11Icon absolute-center ' + iconClass + ` ${isOpen ? 'ac11collapsibleOpen' : 'ac11collapsibleClose'}`;

  useEffect(() => {
    if (isFirstRender.current) {

      isFirstRender.current = false;

    }

    //changed height back to 0 for transition to take place after component is updated with new isOpen Value
    if (!isOpen) {
      setChildStyle({
        height: 0
      });
    }

    if (onToggleCallback) {
      onToggleCallback(isOpen);
    }

    if (!isOpen && isRevealComplete) {
      setIsRevealComplete(false);
    }
  }, [ isOpen ]);


  const toggleState = useCallback(() => {
    toggleAccordion(isOpen => {

      //for toggling accordion to closed state

      //set up an initial height (previously was 'auto')
      //auto height does not animate
      //so set height to current height of the container, so that transition works
      //when on update (inside useEffect) we will set it to 0 (on isOpen state as false)

      const newHeight = childRef?.current?.scrollHeight;

      setChildStyle({ height: newHeight });

      //for toggling accordion to open state
      //the height is automatically 0 from previous update (above comment)
      //so we don't need to trigger extra setState inside useEffect


      return !isOpen;
    });
  }, []);


  const onRevealComplete = () => {
    if (isOpen) {
      setChildStyle({
        height: 'auto'
      });
      setIsRevealComplete(true);
    }
  };


  const getChildClass = () => {

    if (isOpen) {
      if (isRevealComplete) {
        return 'ac11RevealComplete ac11Show';
      }

      return 'ac11Show';
    }

    return 'ac11Hidden';
  };

  const childClass = getChildClass();


  const getAnimateHeightUI = () => (
    <div>
      <AnimateHeight duration={300}
        height={isOpen ? 'auto' : 0}
      >
        {children}
      </AnimateHeight>
    </div>
  );


  return (
    <div className={`cur-po ${parentClass}`}>
      <div className={`valign-wrapper vspace-between ${headerClass}`}
        onClick={toggleState}
      >
        <h3 className={`ac11Title ${titleClass}`}>{title}</h3>

        {
          showRightIcon
            ? <KeyboardArrowDown
              className={newIconClass}
              size={20}
            />
            : null
        }
      </div>

      {
        useAnimateHeight ? getAnimateHeightUI()
        : <div style={
          {
            ...childStyle,
            display: 'grid', // to ensure margin is included in the height of the parent container, flex has some issues.,
            gridTemplateColumns: '100%' // to ensure no overflow in x direction
          }
        }
        className={childClass}
        onTransitionEnd={onRevealComplete}
        >
          <div
            ref={childRef} // a nested component to read height from, so we set the ref here only
          >
            {children}
          </div>
        </div>
      }
    </div>
  );
};

export type Props = RequiredProps & OptionalProps & DefaultProps & Partial<AnimateHeight['props']>;


type RequiredProps = {
  children: React.ReactNode;
}


type OptionalProps = {
  onToggleCallback?: ((isOpen: boolean) => void);
  maxHeight?: string | number;
}


type DefaultProps = {
  title: string | React.ReactNode;
  onMountOpen: boolean;
  showRightIcon: boolean;
  parentClass: string;
  headerClass: string;
  iconClass: string;
  titleClass: string;
  useAnimateHeight: boolean;
  mutable: boolean;
  // duration?: number;
  // className?: string;
  // height?: string | number;
  // style?: string |
}

const defaultProps = {
  title: '',
  onMountOpen: true,
  showRightIcon: true,
  parentClass: '',
  headerClass: '',
  iconClass: '',
  titleClass: '',
  useAnimateHeight: false,
  mutable: true
};


Accordion.defaultProps = defaultProps as DefaultProps;

export default React.memo(Accordion);
