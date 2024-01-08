import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import './tabs.css';


type TabMeta = {
  left: number;
  width: number;
};


const Tabs = (props: Props) => {
  const { onTabSelect, defaultIndex, data, showBottomBorder, isFitted } = props;

  const [ activeIndex, setActiveIndex ] = useState(defaultIndex);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [ tabsMeta, setTabsMeta ] = useState<TabMeta[]>([]);

  useEffect(() => {
    setActiveIndex(props.defaultIndex);
  }, [ props.defaultIndex ]);

  useEffect(() => {
    const computeDimensions = () => {
      if (!tabsRef.current) return;

      const tabsMetadata: TabMeta[] = [];

      for (let i = 0; i < tabsRef.current.childElementCount; i++) {
        const element = tabsRef.current.children[i] as HTMLElement;

        tabsMetadata.push({
          width: element.offsetWidth,
          left: element.offsetLeft
        });
      }

      setTabsMeta(tabsMetadata);
    };

    computeDimensions();

    window.addEventListener('load', computeDimensions);
    return () => {
      window.removeEventListener('load', computeDimensions);
    };
  }, [ isFitted ]);


  const onTabClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }

    onTabSelect(index);
  };

  const tabClasses = cn('tabs8Tab', {
    borderPrimary: showBottomBorder
  });

  const tabItemClasses = cn('tabs8TabItem cur-po headingXSmall');

  const tabParentClasses = cn('valign-wrapper tabs8Parent', {
    flex: isFitted
  });

  return (
    <div className={tabClasses}>
      <div className={tabParentClasses}
        ref={tabsRef}
        role="tablist"
      >
        {
          data.map((item, key) => {
            return (
              <button
                className={
                  cn(tabItemClasses, {
                    contentSecondary: key !== activeIndex,
                    contentPrimary: key === activeIndex,
                    tabs8TabItemFlex1: isFitted
                  })
                }
                aria-selected={key === activeIndex}
                role="tab"
                title={item.description}
                onClick={onTabClick.bind(null, key)}
                key={key}
              >
                {item.name}
              </button>
            );
          })
        }
      </div>
      {
        tabsMeta[activeIndex] && <span className="tabs8Line"
          style={{ width: tabsMeta[activeIndex].width, left: tabsMeta[activeIndex].left }}
        />
      }
    </div>
  );
};

const defaultProps: DefaultProps = {
  showBottomBorder: true,
  defaultIndex: 0,
  isFitted: false
};


type DefaultProps = {
  showBottomBorder: boolean;
  defaultIndex: number;
  isFitted: boolean;
};


type RequiredProps = {
  data: Tab[];
  onTabSelect: (index: number) => void;
};


type Tab = {
  description?: string;
  name: string;
};

Tabs.defaultProps = defaultProps;

export type Props = DefaultProps & RequiredProps;

export default React.memo(Tabs);
