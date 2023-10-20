export const Done = ({done}: {done: boolean}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
  >
    <path
      fill={done ? "#B3B3B3" : "#FFF"}
      d="M28 36H8c-4.42 0-8-3.58-8-8V8c0-4.42 3.58-8 8-8h20c4.42 0 8 3.58 8 8v20c0 4.42-3.58 8-8 8Z"
    />
    <rect
      width={2.077}
      height={16.615}
      x={25.282}
      y={11.422}
      fill={!done ? "#000" : "#FFF"}
      rx={1.038}
      transform="rotate(50.145 25.282 11.422)"
    />
    <rect
      width={2.077}
      height={6.923}
      x={15.338}
      y={22.218}
      fill={!done ? "#000" : "#FFF"}
      rx={1.038}
      transform="rotate(141.079 15.338 22.218)"
    />
  </svg>
)

export const Delete = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
  >
    <path
      fill="#fff"
      d="M28 36H8c-4.42 0-8-3.58-8-8V8c0-4.42 3.58-8 8-8h20c4.42 0 8 3.58 8 8v20c0 4.42-3.58 8-8 8Z"
    />
    <rect
      width={2.077}
      height={16.615}
      x={22.916}
      y={10.926}
      fill="#0C0B0B"
      rx={1.038}
      transform="rotate(44.904 22.916 10.926)"
    />
    <rect
      width={2.077}
      height={16.615}
      x={11.17}
      y={12.414}
      fill="#0C0B0B"
      rx={1.038}
      transform="rotate(-45.096 11.17 12.414)"
    />
  </svg>
)

export const Edit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="m-auto"
  >
    <path
      fill="#0C0B0B"
      d="M4.42 20.579a1 1 0 0 1-.737-.326.988.988 0 0 1-.263-.764l.245-2.694L14.983 5.481l3.537 3.536L7.205 20.33l-2.694.245a.95.95 0 0 1-.091.004ZM19.226 8.31 15.69 4.774l2.121-2.121a1 1 0 0 1 1.415 0l2.121 2.121a1 1 0 0 1 0 1.415l-2.12 2.12-.001.001Z"
    />
  </svg>
)