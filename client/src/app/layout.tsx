import { roboto } from 'src/fonts/Roboto'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={roboto.className}>
			<head />
			<body>{children}</body>
		</html>
	)
}
