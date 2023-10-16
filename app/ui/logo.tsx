import { useEffect, useRef, useState, type HTMLAttributes } from 'react'

const ROTATION_RANGE = 15
const DISTANCE = 5
const RANGE = 500

type LogoProps = HTMLAttributes<HTMLDivElement>
export function Logo({ className, ...props }: LogoProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, dx: 0, dy: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const boundingClientRect = ref.current.getBoundingClientRect()

      const newOrigin = {
        x: boundingClientRect.left + boundingClientRect.width / 2,
        y: boundingClientRect.top + boundingClientRect.height / 2,
      }

      const handleMouseMove: (event: MouseEvent) => any = (event) => {
        const cursorPos = { x: event.clientX, y: event.clientY }

        const newCursorPos = {
          x: cursorPos.x - newOrigin.x,
          y: -(cursorPos.y - newOrigin.y),
        }

        const bounded = {
          x: Math[newCursorPos.x >= 0 ? 'min' : 'max'](
            newCursorPos.x,
            (newCursorPos.x >= 0 ? 1 : -1) * RANGE,
          ),
          y: Math[newCursorPos.y >= 0 ? 'min' : 'max'](
            newCursorPos.y,
            (newCursorPos.y >= 0 ? 1 : -1) * RANGE,
          ),
        }

        const rotation = {
          x: (bounded.y * ROTATION_RANGE) / RANGE,
          y: (bounded.x * ROTATION_RANGE) / RANGE,
        }

        const translate3d = {
          x: (bounded.x * DISTANCE) / RANGE,
          y: -((bounded.y * DISTANCE) / RANGE),
        }

        // console.table({
        //   cursorPos,
        //   newOrigin,
        //   newCursorPos,
        //   bounded,
        //   rotation,
        //   translate3d,
        // })

        setRotation({ ...rotation, dx: translate3d.x, dy: translate3d.y })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`transition ease-out duration-300 select-none w-fit ${className ?? ''}`}
      {...props}
    >
      <div
        className="relative"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <img src="/logo/uwu.svg" alt="logo" />

        <img
          src="/logo/blushes.svg"
          alt="logo2"
          className="absolute top-0 left-0 right-0 bottom-0 z-10"
          style={{
            transform: `translate3d(${rotation.dx}px,${rotation.dy}px,0)`,
          }}
        />
      </div>
    </div>
  )
}
