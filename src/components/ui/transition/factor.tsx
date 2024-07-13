'use client'

import { memo } from 'react'
import { m } from 'framer-motion'
import type {
  HTMLMotionProps,
  Spring,
  Target,
  TargetAndTransition,
} from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'
import type { BaseTransitionProps } from './typings'

import { microReboundPreset } from '~/constants/spring'

interface TransitionViewParams {
  from: Target
  to: Target
  initial?: Target
  preset?: Spring
}

export const createTransitionView = (
  params: TransitionViewParams,
): FC<PropsWithChildren<BaseTransitionProps>> => {
  const { from, to, initial, preset } = params
  const TransitionView = (props: PropsWithChildren<BaseTransitionProps>) => {
    const {
      timeout = {},
      duration = 0.5,
      appear = true,

      animation = {},
      as = 'div',
      delay = 0,

      ...rest
    } = props

    const { enter = delay, exit = delay } = timeout

    const MotionComponent = m[as] as FC<HTMLMotionProps<any>>

    if (!appear) return props.children

    return (
      <MotionComponent
        initial={{ ...(initial || from) }}
        animate={{
          ...to,
          transition: {
            duration,
            ...(preset || microReboundPreset),
            ...animation.enter,
            delay: enter / 1000,
          },
          onTransitionEnd() {
            props.onEntered?.()
          },
        }}
        exit={{
          ...from,
          transition: {
            duration,
            ...animation.exit,
            delay: exit / 1000,
          } as TargetAndTransition['transition'],
        }}
        transition={{
          duration,
        }}
        {...rest}
      >
        {props.children}
      </MotionComponent>
    )
  }
  const MemoedTransitionView = memo(TransitionView)
  MemoedTransitionView.displayName = `MemoedTransitionView`
  return MemoedTransitionView
}
