interface PageWrapperProps {
  children: React.ReactNode
  maxWidth?: number
}

export default function PageWrapper({ children, maxWidth = 1280 }: PageWrapperProps) {
  return (
    <div style={{
      maxWidth,
      margin: '0 auto',
      padding: '0 40px',
    }}>
      {children}
    </div>
  )
}
