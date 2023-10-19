import { useEffect, useRef, useState, type HTMLAttributes, type SVGProps } from 'react'

const ROTATION_RANGE = 15
const DISTANCE = 5
const RANGE = 500

type LogoProps = HTMLAttributes<HTMLDivElement>
export function Logo({ className, ...props }: LogoProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, dx: 0, dy: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [bump, setBump] = useState(false)

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

        setRotation({ ...rotation, dx: translate3d.x, dy: translate3d.y })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    if (bump && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setBump(false)
        timeoutRef.current = undefined
      }, 500)
    }
  }, [bump])

  return (
    <div
      ref={ref}
      className={`cursor-pointer transition duration-75 select-none w-fit ${
        bump ? 'scale-110' : ''
      } ${className ?? ''}`}
      onClick={() => setBump(true)}
      {...props}
    >
      <div
        className="relative"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <U_U className={bump ? 'hidden' : 'block'} />

        {/* <X_X className={bump ? 'block' : 'hidden'} /> */}
        <O_O className={bump ? 'block' : 'hidden'} />

        <W
          style={{
            transform: `translate3d(${rotation.dx}px,${rotation.dy}px,0)`,
          }}
          className="absolute top-0 left-0 right-0 bottom-0 z-15"
        />

        <BlushesA
          style={{
            transform: `translate3d(${rotation.dx * 2}px,${rotation.dy * 2}px,0)`,
          }}
          className={`absolute top-0 left-0 right-0 bottom-0 z-10 ${bump ? 'hidden' : 'block'}`}
        />

        <BlushesB
          style={{
            transform: `translate3d(${rotation.dx * 2}px,${rotation.dy * 2}px,0)`,
          }}
          className={`absolute top-0 left-0 right-0 bottom-0 z-10 ${bump ? 'block' : 'hidden'}`}
        />
      </div>
    </div>
  )
}

function U_U({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-gray-200 ${className ?? ''}`}
      width="226"
      height="108"
      viewBox="0 0 226 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M201.655 1.27272H210.462V49.4261C210.462 54.3977 209.29 58.8366 206.946 62.7429C204.626 66.6255 201.347 69.6913 197.11 71.9403C192.872 74.1657 187.901 75.2784 182.195 75.2784C176.49 75.2784 171.518 74.1657 167.28 71.9403C163.043 69.6913 159.752 66.6255 157.408 62.7429C155.088 58.8366 153.928 54.3977 153.928 49.4261V1.27272H162.735V48.7159C162.735 52.267 163.516 55.4276 165.079 58.1974C166.641 60.9436 168.866 63.1098 171.755 64.696C174.667 66.2585 178.147 67.0398 182.195 67.0398C186.243 67.0398 189.723 66.2585 192.635 64.696C195.547 63.1098 197.773 60.9436 199.311 58.1974C200.874 55.4276 201.655 52.267 201.655 48.7159V1.27272Z" />
      <path d="M62.5341 1.27272H71.3409V49.4261C71.3409 54.3977 70.169 58.8366 67.8253 62.7429C65.5052 66.6255 62.2263 69.6913 57.9886 71.9403C53.751 74.1657 48.7794 75.2784 43.0739 75.2784C37.3684 75.2784 32.3968 74.1657 28.1591 71.9403C23.9214 69.6913 20.6307 66.6255 18.2869 62.7429C15.9669 58.8366 14.8068 54.3977 14.8068 49.4261V1.27272H23.6136V48.7159C23.6136 52.267 24.3949 55.4276 25.9574 58.1974C27.5199 60.9436 29.7453 63.1098 32.6335 64.696C35.5455 66.2585 39.0256 67.0398 43.0739 67.0398C47.1222 67.0398 50.6023 66.2585 53.5142 64.696C56.4261 63.1098 58.6515 60.9436 60.1903 58.1974C61.7528 55.4276 62.5341 52.267 62.5341 48.7159V1.27272Z" />
    </svg>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function X_X({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-gray-200 ${className ?? ''}`}
      width="226"
      height="108"
      viewBox="0 0 226 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24.3693 2L43.1193 32.2557H43.6875L62.4375 2H72.8068L49.9375 38.3636L72.8068 74.7273H62.4375L43.6875 45.0398H43.1193L24.3693 74.7273H14L37.4375 38.3636L14 2H24.3693Z" />
      <path d="M163.369 2L182.119 32.2557H182.688L201.438 2H211.807L188.938 38.3636L211.807 74.7273H201.438L182.688 45.0398H182.119L163.369 74.7273H153L176.438 38.3636L153 2H163.369Z" />
    </svg>
  )
}

function O_O({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-gray-200 ${className ?? ''}`}
      width="226"
      height="108"
      viewBox="0 0 226 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M75.2045 38.358C75.2045 46.0284 73.8196 52.6572 71.0497 58.2443C68.2798 63.8314 64.4801 68.1402 59.6506 71.1705C54.821 74.2008 49.3049 75.7159 43.1023 75.7159C36.8996 75.7159 31.3835 74.2008 26.554 71.1705C21.7244 68.1402 17.9247 63.8314 15.1548 58.2443C12.3849 52.6572 11 46.0284 11 38.358C11 30.6875 12.3849 24.0587 15.1548 18.4716C17.9247 12.8845 21.7244 8.57576 26.554 5.54546C31.3835 2.51515 36.8996 1 43.1023 1C49.3049 1 54.821 2.51515 59.6506 5.54546C64.4801 8.57576 68.2798 12.8845 71.0497 18.4716C73.8196 24.0587 75.2045 30.6875 75.2045 38.358ZM66.6818 38.358C66.6818 32.0606 65.6283 26.7457 63.5213 22.4134C61.438 18.081 58.6089 14.8021 55.0341 12.5767C51.483 10.3513 47.5057 9.23864 43.1023 9.23864C38.6989 9.23864 34.7098 10.3513 31.1349 12.5767C27.5838 14.8021 24.7547 18.081 22.6477 22.4134C20.5644 26.7457 19.5227 32.0606 19.5227 38.358C19.5227 44.6553 20.5644 49.9702 22.6477 54.3026C24.7547 58.6349 27.5838 61.9138 31.1349 64.1392C34.7098 66.3646 38.6989 67.4773 43.1023 67.4773C47.5057 67.4773 51.483 66.3646 55.0341 64.1392C58.6089 61.9138 61.438 58.6349 63.5213 54.3026C65.6283 49.9702 66.6818 44.6553 66.6818 38.358Z" />
      <path d="M214.205 38.358C214.205 46.0284 212.82 52.6572 210.05 58.2443C207.28 63.8314 203.48 68.1402 198.651 71.1705C193.821 74.2008 188.305 75.7159 182.102 75.7159C175.9 75.7159 170.384 74.2008 165.554 71.1705C160.724 68.1402 156.925 63.8314 154.155 58.2443C151.385 52.6572 150 46.0284 150 38.358C150 30.6875 151.385 24.0587 154.155 18.4716C156.925 12.8845 160.724 8.57576 165.554 5.54546C170.384 2.51515 175.9 1 182.102 1C188.305 1 193.821 2.51515 198.651 5.54546C203.48 8.57576 207.28 12.8845 210.05 18.4716C212.82 24.0587 214.205 30.6875 214.205 38.358ZM205.682 38.358C205.682 32.0606 204.628 26.7457 202.521 22.4134C200.438 18.081 197.609 14.8021 194.034 12.5767C190.483 10.3513 186.506 9.23864 182.102 9.23864C177.699 9.23864 173.71 10.3513 170.135 12.5767C166.584 14.8021 163.755 18.081 161.648 22.4134C159.564 26.7457 158.523 32.0606 158.523 38.358C158.523 44.6553 159.564 49.9702 161.648 54.3026C163.755 58.6349 166.584 61.9138 170.135 64.1392C173.71 66.3646 177.699 67.4773 182.102 67.4773C186.506 67.4773 190.483 66.3646 194.034 64.1392C197.609 61.9138 200.438 58.6349 202.521 54.3026C204.628 49.9702 205.682 44.6553 205.682 38.358Z" />
    </svg>
  )
}

function W({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-gray-200 ${className ?? ''}`}
      width="226"
      height="108"
      viewBox="0 0 226 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M96.2955 83.6364L83 40H90.0455L99.4773 73.4091H99.9318L109.25 40H116.409L125.614 73.2955H126.068L135.5 40H142.545L129.25 83.6364H122.659L113.114 50.1136H112.432L102.886 83.6364H96.2955Z" />
    </svg>
  )
}

function BlushesA({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-pink-500 ${className ?? ''}`}
      width="226"
      height="108"
      viewBox="0 0 226 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="86" width="56" height="12" />
      <rect x="154" y="86" width="56" height="12" />
    </svg>
  )
}

function BlushesB({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`fill-pink-500 ${className ?? ''}`}
      width="226"
      height="108"
      viewBox="0 0 226 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="99.2132" width="30" height="10" transform="rotate(-45 1 99.2132)" />
      <rect
        x="29.2843"
        y="99.2132"
        width="30"
        height="10"
        transform="rotate(-45 29.2843 99.2132)"
      />
      <rect
        x="57.5685"
        y="99.2132"
        width="30"
        height="10"
        transform="rotate(-45 57.5685 99.2132)"
      />
      <rect x="140" y="99.2132" width="30" height="10" transform="rotate(-45 140 99.2132)" />
      <rect
        x="168.284"
        y="99.2132"
        width="30"
        height="10"
        transform="rotate(-45 168.284 99.2132)"
      />
      <rect
        x="196.569"
        y="99.2132"
        width="30"
        height="10"
        transform="rotate(-45 196.569 99.2132)"
      />
    </svg>
  )
}
