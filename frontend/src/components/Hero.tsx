import * as React from 'react';
import { Component, CSSProperties, ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { content } from '../modules/content';

type Props = {
  children?: ReactNode,
  narrow?: boolean,
  image?: string,
  inverse?: boolean,
  styles?: (CSSProperties | false)[],
  tag?: string
};

const getActionCreators = () => ({
  setGhostNav: content.setGhostNav
});

const { props, connect } = withProps<Props>()(undefined, getActionCreators);

export const Hero = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { image } = this.props;
    const { setGhostNav } = this.props;

    if (image) {
      setGhostNav({ ghost: true });
    }
  }

  public componentWillUnmount() {
    const { image } = this.props;
    const { setGhostNav } = this.props;

    if (image) {
      setGhostNav({ ghost: false });
    }
  }

  public render() {
    const { children, narrow, image, inverse, styles = [], tag: Tag = 'div' } = this.props;

    const styleSheet = StyleSheet.create({
      hero: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '9rem 0 16rem 0',
        color: '#FFFFFF'
      },
      narrow: {
        padding: '0',
        marginBottom: '6rem'
      },
      heroBackground: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#68B34C',
        transform: `skewY(${inverse ? '3' : '-3'}deg)`,
        transformOrigin: `center ${inverse ? 'right' : 'left'}`,
        zIndex: -1,
        overflow: 'hidden'
      },
      heroBackgroundNarrow: {
        transformOrigin: `center ${inverse ? 'left' : 'right'}`
      },
      topHero: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingTop: '23rem'
      },
      backgroundImage: {
        transform: `skewY(${inverse ? '-3' : '3'}deg)`,
        width: '100%',
        verticalAlign: 'middle'
      }
    });

    return (
      <Tag
        className={css(
          styleSheet.hero,
          narrow && styleSheet.narrow,
          Boolean(image) && styleSheet.topHero,
          styles
        )}
      >
        <div
          className={css(
            styleSheet.heroBackground,
            narrow && styleSheet.heroBackgroundNarrow
          )}
        >
          {image && (
            <img src={image} className={css(styleSheet.backgroundImage)}/>
          )}
        </div>
        {children}
      </Tag>
    );
  }
});
