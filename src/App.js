import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import lerp from 'lerp';

// export const lerp = (start, end, amt) => {
//   return (1 - amt) * start + amt * end;
// };

export default function App() {
  let initialHeight = 300;
  let collapsedHeight = 100;
  const heightDiff = initialHeight - collapsedHeight;
  let initialOffset = 0;

  const innerBody = useRef();
  const headerRef = useRef();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [compensation, setCompensation] = useState(0);
  const [elementHeight, setElementHeight] = useState(initialHeight);

  const onScroll = () => {
    const scrollTop = innerBody.current.scrollTop;

    const min = initialOffset;
    const max = initialOffset + heightDiff;
    let res = 0;
    let compensation = 0;
    if (scrollTop < min) {
      res = 0;
    } else if (scrollTop > max) {
      res = 1;
      compensation = scrollTop - initialOffset;
    } else {
      res = (scrollTop - initialOffset) / (initialHeight - collapsedHeight);
      compensation = lerp(0, initialHeight - collapsedHeight, res);
    }

    setScrollProgress(res);
    setElementHeight(lerp(initialHeight, collapsedHeight, res));
    setCompensation(compensation);
  };

  const calcInitialScrolls = () => {
    console.log('calcInitialScrolls2');
    initialOffset = Math.abs(
      innerBody.current.offsetTop - headerRef.current.offsetTop
    );
    console.log('initialOffset', initialOffset);
  };

  useEffect(() => {
    innerBody.current.addEventListener('scroll', onScroll);
    calcInitialScrolls();
    onScroll();
  }, []);

  return (
    <div className="p-2 prose max-w-full">
      <h1>Website body</h1>
      <pre>{scrollProgress}</pre>
      <pre>{elementHeight}</pre>
      <pre>{compensation}</pre>

      <div
        style={{ height: '800px', overflow: 'scroll' }}
        className="innerBody transform"
        ref={innerBody}
      >
        <div class="flex flex-col bg-gray-200 p-2 relative">
          <h1>Some tariffs scroller</h1>
          <p>Lorem</p>

          <div
            ref={headerRef}
            style={{
              transform: 'translateY(' + compensation + 'px)',
            }}
          >
            <div
              style={{
                height: elementHeight + 'px',
                overflow: 'hidden',
              }}
            >
              <div class="bg-yellow-100 rounded-md p-2 h-full mt-1">
                <h1
                  style={{
                    'font-size': lerp(2, 1.5, scrollProgress) + 'em',
                  }}
                >
                  Tariffs
                </h1>
                <p
                  style={{
                    'font-size': lerp(1, 0, scrollProgress) + 'em',
                  }}
                >
                  Some useless line of text
                </p>
                <div className="flex gap-3">
                  {[1, 2, 3].map((value, index) => {
                    return (
                      <div class="bg-green-200 rounded p-1 flex-1">
                        <span className="mt-0">{value * 100} pro Jahr</span>
                        <p
                          style={{
                            'font-size': lerp(1, 0, scrollProgress) + 'em',
                          }}
                        >
                          Hello
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p>
                  <p>Hello</p>
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 mt-5 ">
            {[1, 2, 3, 4, 5].map((value, index) => {
              return (
                <div class="flex gap-3 ">
                  {[1, 2, 3].map((value, index) => {
                    return (
                      <div class="bg-gray-50 rounded p-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
