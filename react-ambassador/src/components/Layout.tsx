// components/Layout.tsx
import Nav from './Nav'
import Header from './Header'

const Layout = (props: any) => {
	return (
		<div>
			<Nav />
			<main>
				<Header />
				<div className="album py-5 bg-light">
					<div className="container">
						{props.children}
					</div>
				</div>
			</main>
		</div>
	)
}

export default Layout
