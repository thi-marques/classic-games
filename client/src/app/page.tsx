import Link from 'next/link'

const Home = () => {
	return (
		<div>
			<h1>Home</h1>

			<Link href='/about'>
				<h2>About Page</h2>
			</Link>
		</div>
	)
}

export default Home
