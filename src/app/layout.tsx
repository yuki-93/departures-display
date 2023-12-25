import "./global.scss"

export const metadata = {
  title: 'Departures Display',
  description: 'Departures Display',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
