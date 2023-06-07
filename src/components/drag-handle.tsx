import React, {
    MouseEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
  } from 'react';
  import { debounce } from './utils.ts';
  
  interface DragHandlerProps {
    moveX: (relativeX: number) => void;
  }
  
  export const DragHandler = ({ moveX }: DragHandlerProps) => {
    const elRef = useRef<HTMLElement | null>(null);
  
    const onMouseMoveBase = useMemo(
      () =>
        debounce((clientX) => {
          if (!elRef.current) return;
          const boundingBox = elRef.current.getBoundingClientRect();
          const relativeX = clientX - boundingBox.x;
          moveX(relativeX);
        }, 1),
      [elRef, moveX]
    );
  
    const onMouseMove = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        onMouseMoveBase(e.clientX);
      },
      [onMouseMoveBase]
    );
  
    const onMouseUp = useCallback(() => {
      document.removeEventListener('mousemove', onMouseMove);
    }, [onMouseMove]);
  
    useEffect(() => {
      return () => document.removeEventListener('mousemove', onMouseMove);
    }, [onMouseMove]);
  
    useEffect(() => {
      return () => document.removeEventListener('mouseup', onMouseUp);
    }, [onMouseUp]);
  
    const onMouseDown: MouseEventHandler = (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  
    return (

     <div ref={elRef as any}
            data-id="RE_Info_Preview_DraggableHandle"
            className="css-1n4pdp3-ye e1vmnjjl8"
          >
            <div className="css-c977od-Ae e1vmnjjl7"  onMouseDown={onMouseDown}>
              <svg
                className="jss53"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path
                  d="M1 0V22M5 0V22"
                  stroke="#D9D9D9"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>



    //   <div
    //     ref={elRef as any}
    //     style={{ width: '4px', backgroundColor: 'black', cursor: 'col-resize' }}
    //     onMouseDown={onMouseDown}
    //   />
    );
  };
  