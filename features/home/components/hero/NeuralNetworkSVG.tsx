const NeuralNetworkSVG = () => (
  <svg
    viewBox='0 0 400 400'
    className='w-full max-w-md h-auto relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    {/* Connection lines */}
    {[
      [60, 80, 200, 100],
      [60, 160, 200, 100],
      [60, 240, 200, 100],
      [60, 80, 200, 200],
      [60, 160, 200, 200],
      [60, 240, 200, 200],
      [60, 80, 200, 300],
      [60, 160, 200, 300],
      [60, 240, 200, 300],
      [200, 100, 340, 130],
      [200, 100, 340, 200],
      [200, 100, 340, 270],
      [200, 200, 340, 130],
      [200, 200, 340, 200],
      [200, 200, 340, 270],
      [200, 300, 340, 130],
      [200, 300, 340, 200],
      [200, 300, 340, 270],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke='rgba(6,182,212,0.15)'
        strokeWidth='1'
      />
    ))}

    {/* Input nodes */}
    {[80, 160, 240].map((cy, i) => (
      <g key={`in-${i}`}>
        <circle
          cx='60'
          cy={cy}
          r='14'
          fill='rgba(6,182,212,0.12)'
          stroke='rgba(6,182,212,0.5)'
          strokeWidth='1.5'
        />
        <circle cx='60' cy={cy} r='6' fill='#06b6d4' opacity='0.8' />
      </g>
    ))}

    {/* Hidden nodes */}
    {[100, 200, 300].map((cy, i) => (
      <g key={`h-${i}`}>
        <circle
          cx='200'
          cy={cy}
          r='16'
          fill='rgba(6,182,212,0.08)'
          stroke='rgba(6,182,212,0.4)'
          strokeWidth='1.5'
        />
        <circle cx='200' cy={cy} r='7' fill='#06b6d4' opacity='0.6' />
      </g>
    ))}

    {/* Output nodes */}
    {[130, 200, 270].map((cy, i) => (
      <g key={`out-${i}`}>
        <circle
          cx='340'
          cy={cy}
          r='14'
          fill='rgba(6,182,212,0.12)'
          stroke='rgba(6,182,212,0.5)'
          strokeWidth='1.5'
        />
        <circle cx='340' cy={cy} r='6' fill='#06b6d4' opacity='0.8' />
      </g>
    ))}

    {/* Outer glow ring */}
    <circle
      cx='200'
      cy='200'
      r='170'
      fill='none'
      stroke='rgba(6,182,212,0.06)'
      strokeWidth='1'
      strokeDasharray='4 8'
    />
  </svg>
);

export default NeuralNetworkSVG;
